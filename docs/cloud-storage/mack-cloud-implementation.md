# MACK Studio: implementation handoff

This builds **Configuration B**: Google Workspace Business Standard, IDrive Google Workspace Backup and 2 encrypted Vault drives. The reasoning and prices are in `mack-cloud-decision.md`. Placeholders: `mack.in` stands for MACK's real domain, and `P1`/`P2` are the two principals.

**Rule: nothing is "deployed" until §19 recovery tests pass and are logged.**

---

## 0. Before you start (collect)
- [ ] Domain registrar login (DNS access for MX/TXT records)
- [ ] Company card that allows international payments (IDrive bills in USD)
- [ ] GSTIN, billing address, and the legal entity name exactly as on GST
- [ ] Staff list: name, role, personal phone (for 2SV), laptop OS
- [ ] Inventory of existing files: where they are, roughly how many TB, and which projects are active
- [ ] Upload speed test at the studio (`fast.com`). Below 50 Mbps up, plan migration over nights/weekend.
- [ ] 2 × WD Elements Portable 5 TB bought. Label them **VAULT A** and **VAULT B**.

## 1. Purchase / register
- [ ] Google Workspace → **Business Standard**, region India. Sign up with the principal's details, *not* yours. Choose the **Annual/Fixed-term plan** (₹1,080/user). Check whether the new-customer discount is shown.
- [ ] Verify domain (TXT), then switch MX to Google. Add SPF `v=spf1 include:_spf.google.com ~all`, turn on DKIM (Admin → Apps → Gmail → Authenticate email), and add DMARC `v=DMARC1; p=none; rua=mailto:dmarc@mack.in`. Move DMARC to `quarantine` after 30 days of clean reports.
- [ ] IDrive Google Workspace Backup: create the account with **`backup-admin@mack.in`** (a Google group or alias, not a person). Billing is annual, $20/seat.
- [ ] Billing contacts: principal + `accounts@`. You get no billing role beyond delegated admin.

## 2. Company admin accounts
- [ ] `P1` super admin (principal). `it-admin@mack.in` super admin (break-glass, used by you). That makes exactly **2 super admins**.
- [ ] Daily accounts (`firstname@`) are **not** admins. If you need everyday admin, give your own daily account a custom role (User Management + Services).
- [ ] Break-glass credentials (`it-admin` password + backup codes, IDrive login + backup codes) are printed, sealed in an envelope and kept in the studio safe, with a copy at P1's home.
- [ ] Recovery phone/email on super admins set to company-controlled numbers.

## 3. Employee accounts
- [ ] `firstname@mack.in` for each staff member, in an org unit **Staff** (admins in **Admins**).
- [ ] Groups: `team@` (all staff), `principals@`, `accounts@`, `backup-admin@`. Permissions are granted to groups, never to individuals.
- [ ] Set the user's language, time zone (Asia/Kolkata) and signature template.

## 4. MFA / security (Admin console → Security)
- [ ] **2-Step Verification: Enforced** for all OUs. New-user enrolment period 1 week. Methods: *any except SMS* for Admins; Staff may use Authenticator/passkey.
- [ ] Super admins use **passkeys** on 2 devices each (phone + laptop), or FIDO2 security keys.
- [ ] Password policy: min 12 characters, enforce at next sign-in.
- [ ] Login challenges and *suspicious login* alerts on, and alert recipients = `it-admin@`, `P1`.
- [ ] Alert Center rules: *Device compromised*, *Suspicious login*, *Ransomware activity (Drive for desktop)*, *Leaked password*, *User granted admin privilege*.
- [ ] Devices → Mobile & endpoints → **Basic** management on (enables remote account wipe).
- [ ] Laptops: BitLocker (Windows Pro) / FileVault (Mac) on, OS auto-update, a standard (non-admin) daily OS user where practical.
- [ ] Apps → Google Workspace Marketplace: allow-list only. Third-party API access only for **IDrive** (trusted).

## 5. Shared drives
Create them as `P1`, with membership by group:

| Shared drive | Manager | Content manager | Contributor | Viewer |
|---|---|---|---|---|
| MACK Projects | principals@ | team@ | — | — |
| MACK Archive | principals@ | — | — | team@ |
| MACK Library | principals@ | team@ | — | — |
| MACK Office | principals@ | accounts@ | — | — |

Drive settings (Admin → Apps → Drive and Docs → Sharing settings):
- [ ] Shared drive creation: **only admins/managers can create**. Members can't change drive settings.
- [ ] *Allow people outside MACK to access files in shared drives*: **ON for MACK Projects only**. Turn it off per drive for Office and Archive (Shared drive settings → *Access outside MACK* off).
- [ ] Sharing outside MACK: **ON, warn when sharing**, and default link sharing **Restricted** (not "anyone with link").
- [ ] Turn *Allow users to publish files to the web* off.

## 6. Folder hierarchy
Create the skeleton and a reusable template folder `MACK Library/_Project Template`:
```
MACK Projects/{Residential|Commercial|Hospitality|Interiors}/{YYYY-NNN Client-Project}/
  01 Client Documents  02 Site  03 CAD  04 3D  05 Renders  06 Presentations  07 Final Deliverables
MACK Archive/{YYYY}/
MACK Library/{CAD Blocks|Templates|Materials|Standards|_Project Template}
MACK Office/{Contracts|Finance|HR|Admin}
```
Naming: `YYYY-NNN` project codes (e.g. `2026-014`) and ISO dates in file names (`2026-10-18_GA-Plan_R03.dwg`). No spaces at the start/end and no `# % &`. Keep paths under ~200 characters.

## 7. Permissions
- Access is per **shared drive**, via groups, and that is the only place it is managed.
- Confidential project? Create it as its own shared drive with named members, rather than restricting a subfolder.
- External people never get shared-drive membership. They get **folder** access (§16).
- Quarterly check: Admin → Reports → *Drive audit*, filtered to "Shared externally". Remove anything stale.

## 8. Device sync (Drive for desktop on every laptop)
- [ ] Install Drive for desktop and sign in with the work account.
- [ ] Preferences → **Stream files** (default), drive letter **G:** on all Windows PCs.
- [ ] For each active project the person works on: right-click the folder → *Offline access → Available offline*.
- [ ] Cache location on SSD, with ≥ 100 GB free.
- [ ] Exclude caches/temps: keep Lumion/Enscape/V-Ray caches, `*.bak`, `*.sv$` and Revit `_backup` folders **local** (outside G:). Set AutoCAD's autosave path to `C:\CADTemp`.
- [ ] AutoCAD: xref path type **Relative**. Revit: one editor per file, and no worksharing central models on G:.
- [ ] Turn off any other personal sync (OneDrive "Desktop/Documents backup", Dropbox) to avoid double-sync.
- [ ] Admin → Devices → Drive for desktop: allow, and turn on the ransomware detection setting (default ON in supported versions).

## 9. NAS setup
**Not in scope** for B. Growth (C) build notes are in §Upgrade below.

## 10. RAID / snapshots
Not applicable now. Version history (Google) + snapshots (IDrive) cover this role.

## 11. Independent backup (IDrive Google Workspace Backup)
- [ ] Sign in to the IDrive console as `backup-admin@mack.in`. Turn on 2-factor auth (TOTP) and store its backup codes in the sealed envelope.
- [ ] *Add domain* → authorise with a Google super admin (OAuth/domain-wide delegation scopes as prompted).
- [ ] Storage region: **Asia** (closest available).
- [ ] Select **all users** + **all shared drives**, and turn on *auto-add new users and shared drives*.
- [ ] Services: Drive, Shared Drives, Gmail, Calendar, Contacts.
- [ ] Wait for the first full backup to finish. 3 TB will take days, and progress shows in the console.
- [ ] Turn on email reports for failures to `it-admin@` + P1.
- [ ] Confirm that **IDrive's login is not "Sign in with Google"**. It must be a separate credential, or a Google admin compromise could reach the backup too.

## 12. Encryption
- Google and IDrive: encrypted in transit and at rest (AES-256) by the vendors. Nothing to configure.
- Vault drives: **BitLocker To Go** (Windows Pro) or **APFS Encrypted** (Mac). Use one strong passphrase for both drives, kept in the sealed envelope + P1's password manager. *Losing the passphrase = losing the Vault.*
- Laptops: BitLocker/FileVault (§4).

## 13. Backup schedule
| What | When | Who |
|---|---|---|
| IDrive cloud backup | Automatic, 3×/day | — |
| Check IDrive report has no failures | Weekly (Mon) | Admin/you |
| Copy completed project to Vault A + B | At project close-out | Principal |
| Vault refresh: copy any Archive changes, verify | Quarterly (first week of Jan/Apr/Jul/Oct) | You |
| Rotate: swap Vault B (off-site) with Vault A | Quarterly, same day | Principal |

Vault copy method: plug in the drive, unlock it, then copy `G:\Shared drives\MACK Archive\{year}\{project}` to `VAULT:\MACK Archive\{year}\{project}`. Use **robocopy** so it is repeatable:
```
robocopy "G:\Shared drives\MACK Archive" "E:\MACK Archive" /E /XO /R:2 /W:5 /LOG+:E:\vault-log.txt
```
(Folders must be *Available offline* or robocopy will stream them. The run is slow but works.) Mac: `rsync -av --progress`. Eject, and log the date in `MACK Office/Admin/Backup Log`.

## 14. Retention
| Layer | Setting |
|---|---|
| Google Trash | 30 days (fixed); admin restore up to 25 days after that |
| Google versions | 30 days / 100 versions for non-Google files. For contractual milestones, issue PDFs into `07 Final Deliverables/{date}` rather than relying on versions. |
| IDrive | Console → retention: **the longest option offered / keep all snapshots**, never less than 12 months. Record the chosen value here: `________`. |
| Departed users | Keep their IDrive backup for ≥ 12 months after leaving (check seat handling in console). |
| Vault | Indefinite. Never delete a project from the Vault. |

## 15. Migration of existing files
1. **Freeze map:** list every source (laptops, external drives, old Dropbox/OneDrive, WhatsApp exports) and assign each project to its new path.
2. **Clean before upload:** delete caches/temps (`*.bak`, `*.sv$`, render caches, `Thumbs.db`) and apply the naming convention.
3. **Order:** active projects → Library → Office → Archive.
4. **Upload:** on the studio PC with the best connection, use Drive for desktop (drag into the shared drive), or drive.google.com upload for large batches. **750 GB per user per day cap.** Spread across 2+ accounts for 3 TB, and plan ~1 week at 100 Mbps.
5. **Verify:** compare file counts/sizes (Windows folder *Properties* vs Drive *File info*). Open 5 random DWG/RVT/SKP files, including xref-heavy ones.
6. Keep the **old sources read-only for 60 days** after cut-over, then wipe them, or reuse them as extra cold copies.
7. Copy the migrated Archive to **Vault A + B** (first Vault fill).

## 16. External client/consultant sharing
- Share `07 Final Deliverables` (or a dated subfolder) with **named emails** as **Viewer**, and set **access expiry** (Share → person → *Add expiration*, e.g. 30–90 days).
- Turn off *Viewers can download/print/copy* for draft presentations where appropriate.
- Consultants who send files back get **Contributor** on `02 Site/Consultant In` or `03 CAD/Consultant In` only.
- Huge one-off sends (> 20 GB): share a folder, not attachments. Never use personal WeTransfer/WhatsApp for drawings.
- Never set "Anyone with the link" on `01 Client Documents` or anything in MACK Office.

## 17. Employee offboarding (same day)
1. Admin → user → **Reset password** + **Sign out** + revoke **app passwords/OAuth tokens** + remove 2SV devices.
2. Devices → **wipe account** from their phone/laptop. Collect the laptop.
3. **Data transfer** (Admin → Account → Data transfer) of their My Drive + Calendar to their manager. Shared drives need nothing, because MACK already owns them.
4. Remove the user from groups. This also removes their shared drive access.
5. Email: add their address as an alias on the manager or a shared mailbox, or set an auto-reply for 90 days.
6. Review files they shared externally (Drive audit, actor = user) and remove access as needed.
7. After 30 days: delete the user (frees the licence, and Google lowers the billed seat count at renewal). **Before deleting, confirm IDrive retains their backup**, or keep the seat for 12 months.

## 18. Archive workflow
At close-out (final invoice paid + handover done), the principal:
1. Confirms `07 Final Deliverables` contains the issued set (PDF + DWG) and handover documents.
2. Deletes working junk (render caches, duplicate exports).
3. Moves the project folder `MACK Projects/…/2026-014 X` → `MACK Archive/2026/` (drag in Drive web).
4. Asks staff to turn off *Available offline* for it.
5. Copies it to **Vault A** (and Vault B at the next quarterly rotation), then logs it.

## 19. Recovery testing (mandatory, log every result)
Log location: `MACK Office/Admin/Backup Log` (date, test, file, result, time taken, who).

| # | Test | Steps | Pass when |
|---|---|---|---|
| 1 | **Delete → restore** | Delete a test DWG from MACK Projects; empty it from shared-drive Trash; restore via Admin console (*Restore data*); then repeat and restore from **IDrive** | File reopens identical (size/date) |
| 2 | **Overwrite → previous version** | Save a test DWG twice with visible changes; *Manage versions* → download v1. Then restore a >30-day-old version from an IDrive snapshot (repeat at day 35). | Old content opens in AutoCAD |
| 3 | **Simulated laptop loss** | Sign out a laptop remotely (Admin → Devices), use a different machine: install Drive for desktop, sign in, open an active project with xrefs | Project opens with xrefs resolved in < 1 h |
| 4 | **Primary unavailable → backup** | Pretend Google is unavailable: from IDrive, *download* one full project (≥ 10 GB) to a local disk; open files from there. Also open the same project from **Vault A**. | Files open from both; record download time |

Schedule: all 4 at go-live. Test 1 quarterly (rotating person). Test 4 annually. Also run tests after any change of backup vendor/settings.

---

## Go-live checklist
- [ ] 2SV enforced, 2 super admins, break-glass envelope sealed
- [ ] All staff on Drive for desktop, streaming, G:
- [ ] Shared drives and groups as §5. External sharing defaults Restricted.
- [ ] Migration verified, old sources read-only
- [ ] IDrive first full backup complete, failure emails arriving
- [ ] Vault A + B filled, encrypted, B taken off-site
- [ ] Recovery tests 1–4 passed and logged
- [ ] 30-minute staff walkthrough: where files go, offline folders, one editor per DWG, how to restore from Trash/versions, how to share with a client

## Recurring admin (≈ 1 h/month)
Weekly: IDrive report. Monthly: Alert Center, storage pool % (Admin → Storage). Quarterly: Vault refresh + rotation, external-sharing audit, test 1. Annually: test 4, licence count vs headcount, re-price check.

---

## Upgrade triggers → what to do
| Trigger | Do |
|---|---|
| Pool > 75% (Admin → Storage) | Remove archives > 5 yrs from Google (they stay on Vault, optionally B2 ~₹9,550/TB/yr) |
| > 8–10 staff, Revit worksharing, or slow internet hurting daily work | Build **Configuration C** (below) |
| Large files re-uploading all day | Measure upload; trial Dropbox Advanced with 3 users before switching |
| Internet outages > 2/month | Add a second ISP/5G line before buying hardware |
| One shared drive > 10 TB or > 300k items | Split by year/category |
| Vault > 80% or drives 5 years old | New pair, ≥ 8 TB |

### Configuration C build notes (when triggered)
- **Hardware:** Synology DS925+, 4 × WD Red Pro 8 TB (or Synology HAT3300), APC BX1100C-IN on USB. Both 2.5 GbE ports go to the switch. Place it in a ventilated, locked cabinet.
- **DSM:** latest DSM 7.3+, an admin account other than `admin`, 2FA, auto-block, firewall to LAN only, QuickConnect **off**, no port forwarding.
- **Storage:** SHR-1, Btrfs. Monthly data scrubbing. SMART tests monthly. Email notifications on.
- **Shares:** `StudioWork` for Revit central models / render output (SMB3, groups mirror Google groups).
- **Snapshots:** Snapshot Replication on `StudioWork`: hourly kept 48 h, daily kept 30 d, weekly kept 12 w, **immutable** 14 days.
- **Active Backup for Google Workspace:** back up all users + shared drives (free licence) to its own volume folder. This gives an on-site, LAN-speed restore copy, with retention *keep all versions* for 12 months.
- **Off-site:** Hyper Backup `StudioWork` → **Backblaze B2** bucket (client-side encryption on, encryption key exported and sealed). B2 application key scoped to that bucket only. Daily at 23:00, smart recycle retention.
- **Keep IDrive** as the independent off-site copy of Google, and the NAS as the on-site copy.
- **Recovery tests:** add test 5. Pull one NAS drive, confirm the degraded alert, rebuild. Then restore one folder from B2 onto a laptop.
