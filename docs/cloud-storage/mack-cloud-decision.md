# MACK Studio: cloud storage and backup decision

Internal technical record. Prices were researched on **18 October 2026**. Every number below comes from `source/costs.py`; if a price changes, change it there and rebuild.

---

## 1. Decision

| | |
|---|---|
| **Primary cloud** | Google Workspace **Business Standard**, annual commitment |
| **Plan size** | 5 users → **10 TB pooled** (2 TB per user, shared by the whole company) |
| **Backup** | **IDrive Google Workspace Backup**. This is an independent cloud-to-cloud backup at a separate company with separate logins. It backs up Drive, shared drives and Gmail **3× a day** and has 10 TB per seat. |
| **Offline copy** | 2 × 5 TB encrypted "Vault" drives hold every completed project. One stays in the studio safe, the other off-site with a partner. |
| **NAS now?** | **No.** The upgrade triggers are in §9. |
| **Initial capacity** | 10 TB in cloud (3 TB used at migration, about 30%). Vault: 5 TB per drive. |
| **Archive** | Completed projects go to the **MACK Archive** shared drive in the same Workspace: read-only for staff, still backed up, and copied to the Vault drives at close-out. No separate archive service. |
| **Backup frequency** | Cloud backup runs automatically 3×/day. Vault drives are updated at each project close-out and refreshed quarterly. |
| **Retention** | Google keeps 30 days of trash/versions, plus 25 days of admin restore. IDrive snapshots are set to the longest retention the console allows, and never less than 12 months. Vault keeps every completed project indefinitely. |
| **Security** | 2-Step Verification enforced for everyone. Passkeys or security keys for the 2 super-admins. Daily work happens in non-admin accounts. External sharing is limited to named people with access expiry. Vault drives use BitLocker/APFS encryption. |
| **Upgrade trigger** | More than 8–10 people, Revit worksharing, the 10 TB pool over 75% used, or unreliable internet. Any of these moves MACK to Configuration C (§6). |

| Cost (5 users, incl. 18% GST) | |
|---|---|
| **Initial investment** | **₹38,410** (two Vault drives) |
| **Monthly running cost** | **₹7,326** |
| **Year 1 total** | **₹1,26,320** |
| **Year 2+ annual** | **₹87,910** |

Labour is not included, and neither is MACK's existing internet line (≥100 Mbps fibre assumed). Workspace also becomes MACK's company email, so any current email subscription can be cancelled.

**In plain business terms:** one company account holds every project, and MACK owns it rather than any individual employee. Staff work from it on their laptops as if it were a drive. A second company, unconnected to Google, takes a copy three times a day. Finished projects are also copied onto two drives MACK physically holds. If any one of these fails, the other two still have the files. It costs about the same per month as one mid-range software licence.

### Do NOT buy yet
- **NAS / file server.** At 3 TB with 5 people it adds ₹2.6–3 lakh of hardware (HDD prices are high in 2026) and maintenance, and it adds nothing the cloud lacks today.
- **Microsoft 365 alongside Google.** It duplicates mail and storage. Its shared pool is too small anyway (§3).
- **Dropbox, Box, Business Plus/Enterprise, Google extra-storage add-ons.**
- **A separate archive service** (Glacier, Wasabi, B2, Synology C2). The pooled 10 TB has room for years of archives.
- **Backblaze Computer Backup per laptop.** Files live in the cloud and laptops only cache them, so it protects the wrong thing.
- **10 GbE networking, servers, RAID enclosures.**

---

## 2. Layers: what each one is and isn't

| Layer | MACK's implementation | Protects against | Does NOT protect against |
|---|---|---|---|
| Cloud storage | Google shared drives | Laptop loss, office disaster, single disk failure | Anything a signed-in user (or malware acting as them) does |
| Sync | Drive for desktop, *stream* mode, *offline* for active projects | Gives everyone the same `G:` path; offline work during outages | Sync faithfully copies deletions and encryption too |
| Version history | Google: 100 versions / 30 days for DWG/RVT/PSD ([Google](https://support.google.com/drive/answer/2409045)) | Overwrites caught within 30 days | Older mistakes; admin/account compromise; deleting the whole drive |
| Backup | IDrive (separate vendor, separate credentials, snapshots) | Deletion/overwrite past 30 days, ransomware, rogue/compromised admin, Google account suspension | Loss of both Google and IDrive at once (covered by Vault) |
| Archive | MACK Archive shared drive (read-only to staff) | Accidental edits to finished work, clutter | Is still the same Google account (so it is backed up like everything else) |
| Offline copy | Vault drives A/B, encrypted, one off-site | Total online loss, vendor failure, MACK stops paying a subscription | Recent active-project work (covered by IDrive) |
| NAS | None now | — | — |

**Cloud storage is not an independent backup.** Google stores the data redundantly, but a deletion, overwrite or ransomware encryption replicates instantly to every copy Google holds. Independence means a different company, different credentials and point-in-time snapshots. Resulting rule-of-thumb compliance:

**3-2-1-1-0.** There are **3** copies: Google, IDrive and Vault. They sit on **2** different kinds of media: cloud and disk. **1** is off-site: IDrive, plus Vault B. **1** is offline: Vault. And **0** unverified restores, enforced by the recovery tests in the implementation handoff. For active work less than one quarter old, the offline copy is the only gap. It is accepted because IDrive's 3×/day snapshots sit at a separate vendor.

---

## 3. Primary cloud: comparison

5 users, ≥3 TB of *shared, company-owned* project storage. Prices are before GST.

| | Google Workspace Business Standard | Microsoft 365 Business Standard | Dropbox Advanced | Box Business |
|---|---|---|---|---|
| Price | **₹1,080**/user/mo annual (₹1,300 flexible) | **₹860**/user/mo yearly, ₹1,032 monthly ([microsoft.com/en-in](https://www.microsoft.com/en-in/microsoft-365/business/microsoft-365-business-standard)) | $24/user/mo yearly, min 3 ([dropbox.com/plans](https://www.dropbox.com/plans)) | ~$15/user/mo, min 3 ([box.com](https://www.box.com/pricing)) |
| Shared storage | **2 TB × users, pooled** ([Google](https://workspace.google.com/intl/en_in/pricing.html)) | **1 TB + 10 GB/licence** org-wide for SharePoint. OneDrive's 1 TB per user is personal ([Microsoft Learn](https://learn.microsoft.com/en-us/office365/servicedescriptions/sharepoint-online-service-description/sharepoint-online-limits)) | 15 TB team (+5 TB/added licence) | Unlimited |
| Email included | Yes | Yes | No. Email is extra (₹270/user Workspace Starter) | No |
| Version history (binary files) | 30 days / 100 versions | Up to 500 versions (default) | 1 year | 50 versions |
| Large-file sync | Whole-file re-upload on save | Differential sync for Office files only | **Block-level + LAN sync (best)** | Weak; 5 GB file limit |
| Limits that matter | 750 GB/day upload per user; 400,000 items per shared drive ([Google Drive API limits](https://developers.google.com/drive/api/guides/limits)) | 250 GB file; 300k-file sync guidance | 100 GB transfer | 5 GB upload on Business |
| Ransomware help | Drive for desktop ransomware detection and bulk restore (2025) ([Google blog](https://workspace.google.com/blog/product-announcements/ai-ransomware-detection-in-google-drive)) | OneDrive Files Restore (30 days) | Dropbox Rewind | Versioning |

**Cost to hold 3 TB of shared project files (before GST, per month):**

| Users | Google Std | Microsoft Std + extra SharePoint storage | Dropbox Adv + Google email seat |
|---|---|---|---|
| 3 | **₹3,240** (6 TB) | ₹2,580 + ₹39,149 = **₹41,729** | **₹7,794** (15 TB) |
| 5 | **₹5,400** (10 TB) | ₹4,300 + ₹38,761 = **₹43,061** | **₹12,990** (25 TB) |
| 10 | **₹10,800** (20 TB) | ₹8,600 + ₹37,791 = **₹46,391** | **₹25,980** (50 TB) |

Microsoft's extra SharePoint storage costs about $0.20/GB/month. That is roughly ₹19,000 per TB per month, and it rules Microsoft out for a storage-heavy, low-headcount studio. The workaround is putting projects in individual OneDrives, but then files are owned by employees, which is unacceptable. **Google wins on pooled, company-owned storage at the lowest cost, with email included.** Dropbox is the fallback if whole-file re-upload of very large files (Lumion/Revit > 1–2 GB, saved many times a day) becomes a daily pain point (§9).

Google price note: Google's India page renders prices by visitor location and could not be read from the research environment. ₹1,080/₹1,300 is the list price reported by Indian Google partners, verified against workspace.google.com on 30 June 2026 ([unicoconnect](https://unicoconnect.com/google-workspace-pricing-india), [precisiontech](https://precisiontech.in/domain-hosting-email/email-solutions/google-workspace/)). New customers may get a 20%-off first-year offer (₹864) for up to 20 users. **Budgeted at list price.** If the offer applies, Year 1 falls by ₹15,293. Confirm on the checkout screen.

---

## 4. Backup: comparison

Before GST, per year. The planning rate is ₹97/$ (mid-market ₹95.08 on 18 Oct 2026 plus ~2% card forex margin).

| Option | Model | 3 TB | 5 TB | 10 TB | Fees and catches | Verdict |
|---|---|---|---|---|---|---|
| **IDrive Google Workspace Backup** ([idrive.com](https://www.idrive.com/google-workspace-backup/)) | $20/seat/yr, 10 TB per seat; shared drives included (10 TB each before $5/TB/mo overage) | **₹9,700** | **₹9,700** | **₹9,700** | Per-user, so cost doesn't grow with TB. 3 backups/day, snapshots, AES-256, 7 regions incl. Asia. No hardware. | **Chosen** |
| CubeBackup + B2 ([cubebackup.com](https://cubebackup.com/pricing)) | $5/user/yr + your own bucket | ₹2,425 + ₹24,269 | ₹2,425 + ₹40,449 | ₹2,425 + ₹80,898 | Self-hosted. Needs an always-on PC/VM/NAS, so more for MACK to look after. | Good fallback |
| Synology Active Backup for Google Workspace ([synology.com](https://www.synology.com/en-global/dsm/feature/active_backup_google_workspace)) | Free licence on a Synology NAS | hardware | hardware | hardware | Needs the NAS. Fast local restores. | Used in Growth |
| Backblaze B2 ([backblaze.com](https://www.backblaze.com/cloud-storage/pricing)) | $6.95/TB/mo | ₹24,269 | ₹40,449 | ₹80,898 | Egress free to 3× stored. No minimum duration. Object Lock free. Needs a tool to feed it. | Target for NAS data in Growth |
| Wasabi ([wasabi.com](https://wasabi.com/pricing)) | $7.99/TB/mo | ₹27,901 | ₹46,502 | ₹93,004 | 1 TB minimum, 90-day minimum storage, no egress fees | No advantage over B2 |
| AWS S3 Glacier Deep Archive ([aws](https://aws.amazon.com/s3/pricing/)) | ~$0.00099/GB/mo | ₹3,527 | ₹5,878 | ₹11,756 | 180-day minimum. 12–48 h retrieval. **A full restore costs ₹32,010 / ₹53,350 / ₹1,06,700.** IAM complexity. | Not for a non-technical studio |
| Synology C2 | NAS-only; plans moving to "C2 OneStorage" (June 2026), prices not published at research time ([blackvoid](https://www.blackvoid.club/synology-c2-cloud-service-changes-for-2026/)) | — | — | — | Lock-in to Synology | No |
| Backblaze Computer Backup ([backblaze.com](https://www.backblaze.com/cloud-backup/pricing)) | $99/computer/yr | ₹48,015 (5 PCs) | same | same | Backs up laptops, but our files are streamed from cloud and not on the laptop | No |
| Microsoft 365 Backup / Google Vault | — | — | — | — | Vault is retention/eDiscovery, not backup. Microsoft's doesn't apply. | No |
| External HDD rotation alone | ₹19,205 per 5 TB drive | — | — | — | Depends on people remembering | Only as the offline layer |

---

## 5. Incident test (Recommended configuration)

| Incident | Layer that saves MACK | Recovery | Realistic time |
|---|---|---|---|
| File deleted (≤ 30 days) | Google Trash → staff restore themselves | Drive → Trash → Restore | Minutes |
| Deleted and trash emptied (≤ 25 days) | Google Admin restore | Admin console → user → Restore data | Minutes to hours |
| Deleted > 30 days ago | IDrive snapshot | IDrive console → restore to original location | Minutes to hours |
| DWG overwritten | Google version history (≤ 30 days / 100 versions); IDrive snapshot for older | Right-click → File information → Manage versions | Minutes |
| Laptop lost/stolen/dead | Nothing was only on the laptop | Admin console: sign out + wipe the account. New laptop: sign in, Drive for desktop. | ~1 hour to be productive |
| Employee leaves | Shared drives are company-owned; personal My Drive is transferred | Offboarding checklist | Same day |
| Ransomware on a laptop | Drive for desktop detects it and pauses sync. Restore files to pre-attack versions. IDrive snapshot if it spread. | Bulk restore in Drive web, or IDrive point-in-time restore | Hours |
| Admin account compromised / malicious deletion of shared drives | IDrive (separate login + MFA, not administrable from Google) | IDrive restore to a new shared drive | Hours to ~1 day per TB |
| Internet outage | Active project folders marked *Available offline* | Keep working; changes sync later. Phone hotspot for urgent sends. | No downtime for local work |
| Google account suspended / service unavailable | IDrive (download), Vault drives | Download from IDrive to any disk; work locally | 50 GB project ≈ 1.4 h at 100 Mbps; all 3 TB ≈ 3.5 days |
| NAS/drive failure | n/a (no NAS). Vault drive failure → the other Vault + cloud | Replace drive, re-copy | — |
| Studio theft/fire | Everything is in cloud + IDrive + Vault B off-site | Buy laptops, sign in | ~1 day |
| Need a 3-year-old project | MACK Archive shared drive (instant); Vault drive if ever removed from cloud | Open it | Instant |

---

## 6. Three configurations (incl. 18% GST)

| | **A: Essential** | **B: Recommended** | **C: Growth** |
|---|---|---|---|
| For | 5 people | 5 people (scales to ~10) | 10 people, Revit worksharing, >10 TB |
| Primary | Google Workspace Business Standard | same | same (10 users, 20 TB pool) |
| Backup | IDrive (3×/day) | IDrive (3×/day) | IDrive + NAS Active Backup (on-site copy) + B2 for studio-only data |
| Offline | none | 2 × 5 TB Vault drives | Vault drives |
| NAS | no | no | Synology DS925+, 4 × 8 TB WD Red Pro, SHR-1 |
| Storage | 10 TB | 10 TB + 5 TB offline | 20 TB cloud + 24 TB raw-usable NAS (≈21.8 TiB in DSM) |
| One-time | ₹0 | **₹38,410** | **₹2,97,650** |
| Monthly | ₹7,326 | **₹7,326** | ₹18,629 |
| Annual | ₹87,910 | **₹87,910** | ₹2,23,550 |
| Year 1 | ₹87,910 | **₹1,26,320** | ₹5,21,200 |
| Limitations | No copy under MACK's physical control; total reliance on two online vendors | Restores of TBs depend on internet speed; no LAN-speed file server for worksharing | Hardware to maintain (DSM updates, drive replacement ~5 yrs), power/UPS, more admin |

**Why B over A:** for ₹38,410 once, MACK gets a copy of every finished project that does not depend on any subscription, password or internet connection. That is the cheapest insurance in the whole system.

**Growth (C) hardware detail:**

| Item | Choice | Price |
|---|---|---|
| NAS | Synology DS925+ (4-bay, AMD Ryzen V1500B, 4 GB ECC, 2 × 2.5 GbE, 2 × M.2) | ₹77,150 |
| Drives | 4 × WD Red Pro 8 TB (CMR, 5-yr warranty) @ ₹43,775 | ₹1,75,100 |
| Storage arrangement | SHR-1 (= RAID 5 with 4 equal drives), Btrfs, immutable snapshots | — |
| Capacity | 32 TB raw → 24 TB usable (≈21.8 TiB shown in DSM); survives 1 drive failure | — |
| UPS | APC Back-UPS BX1100C-IN, USB-connected for safe shutdown | ₹6,990 |
| Vault drives | carried over from B | ₹38,410 |
| **Total hardware** | | **₹2,97,650** |

DSM 7.3 (Oct 2025) re-allowed third-party HDDs on 2025 Plus models such as the DS925+ ([TechSpot](https://www.techspot.com/news/109787-synology-reverses-course-non-certified-hdds-nas-systems.html)). Synology HAT3300 drives would be the conservative choice if they are in stock at a similar price. The 2026 HDD shortage has pushed 8 TB NAS drives above ₹40,000, which is a further reason not to buy a NAS early. Recurring for C: Google 10 users ₹1,52,928 + IDrive 10 seats ₹22,892 + B2 5 TB ₹47,730 = **₹2,23,550/yr**.

### Scaling the recommended setup (incl. GST, per year)

| Users | Google | IDrive | Total/yr | Per month | Cloud capacity |
|---|---|---|---|---|---|
| 3 | ₹45,878 | ₹6,868 | ₹52,746 | ₹4,396 | 6 TB |
| 5 | ₹76,464 | ₹11,446 | ₹87,910 | ₹7,326 | 10 TB |
| 10 | ₹1,52,928 | ₹22,892 | ₹1,75,820 | ₹14,652 | 20 TB |

---

## 7. Workflow model

```
Shared drives (company-owned)
├── MACK Projects        (active work)
│   └── Residential | Commercial | Hospitality | Interiors
│       └── 2026-014 Sharma Residence
│           ├── 01 Client Documents
│           ├── 02 Site            (survey, photos, video)
│           ├── 03 CAD             (DWG + xrefs, relative paths)
│           ├── 04 3D              (RVT, SKP)
│           ├── 05 Renders         (finals only; caches stay local)
│           ├── 06 Presentations
│           └── 07 Final Deliverables   (issued PDFs, dated sets) ← shared outward
├── MACK Archive         (completed; staff read-only)  └── 2026 / 2027 …
├── MACK Library         (CAD blocks, templates, materials, standards)
└── MACK Office          (contracts, finance, HR; principals + admin only)
```

- **Where files live:** in the shared drives, never in personal My Drive or on the desktop. Laptops hold a cache only.
- **Access:** Drive for desktop mounts `G:\Shared drives\…` (Windows) or `~/Library/CloudStorage/GoogleDrive-…` (Mac). AutoCAD/SketchUp open files directly. Xrefs must be **relative** so Mac and Windows paths both work.
- **One editor per DWG/RVT at a time.** Drive has no file locking for CAD, so two people saving the same file creates conflict copies. Revit worksharing over Drive is **not supported**; until Growth, one person edits a central model at a time.
- **Clients and consultants:** share the `07 Final Deliverables` folder, or a dated subfolder, with named email addresses as *Viewer* and set access expiry. Consultants who must upload get *Contributor* on one `Consultant In` subfolder. Never use "anyone with the link" for client documents.
- **Ownership:** everything in a shared drive belongs to MACK and stays when an employee leaves.
- **Previous versions:** right-click → *File information → Manage versions* (≤ 30 days / 100 versions). Older versions come from IDrive.

**Lifecycle: ACTIVE → COMPLETED → ARCHIVE**
1. *Active* in **MACK Projects**: editable by the team, offline-enabled on the laptops of people working on it.
2. *Completed* (final invoice + handover): the principal moves the project folder to **MACK Archive / {year}**. Staff then have read-only access, and offline sync is turned off.
3. *Archive* stays in Google (pooled storage is already paid for, and it stays searchable and backed up by IDrive). At move time the folder is also **copied to Vault A and Vault B**.
4. Only if the pool passes 75% are archives older than 5 years removed from Google. They stay on both Vault drives, plus optionally a B2 bucket (~₹9,550/TB/yr incl. GST).

---

## 8. Practicalities checked

- **Migration time:** 3 TB at 100 Mbps upload takes ~83 h of transfer. Google caps uploads at 750 GB per user per day, so the job is split across ≥ 2 users/machines or ≥ 4 days. Plan for one week, active projects first.
- **Restore time:** a 50 GB project from IDrive takes ~1.4 h at 100 Mbps; all 3 TB takes ~3.5 days. This is why archives are kept on Vault drives too.
- **India:** Google and Microsoft bill in ₹ with GST. IDrive bills in USD by card, and MACK self-assesses 18% GST under reverse charge if GST-registered. That GST is usually claimable as input credit; this document includes it to stay conservative.
- **Lock-in:** shared drives can be exported (Takeout / Drive for desktop copy). IDrive restores to Google or downloads. The Vault drives are plain folders. No proprietary formats anywhere.

---

## 9. Upgrade triggers

| Trigger | Action |
|---|---|
| Google pool > 75% | Remove Archive projects older than 5 yrs from Google (keep on Vault + optionally B2), or add users |
| > 8–10 staff, or several people on the same Revit model | Configuration C: NAS for worksharing + on-site backup |
| Large files (> 2 GB) re-uploaded many times a day, slowing everyone | First check upload speed; then trial Dropbox Advanced (block sync, LAN sync) on one team |
| Internet down > 2×/month or upload < 50 Mbps | Second ISP / 5G backup line, then NAS |
| Single shared drive > 10 TB or > 300,000 items | Split by year/category (IDrive overage and the Google 400k limit) |
| Vault drives > 80% full or 5 years old | Buy the next pair (≥ 8 TB) |
| Client contract requires India data residency / audit | Re-evaluate Business Plus/Enterprise (Vault, data regions) |

---

## 10. Sources (accessed 18 Oct 2026)
- Google Workspace plans, pooled storage, max 300 users: <https://workspace.google.com/intl/en_in/pricing.html>
- Google Workspace INR list prices (partner-verified 30 Jun 2026): <https://unicoconnect.com/google-workspace-pricing-india>, <https://precisiontech.in/domain-hosting-email/email-solutions/google-workspace/>
- Drive version history (30 days / 100 versions): <https://support.google.com/drive/answer/2409045>
- Drive limits (750 GB/day, 5 TB file): <https://developers.google.com/drive/api/guides/limits>
- Drive ransomware detection: <https://workspace.google.com/blog/product-announcements/ai-ransomware-detection-in-google-drive>
- Microsoft 365 India prices: <https://www.microsoft.com/en-in/microsoft-365/business/microsoft-365-business-standard>, <https://www.microsoft.com/en-in/microsoft-365/business/compare-all-microsoft-365-business-products>
- SharePoint storage (1 TB + 10 GB/licence): <https://learn.microsoft.com/en-us/office365/servicedescriptions/sharepoint-online-service-description/sharepoint-online-limits>
- Extra SharePoint storage ~$0.20/GB/mo: <https://www.syskit.com/blog/sharepoint-storage-pricing>
- Dropbox plans: <https://www.dropbox.com/plans>
- Box plans: <https://www.box.com/pricing>
- IDrive Google Workspace Backup: <https://www.idrive.com/google-workspace-backup/>
- CubeBackup: <https://cubebackup.com/pricing>
- Backblaze B2: <https://www.backblaze.com/cloud-storage/pricing>; Object Lock: <https://www.backblaze.com/docs/cloud-storage-object-lock>
- Backblaze Computer Backup: <https://www.backblaze.com/cloud-backup/pricing>
- Wasabi: <https://wasabi.com/pricing>
- AWS S3/Glacier: <https://aws.amazon.com/s3/pricing/>
- Synology Active Backup for Google Workspace: <https://www.synology.com/en-global/dsm/feature/active_backup_google_workspace>
- Synology C2 changes: <https://www.blackvoid.club/synology-c2-cloud-service-changes-for-2026/>
- Synology DSM 7.3 third-party drives: <https://www.techspot.com/news/109787-synology-reverses-course-non-certified-hdds-nas-systems.html>
- Indian hardware prices (DS925+, WD Red Pro 8 TB, WD Elements 5 TB): <https://vishalperipherals.com/collections/synology>; UPS: <https://estorewale.com/product/apc-back-ups-1100va-bx1100c-in>
- FX: <https://open.er-api.com/v6/latest/USD> (₹95.08, 18 Oct 2026)

**Verify at purchase:** Google's checkout price/intro offer, IDrive's seat minimum and retention options in its console, and hardware street prices. HDD prices are moving fast in 2026.
