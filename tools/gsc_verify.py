"""把 GSC 驗證碼（meta value）填入所有 HTML 頁面。"""
import pathlib, sys

if len(sys.argv) != 2:
    print("用法：python gsc_verify.py 驗證字串"); sys.exit(1)
meta, ROOT = sys.argv[1], pathlib.Path(__file__).parent.parent
done, skip = [], []
tag = f'<meta name="google-site-verification" content="{meta}" />'
for p in sorted(ROOT.glob("*.html")):
    t = p.read_text(encoding="utf-8")
    if "google-site-verification" in t: skip.append(p.name); continue
    t = t.replace("<head>", "<head>\n" + tag, 1); p.write_text(t, encoding="utf-8"); done.append(p.name)
print("已插入 meta 驗證標籤：", done)
print("請在 GSC 等 10~30 分鐘後確認驗證成功。")
