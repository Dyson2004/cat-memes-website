"""把 GTM 與 GA4 代碼插入本區所有 HTML 頁面（只改未包含的標籤）。"""
import pathlib

ROOT = pathlib.Path(__file__).parent.parent
GTM_ID = "GTM-KXMHVXVS"          # GTM 容器識別碼（已確認）

HEAD_GTM = """
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+'&dl='+l;
f.parentNode.insertBefore(j,f)})(window,document,'script','dataLayer','GTM-KXMHVXVS');</script>
<!-- End Google Tag Manager -->"""

BODY_GTM = """
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KXMHVXVS"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->"""

GA4 = """
<!-- Google Analytics (GA4) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', {'send_page_view': true});
</script>
<!-- TODO: 把 G-XXXXXXXXXX 換成 GA4 資料流 ID（步驟 4），或跑 tools/ga4_id.py -->
<!-- End Google Analytics -->"""

done, skip = [], []
for p in sorted(ROOT.glob("*.html")):
    if p.name == "google-site-verification.html": continue
    t = p.read_text(encoding="utf-8")
    if "Google Tag Manager" in t: skip.append(p.name); continue
    t = t.replace("</head>", HEAD_GTM + "</head>", 1)
    t = t.replace("</head>", GA4 + "</head>", 1)
    t = t.replace("</body>", BODY_GTM + "</body>", 1)
    p.write_text(t, encoding="utf-8"); done.append(p.name)
print("已插入：", done)
print("跳過：  ", skip)
