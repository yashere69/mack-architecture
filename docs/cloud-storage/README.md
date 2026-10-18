# MACK cloud storage + backup

| File | For |
|---|---|
| `MACK-Cloud-Storage-Backup.pdf` | Client-facing recommendation (6 pages) |
| `mack-cloud-decision.md` | Technical research, comparison, sources, costs |
| `mack-cloud-implementation.md` | Setup / handoff checklist, backup + recovery procedure, upgrade triggers |
| `source/` | Editable PDF source: `costs.py` (all prices and arithmetic), `template.html` (layout), `build-pdf.mjs` |

Rebuild after changing a price or the layout:

```bash
python3 docs/cloud-storage/source/costs.py          # check the numbers
python3 docs/cloud-storage/source/costs.py --json   # write costs.json
NODE_PATH=$(npm root -g) node docs/cloud-storage/source/build-pdf.mjs --png   # PDF + page previews
```
The build fails if anything overflows a page. Fonts (Newsreader, Jost: SIL OFL) are bundled in `source/fonts/`.
