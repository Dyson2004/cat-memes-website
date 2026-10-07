/* 游標聚光互動效果 + Nyan Cat 點擊彩蛋
   來源：Blogger 版本（作業一 Blogger）各章節 inline script 合併去重
   適配：.chapter-card（首頁卡片）、.btn-glow-border / .btn-glow-fill（章節導覽按鈕） */

(function () {
    "use strict";

    var NYAN_IMG = "data:image/png;base64,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";

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    var buttons = document.querySelectorAll(
        ".chapter-card, .btn-glow-border, .btn-glow-fill"
    );

    function setGlowRadius(el) {
        var w = el.getBoundingClientRect().width;
        var r;
        if (el.classList.contains("btn-glow-border")) {
            r = Math.round(w * 0.45);
            r = Math.max(80, Math.min(r, 320));
        } else if (el.classList.contains("btn-glow-fill")) {
            r = Math.round(w * 0.40);
            r = Math.max(80, Math.min(r, 300));
        } else {
            r = Math.round(w * 0.38);
            r = Math.max(160, Math.min(r, 320));
        }
        el.style.setProperty("--glow-r", r + "px");
    }

    function updateAllRadii() {
        buttons.forEach(setGlowRadius);
    }

    function spawnNyan(btn) {
        if (reduceMotion.matches) return;
        var old = document.querySelectorAll(".nyan-wrap");
        for (var i = 0; i < old.length; i++) {
            old[i].parentNode.removeChild(old[i]);
        }
        var rect = btn.getBoundingClientRect();
        var goingRight = Math.random() < 0.5;
        var w = 50;
        var h = 28;
        var startX = rect.left + rect.width / 2 - w / 2;
        var startY = rect.top + rect.height / 2 - h / 2 + (Math.random() * 40 - 20);
        startX = Math.max(0, Math.min(startX, window.innerWidth - w));
        startY = Math.max(0, Math.min(startY, window.innerHeight - h));
        var travel = goingRight
            ? window.innerWidth - startX + 48
            : -(startX + w + 48);
        var dur = 0.9 + Math.random() * 0.5;
        var el = document.createElement("div");
        el.className = "nyan-wrap";
        el.setAttribute("aria-hidden", "true");
        el.style.left = startX + "px";
        el.style.top = startY + "px";
        el.style.setProperty("--dx", Math.round(travel) + "px");
        el.style.setProperty("--nyan-dur", dur.toFixed(2) + "s");
        el.innerHTML =
            '<div class="nyan-art"' +
            (goingRight ? "" : ' style="--sx:-1"') +
            '><img src="' + NYAN_IMG + '" alt=""></div>';
        document.body.appendChild(el);
        setTimeout(function () {
            if (el.parentNode) el.parentNode.removeChild(el);
        }, dur * 1000 + 250);
    }

    updateAllRadii();

    var resizeTimer;
    window.addEventListener("resize", function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateAllRadii, 150);
    });

    buttons.forEach(function (btn) {
        setGlowRadius(btn);

        if (
            btn.classList.contains("btn-glow-border") ||
            btn.classList.contains("btn-glow-fill")
        ) {
            btn.addEventListener("click", function () {
                spawnNyan(btn);
            });
        }

        btn.addEventListener("pointerenter", function () {
            setGlowRadius(btn);
        });

        btn.addEventListener("pointermove", function (e) {
            if (e.pointerType !== "mouse") return;
            if (reduceMotion.matches) return;
            var rect = btn.getBoundingClientRect();
            btn.style.setProperty("--mx", e.clientX - rect.left + "px");
            btn.style.setProperty("--my", e.clientY - rect.top + "px");
            btn.style.setProperty("--lit", "1");
        });

        btn.addEventListener("pointerleave", function () {
            btn.style.setProperty("--lit", "0");
        });

        btn.addEventListener("focus", function () {
            btn.style.setProperty("--mx", "50%");
            btn.style.setProperty("--my", "50%");
            btn.style.setProperty("--lit", "1");
        });

        btn.addEventListener("blur", function () {
            btn.style.setProperty("--lit", "0");
        });
    });
})();
