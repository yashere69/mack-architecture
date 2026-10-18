"""MACK cloud storage + backup cost model.

Single source of truth for every number in mack-cloud-decision.md,
mack-cloud-implementation.md and the client PDF.

    python3 docs/cloud-storage/source/costs.py          # print tables
    python3 docs/cloud-storage/source/costs.py --json   # write costs.json (read by build-pdf.mjs)

Prices researched 18 Oct 2026 (sources in mack-cloud-decision.md).
"""
import json
import math
import sys
from pathlib import Path

# ---------------------------------------------------------------- assumptions
FX_MID = 95.08          # USD->INR mid-market, open.er-api.com, 18 Oct 2026
FX = 97.0               # planning rate: mid-market + ~2% card forex margin
GST = 0.18              # added to every subscription; hardware prices are retail incl. GST
TEAM = 5                # MACK headcount assumed at launch
TEAM_GROWTH = 10

# ---------------------------------------------------------------- price book
# Primary cloud (per user per month, before GST)
GOOGLE_STD_INR = 1080        # Workspace Business Standard, annual commitment (₹1,300 flexible)
GOOGLE_STD_TB = 2            # pooled TB per user
MS_STD_INR = 860             # Microsoft 365 Business Standard, paid yearly (microsoft.com/en-in)
MS_SP_EXTRA_USD_GB = 0.20    # Office 365 Extra File Storage, per GB per month
DROPBOX_ADV_USD = 24         # Dropbox Advanced, billed yearly, min 3 users
GOOGLE_STARTER_INR = 270     # email-only seat if Dropbox were primary

# Backup
IDRIVE_USD_SEAT_YR = 20      # IDrive Google Workspace Backup, 10 TB per seat
B2_USD_TB_MO = 6.95          # Backblaze B2 pay-as-you-go
WASABI_USD_TB_MO = 7.99      # Wasabi pay-as-you-go (1 TB minimum, 90-day minimum retention)
DEEP_ARCHIVE_USD_TB_MO = 1.01      # AWS S3 Glacier Deep Archive, US East ($0.00099/GB)
DEEP_ARCHIVE_RESTORE_USD_GB = 0.02 + 0.09   # standard retrieval + internet egress
BB_COMPUTER_USD_YR = 99      # Backblaze Computer Backup, per computer

# Hardware (Indian retail incl. GST, vishalperipherals.com / estorewale.com, 18 Oct 2026)
VAULT_DRIVE = ("WD Elements Portable 5 TB (WDBHDW0050BBK)", 19205)
NAS = ("Synology DS925+ (4-bay)", 77150)
NAS_DRIVE = ("WD Red Pro 8 TB (WD8005FFBX)", 43775)
UPS = ("APC Back-UPS BX1100C-IN (1100 VA)", 6990)


def inr(usd):
    return usd * FX


def gst(x):
    return x * (1 + GST)


def r(x):
    return int(round(x))


def fmt(x):
    """Indian digit grouping: 1,26,320"""
    x = r(x)
    s = str(abs(x))
    if len(s) > 3:
        head, tail = s[:-3], s[-3:]
        parts = []
        while len(head) > 2:
            parts.insert(0, head[-2:])
            head = head[:-2]
        if head:
            parts.insert(0, head)
        s = ",".join(parts + [tail])
    return ("-" if x < 0 else "") + "₹" + s


# ---------------------------------------------------------------- building blocks
def google(users):
    yr = users * GOOGLE_STD_INR * 12
    return {"users": users, "tb": users * GOOGLE_STD_TB, "month_ex": users * GOOGLE_STD_INR,
            "year_ex": yr, "year": gst(yr), "month": gst(yr) / 12}


def idrive(users):
    yr = inr(users * IDRIVE_USD_SEAT_YR)
    return {"usd_year": users * IDRIVE_USD_SEAT_YR, "year_ex": yr, "year": gst(yr), "month": gst(yr) / 12}


def b2(tb):
    yr = inr(tb * B2_USD_TB_MO * 12)
    return {"usd_month": tb * B2_USD_TB_MO, "year_ex": yr, "year": gst(yr), "month": gst(yr) / 12}


def option(name, users, one_time, recurring):
    ot = sum(v for _, v in one_time)
    rec = sum(v for _, v in recurring)
    return {"name": name, "users": users, "one_time": one_time, "one_time_total": ot,
            "recurring": recurring, "year": rec, "month": rec / 12,
            "year1": ot + rec, "year2": rec}


vault = [(f"2 × {VAULT_DRIVE[0]}", 2 * VAULT_DRIVE[1])]

A = option("Essential", TEAM, [],
           [("Google Workspace Business Standard", google(TEAM)["year"]),
            ("IDrive Google Workspace Backup", idrive(TEAM)["year"])])

B = option("Recommended", TEAM, vault,
           [("Google Workspace Business Standard", google(TEAM)["year"]),
            ("IDrive Google Workspace Backup", idrive(TEAM)["year"])])

NAS_DRIVES = 4
NAS_B2_TB = 5   # studio-only working data (Revit central models, render output) copied off-site
C = option("Growth", TEAM_GROWTH,
           [(NAS[0], NAS[1]), (f"{NAS_DRIVES} × {NAS_DRIVE[0]}", NAS_DRIVES * NAS_DRIVE[1]),
            (UPS[0], UPS[1])] + vault,
           [("Google Workspace Business Standard", google(TEAM_GROWTH)["year"]),
            ("IDrive Google Workspace Backup", idrive(TEAM_GROWTH)["year"]),
            (f"Backblaze B2, {NAS_B2_TB} TB of studio data", b2(NAS_B2_TB)["year"])])

# NAS capacity: SHR-1 / RAID 5 on 4 × 8 TB -> one drive of parity
NAS_RAW_TB = NAS_DRIVES * 8
NAS_USABLE_TB = (NAS_DRIVES - 1) * 8
NAS_USABLE_TIB = NAS_USABLE_TB * 1e12 / 2**40


# ---------------------------------------------------------------- comparisons
def primary_table():
    rows = []
    for n in (3, 5, 10):
        g = google(n)
        ms_month = n * MS_STD_INR
        # MS: shared (SharePoint) pool = 1 TB + 10 GB/licence; top up to 3 TB of shared project files
        sp_pool_gb = 1024 + 10 * n
        extra_gb = max(0, 3 * 1024 - sp_pool_gb)
        ms_extra_month = inr(extra_gb * MS_SP_EXTRA_USD_GB)
        dbx_n = max(3, n)
        dbx_month = inr(dbx_n * DROPBOX_ADV_USD) + n * GOOGLE_STARTER_INR
        rows.append({
            "users": n,
            "google_month_ex": g["month_ex"], "google_year_ex": g["year_ex"], "google_year": g["year"],
            "google_tb": g["tb"],
            "ms_month_ex": ms_month, "ms_shared_tb": sp_pool_gb / 1024,
            "ms_extra_month_ex": ms_extra_month, "ms_total_month_ex": ms_month + ms_extra_month,
            "dbx_month_ex": dbx_month, "dbx_tb": 15 + 5 * (dbx_n - 3),
        })
    return rows


def backup_table():
    rows = []
    for tb in (3, 5, 10):
        rows.append({
            "tb": tb,
            "idrive_year": inr(TEAM * IDRIVE_USD_SEAT_YR),
            "b2_year": inr(tb * B2_USD_TB_MO * 12),
            "wasabi_year": inr(max(tb, 1) * WASABI_USD_TB_MO * 12),
            "deep_year": inr(tb * DEEP_ARCHIVE_USD_TB_MO * 12),
            "deep_full_restore": inr(tb * 1000 * DEEP_ARCHIVE_RESTORE_USD_GB),
            "bb_computer_year": inr(TEAM * BB_COMPUTER_USD_YR),
        })
    return rows


def transfer_hours(gb, mbps):
    return gb * 8e9 / (mbps * 1e6 * 0.8) / 3600   # 80% line efficiency


# ---------------------------------------------------------------- output
def as_json():
    def opt(o):
        return {**o, "one_time": [[k, r(v)] for k, v in o["one_time"]],
                "recurring": [[k, r(v)] for k, v in o["recurring"]],
                **{k: r(o[k]) for k in ("one_time_total", "year", "month", "year1", "year2")}}
    return {
        "researched": "18 October 2026",
        "fx": FX, "fx_mid": FX_MID, "gst": GST, "team": TEAM,
        "google": {k: r(v) for k, v in google(TEAM).items()},
        "idrive": {k: r(v) for k, v in idrive(TEAM).items()},
        "vault_drive": VAULT_DRIVE, "options": {"A": opt(A), "B": opt(B), "C": opt(C)},
        "nas": {"raw_tb": NAS_RAW_TB, "usable_tb": NAS_USABLE_TB, "usable_tib": round(NAS_USABLE_TIB, 1)},
        "migration_hours_3tb_100mbps": round(transfer_hours(3000, 100)),
        "restore_hours_50gb_100mbps": round(transfer_hours(50, 100), 1),
    }


def main():
    if "--json" in sys.argv:
        out = Path(__file__).with_name("costs.json")
        out.write_text(json.dumps(as_json(), indent=2, ensure_ascii=False))
        print("wrote", out)
        return

    print(f"FX planning rate ₹{FX}/$ (mid ₹{FX_MID}), GST {GST:.0%}\n")
    print("PRIMARY CLOUD (before GST)")
    for x in primary_table():
        print(f"  {x['users']:>2} users | Google {fmt(x['google_month_ex'])}/mo {fmt(x['google_year_ex'])}/yr "
              f"(incl GST {fmt(x['google_year'])}) {x['google_tb']} TB pooled | "
              f"MS {fmt(x['ms_month_ex'])}/mo, shared {x['ms_shared_tb']:.2f} TB, +{fmt(x['ms_extra_month_ex'])}/mo "
              f"to reach 3 TB = {fmt(x['ms_total_month_ex'])}/mo | Dropbox Adv+email {fmt(x['dbx_month_ex'])}/mo "
              f"{x['dbx_tb']} TB")
    print("\nBACKUP (before GST, per year)")
    for x in backup_table():
        print(f"  {x['tb']:>2} TB | IDrive(5 seats) {fmt(x['idrive_year'])} | B2 {fmt(x['b2_year'])} | "
              f"Wasabi {fmt(x['wasabi_year'])} | Deep Archive {fmt(x['deep_year'])} "
              f"(full restore {fmt(x['deep_full_restore'])}) | BB Computer x5 {fmt(x['bb_computer_year'])}")
    print("\nOPTIONS (incl GST)")
    for o in (A, B, C):
        print(f"  {o['name']} ({o['users']} users)")
        for k, v in o["one_time"]:
            print(f"     one-time  {k:<52} {fmt(v)}")
        print(f"     one-time total {fmt(o['one_time_total'])}")
        for k, v in o["recurring"]:
            print(f"     recurring {k:<52} {fmt(v)}/yr  ({fmt(v / 12)}/mo)")
        print(f"     monthly {fmt(o['month'])} | year 1 {fmt(o['year1'])} | year 2+ {fmt(o['year2'])}")
    print(f"\nNAS raw {NAS_RAW_TB} TB, usable {NAS_USABLE_TB} TB (~{NAS_USABLE_TIB:.1f} TiB shown by DSM)")
    print(f"3 TB upload @100 Mbps: {transfer_hours(3000, 100):.0f} h; 50 GB restore: {transfer_hours(50, 100):.1f} h; "
          f"3 TB full restore: {transfer_hours(3000, 100) / 24:.1f} days")
    print(f"Google 750 GB/day/user upload cap: 3 TB needs >= {math.ceil(3000 / 750)} user-days")


if __name__ == "__main__":
    main()
