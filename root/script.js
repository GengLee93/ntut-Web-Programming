// javascript
// Web programming/root/script.js
// 修正後的整份 JS：Table Styler + Dual Model Switcher
(function () {
    // ==================== Table Styler ====================
    function initTableStyler() {
        const table = document.getElementById('statsTable');
        if (!table) return;

        const widthButtons = document.querySelectorAll('.width-btn');
        const spacingSizeButtons = document.querySelectorAll('.spacing-size-btn');
        const colorButtons = document.querySelectorAll('.color-btn');
        const resetBtn = document.getElementById('resetTable');

        // 儲存原始狀態（inline 或 computed 作為 fallback）
        const computedTable = window.getComputedStyle(table);
        const original = {
            inlineWidth: table.style.width || '',
            computedWidth: computedTable.width || '',
            inlineBackground: table.style.backgroundColor || '',
            computedBackground: computedTable.backgroundColor || '',
            inlineBorderSpacing: table.style.borderSpacing || '',
            cellStyles: []
        };

        table.querySelectorAll('th, td').forEach(cell => {
            const cs = window.getComputedStyle(cell);
            original.cellStyles.push({
                borderWidth: cell.style.borderWidth || '',
                borderStyle: cell.style.borderStyle || '',
                background: cell.style.backgroundColor || '',
                computedBackground: cs.backgroundColor || ''
            });
        });

        // 寬度按鈕
        widthButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const w = btn.dataset.width || '';
                table.style.width = w;
            });
        });

        // spacing-size 按鈕：改 table.borderSpacing 與每個 cell 的 borderWidth
        spacingSizeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const px = btn.dataset.px || '1';
                const pxVal = px.toString().endsWith('px') ? px.toString() : px.toString() + 'px';
                table.style.borderSpacing = pxVal;
                table.querySelectorAll('th, td').forEach(cell => {
                    cell.style.borderStyle = 'solid';
                    cell.style.borderWidth = pxVal;
                });
            });
        });

        // 背景色按鈕（保留 thead th 的背景）
        colorButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const color = btn.dataset.color || '';
                table.style.backgroundColor = color;
                // tbody td 保持透明以顯示 table 背景
                table.querySelectorAll('tbody td').forEach(td => td.style.backgroundColor = 'transparent');
                // 確保 thead th 有可視背景（若原來沒有 inline，就設定成 computed 或白色）
                table.querySelectorAll('thead th').forEach((th, idx) => {
                    if (!th.style.backgroundColor) {
                        th.style.backgroundColor = window.getComputedStyle(th).backgroundColor || '#fff';
                    }
                });
            });
        });

        // Reset：還原到原始 inline 樣式（若原本沒 inline 就清空 inline）
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                table.style.width = original.inlineWidth; // 會是空字串或原 inline
                table.style.backgroundColor = original.inlineBackground;
                table.style.borderSpacing = original.inlineBorderSpacing;

                const cells = table.querySelectorAll('th, td');
                cells.forEach((cell, i) => {
                    const s = original.cellStyles[i] || {};
                    cell.style.borderWidth = s.borderWidth || '';
                    cell.style.borderStyle = s.borderStyle || '';
                    // 還原 cell 的 inline 背景（若原本沒有 inline，會清空）
                    cell.style.backgroundColor = s.background || '';
                });
            });
        }
    }

    // ==================== Dual Model Image Switcher ====================
    const ayakImages = [
        "https://cdn.meideinthe.cloud/entirestudios.com/content/player/592-ayak-wears-raglan-bomber-black-suede/entire-studios-raglan-bomber-black-suede-ayak-01.webp",
        "https://cdn.meideinthe.cloud/entirestudios.com/content/player/592-ayak-wears-raglan-bomber-black-suede/entire-studios-raglan-bomber-black-suede-ayak-02.webp",
        "https://cdn.meideinthe.cloud/entirestudios.com/content/player/592-ayak-wears-raglan-bomber-black-suede/entire-studios-raglan-bomber-black-suede-ayak-03.webp",
        "https://cdn.meideinthe.cloud/entirestudios.com/content/player/592-ayak-wears-raglan-bomber-black-suede/entire-studios-raglan-bomber-black-suede-ayak-04.webp",
        "https://cdn.meideinthe.cloud/entirestudios.com/content/player/592-ayak-wears-raglan-bomber-black-suede/entire-studios-raglan-bomber-black-suede-ayak-05.webp",
        "https://cdn.meideinthe.cloud/entirestudios.com/content/player/592-ayak-wears-raglan-bomber-black-suede/entire-studios-raglan-bomber-black-suede-ayak-06.webp",
        "https://cdn.meideinthe.cloud/entirestudios.com/content/player/592-ayak-wears-raglan-bomber-black-suede/entire-studios-raglan-bomber-black-suede-ayak-07.webp",
        "https://cdn.meideinthe.cloud/entirestudios.com/content/player/592-ayak-wears-raglan-bomber-black-suede/entire-studios-raglan-bomber-black-suede-ayak-08.webp"
    ];
    const ballaImages = [
        "https://cdn.meideinthe.cloud/entirestudios.com/content/player/591-balla-wears-raglan-bomber-black-suede/entire-studios-raglan-bomber-black-suede-balla-01.webp",
        "https://cdn.meideinthe.cloud/entirestudios.com/content/player/591-balla-wears-raglan-bomber-black-suede/entire-studios-raglan-bomber-black-suede-balla-02.webp",
        "https://cdn.meideinthe.cloud/entirestudios.com/content/player/591-balla-wears-raglan-bomber-black-suede/entire-studios-raglan-bomber-black-suede-balla-03.webp",
        "https://cdn.meideinthe.cloud/entirestudios.com/content/player/591-balla-wears-raglan-bomber-black-suede/entire-studios-raglan-bomber-black-suede-balla-04.webp",
        "https://cdn.meideinthe.cloud/entirestudios.com/content/player/591-balla-wears-raglan-bomber-black-suede/entire-studios-raglan-bomber-black-suede-balla-05.webp",
        "https://cdn.meideinthe.cloud/entirestudios.com/content/player/591-balla-wears-raglan-bomber-black-suede/entire-studios-raglan-bomber-black-suede-balla-06.webp",
        "https://cdn.meideinthe.cloud/entirestudios.com/content/player/591-balla-wears-raglan-bomber-black-suede/entire-studios-raglan-bomber-black-suede-balla-07.webp",
        "https://cdn.meideinthe.cloud/entirestudios.com/content/player/591-balla-wears-raglan-bomber-black-suede/entire-studios-raglan-bomber-black-suede-balla-08.webp"
    ];
    let currentModelIndex = 0;

    function initDualModelSwitcher() {
        const ayakImage = document.getElementById('ayakImage');
        const ballaImage = document.getElementById('ballaImage');
        const imageCounter = document.getElementById('imageCounter');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (!ayakImage || !ballaImage || !imageCounter || !prevBtn || !nextBtn) return;

        function updateModelImages() {
            ayakImage.src = ayakImages[currentModelIndex];
            ballaImage.src = ballaImages[currentModelIndex];
            imageCounter.textContent = `Image ${currentModelIndex + 1} of ${ayakImages.length}`;
        }

        prevBtn.addEventListener('click', () => {
            currentModelIndex = (currentModelIndex - 1 + ayakImages.length) % ayakImages.length;
            updateModelImages();
        });

        nextBtn.addEventListener('click', () => {
            currentModelIndex = (currentModelIndex + 1) % ayakImages.length;
            updateModelImages();
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowLeft') {
                currentModelIndex = (currentModelIndex - 1 + ayakImages.length) % ayakImages.length;
                updateModelImages();
            } else if (e.key === 'ArrowRight') {
                currentModelIndex = (currentModelIndex + 1) % ayakImages.length;
                updateModelImages();
            }
        });

        updateModelImages();
    }

    // 啟動一次
    document.addEventListener('DOMContentLoaded', function () {
        initTableStyler();
        initDualModelSwitcher();
    });
})();
