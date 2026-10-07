"""把 GA4 資料流 ID 填進所有 HTML 頁面（替換 G-XXXXXXXXXX）。"""
import pathlib, sys

if len(sys.argv) != 2:
    print("用法：python ga4_id.py G-XXXXXXXXX"); sys.exit(1)
meas, ROOT = sys.argv[1], pathlib.Path(__file__).parent.parent
assert meas.upper().startswith("G-"), "ID 應以 G- 開頭"
done, skip = [], []
for p in sorted(ROOT.glob("*.html")):
    if p.name == "google-site-verification.html": continue
    t = p.read_text(encoding="utf-8")
    if meas in t: skip.append(p.name); continue
    t = t.replace("G-XXXXXXXXXX", meas.upper()); p.write_text(t, encoding="utf-8"); done.append(p.name)
print(f"已填入 {meas.upper()}：", done)
