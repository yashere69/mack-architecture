# MACK cloud PDF: independent pricing audit (internal)

**Accessed/verified: 18 October 2026.** Every source below was re-opened on this date. I did not reuse the earlier research.
**Audited file:** `MACK-Cloud-Storage-Backup.pdf` (commit f741a02).

**Audit limitation:** `workspace.google.com/intl/en_in/pricing.html` sets its prices from the visitor's location. From this audit environment it showed no prices at all, because the location was detected as "ZZ" (unknown country). The INR figures were instead read from Google's own India business page, which shows them server-side. **Open both Google links from an Indian connection before sending.**

---

## 1. Summary

| Severity | Finding |
|---|---|
| ❌ | **"Two encrypted backup drives" is not true of the drive priced.** WD Elements Portable has **no hardware encryption**. Software encryption (BitLocker) needs Windows Pro/Enterprise/Education, and Windows Home "device encryption" does not encrypt USB drives. |
| ⚠️ | The ₹19,205 WD Elements listing is the **WDBHDW0050BBK-EESN** SKU, a non-worldwide regional code. India warranty service is not confirmed. |
| ⚠️ | **Google has an official introductory price** of ₹864 instead of ₹1,080, for 12 months, for new customers and the first 20 users. The PDF uses list price in Year 1. That is conservative, but Year 1 may really be ₹15,293 lower. |
| ⚠️ | Google's pooled storage is **granted in stages**. The full 10 TB appears only after a US$30-equivalent payment has been made. This matters for migration, not for price. |
| 🔄 | Growth configuration: the APC **BX1100C-IN at ₹6,990 is no longer listed** at the cited retailer. The official Schneider/APC India store has the BX1100I-IN at **₹6,400**. |
| ✅ | IDrive "10 TB per person" is **correct** (10 TB per seat). It was **not** confused with a 10 TB total plan. $20/seat/year is the **standard price, not a promotion**. IDrive's first-year discounts apply only to its computer-backup plans. |
| ✅ | Every arithmetic total in the PDF reproduces exactly from its stated inputs. |

---

## 2. Claim-by-claim audit

| PDF claim | Verified source value | Status | Source |
|---|---:|---|---|
| Google Workspace Business Standard, list | ₹1,080/user/month, annual plan; ₹1,300 flexible | ✅ VERIFIED | [Google India business page](https://workspace.google.com/intl/en_in/business/) |
| Workspace = ₹76,464/yr (5 users, incl. GST) | 1,080 × 5 × 12 = ₹64,800 + 18% (₹11,664) = **₹76,464** | ✅ VERIFIED (list price) | calculation; [GST on Google services 18%](https://support.google.com/paymentscenter/answer/7398224?hl=en-IN) |
| (missing) introductory price | ₹864/user/month, 12 months, new customers, first 20 users → Year 1 **₹61,171** incl. GST | ⚠️ QUALIFY | [Google India business page](https://workspace.google.com/intl/en_in/business/) |
| Workspace = 10 TB "shared" | 2 TB pooled per user × 5 = 10 TB, pooled across the org | ✅ VERIFIED | [Google: Business editions](https://knowledge.workspace.google.com/admin/getting-started/editions/business-editions) |
| (implied) 10 TB available from day 1 | "Pooled storage is granted in stages… increases to your total storage limit after you make a $30 USD payment" | ⚠️ QUALIFY | same page |
| IDrive = 10 TB per person | "$20/Seat/Year with 10 TB storage per seat"; a seat = one Google Workspace user | ✅ VERIFIED | [IDrive Google Workspace Backup](https://www.idrive.com/google-workspace-backup/), [IDrive pricing](https://www.idrive.com/pricing) |
| IDrive = ₹11,446/yr (5 people) | $100 × ₹97 = ₹9,700 + 18% = **₹11,446**. At the ECB reference rate (₹94.96): ₹11,205 | ⚠️ QUALIFY (FX assumption) | IDrive pages above; [ECB rate via Frankfurter](https://api.frankfurter.dev/v1/latest?base=USD&symbols=INR) |
| IDrive price is permanent | Add-on price $20/seat/year. The "30%/50% off first year" note covers only Mini/Personal/Team/Business plans. | ✅ VERIFIED (not promotional) | [IDrive pricing](https://www.idrive.com/pricing) (footnote *) |
| Backup 3× a day | "backed up three times a day" (Gmail, Drive, Shared Drives…) | ✅ VERIFIED | [IDrive GW Backup](https://www.idrive.com/google-workspace-backup/) |
| "Earlier versions kept" | "Automatic snapshot schedules…retention of multiple versions". **Retention period not stated.** | ⚠️ QUALIFY | same page |
| $1 = ₹97 | ECB reference 16 Oct 2026: ₹94.96; mid-market 18 Oct: ₹95.03–95.08. ₹97 is ~2.1% above, a reasonable card rate. | ⚠️ QUALIFY (must be disclosed) | [Frankfurter/ECB](https://api.frankfurter.dev/v1/latest?base=USD&symbols=INR), [open.er-api](https://open.er-api.com/v6/latest/USD) |
| 2 × 5 TB drives @ ₹19,205 = ₹38,410 | WD Elements Portable 5 TB, ₹19,205 (MRP ₹21,999), in stock, 2-yr warranty. Spec table: **WDBHDW0050BBK-EESN** | ⚠️ QUALIFY (price true; SKU/warranty) | [Vishal Peripherals product page](https://vishalperipherals.com/products/western-digital-5tb-elements-portable-hard-disk-drive-wdbhdw0050bbk-eb) |
| "Two **encrypted** backup drives" | WD Elements has no hardware encryption (WD page lists none). BitLocker requires Pro/Enterprise/Education; Home "device encryption… doesn't encrypt external/USB drives". | ❌ INCORRECT as priced | [WD Elements (WD India)](https://www.westerndigital.com/en-in/products/portable-drives/wd-elements-portable-usb-3-0-hdd?sku=WDBHDW0050BBK-WESN), [Microsoft BitLocker overview](https://learn.microsoft.com/en-us/windows/security/operating-system-security/data-protection/bitlocker/) |
| Recurring = ₹87,910/yr | ₹76,464 + ₹11,446 = **₹87,910** | ✅ VERIFIED (list price, ₹97/$) | calculation |
| ₹7,326 a month | ₹87,910 ÷ 12 = ₹7,326. **Average only.** Google bills monthly (₹6,372); IDrive is charged once a year (₹11,446). | ⚠️ QUALIFY | calculation |
| Initial = ₹38,410 | Reproduces, but the drive model should change (below) | ⚠️ → must correct | — |
| Year 1 = ₹1,26,320 | ₹38,410 + ₹87,910 = ₹1,26,320 | ✅ arithmetic / ⚠️ inputs | calculation |
| Year 2+ = ₹87,910 | ₹87,910 (no promo in PDF inputs) | ✅ VERIFIED | calculation |
| Recommended = 10 TB online + 5 TB on drives | 10 TB pooled; 2 identical 5 TB copies = 5 TB capacity | ✅ VERIFIED | above |
| Essential: ₹0 / ₹7,326 / ₹87,910 | same inputs as Recommended, minus drives | ✅ VERIFIED | calculation |
| Growth: 20 TB online | 10 users × 2 TB pooled | ✅ VERIFIED | Google editions page |
| Growth: 24 TB in studio | 4 × 8 TB, one drive's parity (SHR-1) = 24 TB decimal; DSM shows ≈21.8 TiB before filesystem overhead | ⚠️ QUALIFY | arithmetic |
| Growth: DS925+ ₹77,150 | ₹77,150 (MRP ₹99,999). Only one retailer checked. | ✅ VERIFIED (single retailer) | [Vishal Peripherals: Synology](https://vishalperipherals.com/collections/synology) |
| Growth: 4 × WD Red Pro 8 TB @ ₹43,775 | ₹43,775 each, in stock = ₹1,75,100 | ✅ VERIFIED | [Vishal Peripherals: WD8005FFBX](https://vishalperipherals.com/products/western-digital-8tb-wd-red-pro-nas-internal-hard-drive-hdd-wd8005ffbx) |
| Growth: UPS ₹6,990 (BX1100C-IN) | Cited URL now sells **BX1100I-IN at ₹7,190**. Official APC India store: **BX1100I-IN ₹6,400**, incl. all taxes. | 🔄 OUTDATED | [Schneider/APC India eShop](https://eshop.se.com/in/catalogsearch/result/?q=BX1100), [estorewale](https://estorewale.com/product/apc-back-ups-1100va-bx1100c-in) |
| Growth: B2 5 TB | $6.95/TB/month × 5 × 12 × 97 × 1.18 = ₹47,730; no minimum duration; free egress up to 3× stored | ✅ VERIFIED | [Backblaze B2 pricing](https://www.backblaze.com/cloud-storage/pricing) |
| Growth: IDrive 10 seats ₹22,892 | $200 × 97 × 1.18 | ✅ VERIFIED | IDrive pricing |
| Growth: Google 10 users ₹1,52,928 | 1,080 × 10 × 12 × 1.18 | ✅ VERIFIED (list) | Google India page |
| Growth one-time ₹2,97,650 | with the ₹6,400 UPS: **₹2,97,060** (Elements) / **₹2,99,370** (My Passport) | 🔄 must update | calculation |
| Growth recurring ₹2,23,550 / ₹18,629 mo | reproduces | ✅ VERIFIED | calculation |
| Bin keeps files 30 days | "Files you move to the Trash are deleted forever after 30 days." Admins can restore up to 25 days after the trash is emptied. | ✅ VERIFIED | [Drive Help](https://support.google.com/drive/answer/2375102), [Admin restore](https://support.google.com/a/answer/6052340?hl=en) |
| Earlier versions, last 30 days | non-Google files: a version "might be permanently deleted after 30 days or if there are 100 newer versions" | ✅ VERIFIED | [Drive version history](https://support.google.com/drive/answer/2409045) |
| "All prices include 18% GST" | Subscriptions: GST added at 18% in the model. Hardware: retail prices are GST-inclusive (Vishal issues GST invoices; Schneider shows "Inclusive of all Taxes"). | ✅ VERIFIED | above |

---

## 3. Source pack

### Google Workspace Business Standard
**Claim:** 5 users, 10 TB pooled, ₹76,464/yr incl. GST.
**Official evidence:**
- India business page shows "₹1040 / ₹864 / ₹1080** / ₹1300**", "All prices ₹INR", "Annual (Save 16% with one-year commitment)", "All plans billed monthly".
- Footnote: "Offer available to new Google Workspace customers only. This introductory price is only available for the first 20 users added, for 12 months. Standard pricing will apply to all users after 12 months… Final price will be shown before completing sign-up."
- Ratios: 864/1080 = 1040/1300 = 0.80, so the list is ₹1,080 annual and ₹1,300 flexible.
- Editions page: Business Standard "2 TB pooled storage per user", up to 300 users, with full pooled storage granted after a US$30-equivalent payment.

**URLs:** <https://workspace.google.com/intl/en_in/business/> · <https://knowledge.workspace.google.com/admin/getting-started/editions/business-editions> · GST: <https://knowledge.workspace.google.com/admin/billing/taxes-in-your-region>, <https://support.google.com/paymentscenter/answer/7398224?hl=en-IN>

| | List (annual commitment) | Introductory (Year 1 only, if offered) |
|---|---:|---:|
| Per user/month | ₹1,080 | ₹864 |
| × 5 × 12 | ₹64,800 | ₹51,840 |
| + 18% GST | ₹11,664 | ₹9,331 |
| **Annual** | **₹76,464** | **₹61,171** |
| Billed per month | ₹6,372 | ₹5,098 |

Flexible plan (no commitment): ₹1,300 × 5 × 12 × 1.18 = ₹92,040/yr.

### IDrive
**Product:** IDrive **Google Workspace Backup**, sold under Cloud Applications Backup. It can be added to a free 10 GB IDrive Basic account, so no paid IDrive plan is needed.
**Official evidence:**
- "$20/Seat/Year with 10 TB storage per seat."
- "A seat refers to… a Google Workspace user… Each seat added to the account will be charged $20/Year."
- "Storage beyond the assigned 10 TB per seat will be charged $5/TB/Month. Storage beyond 10 TB for a shared drive will incur overuse charges at $5/TB/Month."
- "Monthly plans available at $2/Seat."
- "backed up three times a day".
- The first-year discount footnote applies only to "Mini, Personal, Team, and Business plans".

**URLs:** <https://www.idrive.com/google-workspace-backup/> · <https://www.idrive.com/pricing>

| | Annual billing | At ECB rate |
|---|---:|---:|
| $20 × 5 seats | $100 | $100 |
| × FX | ₹97 → ₹9,700 | ₹94.96 → ₹9,496 |
| + 18% IGST (reverse charge if GST-registered; not stated by IDrive) | ₹1,746 | ₹1,709 |
| **Annual** | **₹11,446** | **₹11,205** |

Renewal is the same price; no promotion is involved. Monthly billing would be $2 × 5 × 12 = $120, i.e. ₹13,735/yr. Not verified on the page: minimum seats, retention length, restore charges. None are stated, so get them in writing.

### Backup drives
**PDF item:** WD Elements Portable 5 TB, ₹19,205.
**Evidence:**
- Vishal Peripherals: ₹19,205 (MRP ₹21,999), "In Stock", "Warranty: 2 Year". The spec table says **WDBHDW0050BBK-EESN**.
- WD India product page lists a 2-year limited warranty and no encryption feature. WD India shows no prices and points to resellers.
- MD Computers' search listing shows Elements 5 TB at ₹19,180.

**Recommended replacement (meets the "encrypted" claim):** **WD My Passport 5 TB, WDBPKJ0050BBK-WESN.**
- "Password protection + 256-bit AES hardware encryption"; 3-year limited warranty (WD India page).
- Vishal Peripherals: **₹20,360** (MRP ₹21,999), in stock, worldwide SKU.
- MD Computers search listing: ₹19,799.

**URLs:**
- <https://vishalperipherals.com/products/western-digital-5tb-elements-portable-hard-disk-drive-wdbhdw0050bbk-eb>
- <https://vishalperipherals.com/products/western-digital-5tb-my-passport-portable-external-hard-drive>
- <https://www.westerndigital.com/en-in/products/portable-drives/wd-my-passport-usb-3-0-hdd?sku=WDBPKJ0050BBK-WESN>
- <https://www.westerndigital.com/en-in/products/portable-drives/wd-elements-portable-usb-3-0-hdd?sku=WDBHDW0050BBK-WESN>
- <https://mdcomputers.in/index.php?route=product/search&search=WD%205TB>

**Calculation:**
- My Passport: 2 × ₹20,360 = **₹40,720** (Vishal, product page verified), or 2 × ₹19,799 = ₹39,598 (MD Computers, listing only).
- Elements: 2 × ₹19,205 = ₹38,410.
- Shipping is "calculated at checkout" at Vishal and was not verified.

### Other services and hardware (Growth only)
| Item | Value | URL |
|---|---:|---|
| Synology DS925+ | ₹77,150 | <https://vishalperipherals.com/collections/synology> |
| WD Red Pro 8 TB WD8005FFBX | ₹43,775 × 4 = ₹1,75,100 | <https://vishalperipherals.com/products/western-digital-8tb-wd-red-pro-nas-internal-hard-drive-hdd-wd8005ffbx> |
| APC Back-UPS BX1100I-IN | ₹6,400 incl. taxes (official) | <https://eshop.se.com/in/catalogsearch/result/?q=BX1100> |
| Backblaze B2 | $6.95/TB/mo; no minimum duration; free egress ≤ 3× stored | <https://www.backblaze.com/cloud-storage/pricing> |

---

## 4. Non-price claims that affect cost
- **2 TB/user, pooled, 5 users = 10 TB:** ✅ official. However, storage arrives in stages. Make the first payment early, before the bulk migration.
- **IDrive capacity:** ✅ 10 TB per seat. Shared drives get a separate 10 TB-per-shared-drive overuse threshold, which is the page's wording. MACK's 3 TB is far below both.
- **3× daily:** ✅. **Retention length:** not published, so confirm in the console or with IDrive before claiming "a year back".
- **Trash 30 days / versions 30 days or 100 versions:** ✅.
- **Encrypted drives:** ❌ with WD Elements on Windows Home. ✅ with My Passport (hardware AES), or with Elements plus BitLocker To Go on Windows Pro.
- **Annual Google plan:** licences can't be reduced mid-term, so you pay for leavers until renewal. (Flexible ₹1,300 avoids this.)

## 5. Hidden costs check
| Item | Realistic? | Amount |
|---|---|---|
| GST | Included in model; reclaimable as ITC if MACK is GST-registered | — |
| FX / card markup | Yes. ₹94.96–₹97+ per $ | IDrive ±₹250/yr. Immaterial. |
| Renewal increases | Google: Year 2 reverts to ₹1,080 if the intro offer was taken. IDrive: none published. | — |
| Introductory discount | Google: may **lower** Year 1 by ₹15,293 | — |
| Minimum users | Google: none (max 300). IDrive: none stated. | — |
| Storage overage | IDrive $5/TB/mo beyond 10 TB per seat or shared drive; Google pool fixed | Not reached at 3 TB |
| Retrieval/egress | IDrive restore fees not stated (confirm); B2 free ≤ 3× stored | — |
| Shipping (drives) | "Calculated at checkout" | Unverified |
| Encryption software | Not needed with My Passport; BitLocker needs Windows Pro | ₹0 with My Passport |
| Drive replacement | Realistic every ~4–5 years | ~₹40,720 per pair at today's price |
| Extra licences | Each new hire: ₹1,080 × 12 × 1.18 = ₹15,293 Google + $20 → ₹2,289 IDrive = **₹17,582/yr** | Per person |

---

## 6. Verdict

### SAFE TO SEND
- Google Workspace Business Standard, 5 users, **₹76,464/yr incl. GST** (list price), **10 TB pooled**.
- IDrive Google Workspace Backup: **10 TB per person**, **3× a day**, standard (non-promotional) price **$100/yr → ₹11,446 at ₹97/$ incl. GST**.
- Recurring **₹87,910/yr**; Year 2 and Year 3 **₹87,910** each.
- Essential option figures.
- Growth recurring ₹2,23,550 and storage figures (with the "≈" note on 24 TB).
- Bin / version-history claims.

### MUST CORRECT

**1. Drive model and "encrypted" claim**
**PDF currently says:** "Two encrypted backup drives", 2 × 5 TB at ₹19,205 = **₹38,410**
**It should say:** WD My Passport 5 TB (hardware AES) at ₹20,360 each = **₹40,720**
**Reason:** WD Elements has no encryption, and the listed unit is a regional (EESN) SKU. BitLocker To Go is unavailable on Windows Home.
**Source:** <https://vishalperipherals.com/products/western-digital-5tb-my-passport-portable-external-hard-drive>, <https://www.westerndigital.com/en-in/products/portable-drives/wd-my-passport-usb-3-0-hdd?sku=WDBPKJ0050BBK-WESN>, <https://learn.microsoft.com/en-us/windows/security/operating-system-security/data-protection/bitlocker/>
*(Alternative: keep Elements at ₹38,410 and change "encrypted" to "encrypted with BitLocker on a Windows Pro PC". Confirm that MACK owns one.)*

**2. Initial investment / Year 1**
**PDF currently says:** Initial **₹38,410**; Year 1 **₹1,26,320**
**It should say:** Initial **₹40,720**; Year 1 **₹1,28,630**
**Reason:** follows from correction 1 (₹40,720 + ₹87,910).
**Source:** calculation.

**3. Growth one-time**
**PDF currently says:** **₹2,97,650**; Year 1 **₹5,21,200**
**It should say:** **₹2,99,370**; Year 1 **₹5,22,920**
**Reason:** UPS BX1100C-IN ₹6,990 is no longer listed, and the official APC store has BX1100I-IN at ₹6,400. Vault drives also change to ₹40,720.
**Source:** <https://eshop.se.com/in/catalogsearch/result/?q=BX1100>

**4. Disclose Google's introductory price (wording, not a number change)**
**PDF currently says:** nothing about it.
**It should say:** "If Google's new-customer offer appears at sign-up (₹864/user for 12 months), Year 1 is ₹15,293 lower."
**Reason:** an official, time-limited price exists. The PDF correctly uses list price for running costs, but should say so.
**Source:** <https://workspace.google.com/intl/en_in/business/>

**5. "₹7,326 a month" (wording)**
**It should say:** "≈ ₹7,326 a month on average (Google billed monthly ₹6,372; backup ₹11,446 once a year)".
**Reason:** IDrive is billed annually.
**Source:** IDrive pricing page.

### Corrected cost summary: Recommended configuration
**Cloud:** Google Workspace Business Standard, 5 users, annual plan, list ₹1,080 + GST → ₹76,464/yr (10 TB pooled)
**Backup:** IDrive Google Workspace Backup, 5 seats, $100/yr → ₹11,446/yr at ₹97/$ incl. 18% GST
**Physical archive:** 2 × WD My Passport 5 TB (256-bit AES), ₹20,360 each

| | List pricing (use in PDF) | If Google intro offer is applied |
|---|---:|---:|
| **Initial** | **₹40,720** | ₹40,720 |
| Monthly (average) | ₹7,326 | Year 1: ₹6,051 |
| **Year 1** | **₹1,28,630** | ₹1,13,337 |
| **Year 2** | **₹87,910** | ₹87,910 |
| **Year 3** | **₹87,910** | ₹87,910 |

Before sending, verify Google's price on the sign-up screen from India, and get IDrive's retention period and restore charges in writing.
