// components.js - entire studios 品牌組件

/**
 * 生成導航列 HTML
 */
function generateNavbar() {
    return `
    <nav class="navbar">
      <ul>
        <li><a href="home.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="gallery.html">Gallery</a></li>
        <li><a href="showcase.html">Showcase</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </nav>
  `;
}

/**
 * 生成側邊欄 HTML
 * @param {boolean} showOverlay - 是否顯示懸浮效果和連結
 */
function generateSidebar(showOverlay = true) {
    const avatarContent = `
    <img src="https://tse4.mm.bing.net/th/id/OIP.C0nBGLA7xFl8_nPU13r5CwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
         class="first-avatar"
         alt="entire studios founders" />
    <img src="https://tse3.mm.bing.net/th/id/OIP.UZwX5D6wgiHBn9ijsYtJ-gHaJQ?rs=1&pid=ImgDetMain&o=7&rm=3"
         class="second-avatar"
         alt="entire studios collection" />
    ${showOverlay ? `
      <div class="avatar-overlay">
        <span class="overlay-text">Entire Studios</span>
      </div>
    ` : ''}
  `;

    return `
    <aside class="hero">
      <div class="avatar">
        ${avatarContent}
      </div>
      <div class="intro">
        <h1>Entire Studios</h1>
        <p>Making Luxury Accessible</p>
        <p>Est. 2020 | New Zealand</p>
        <p>Email: <a href="mailto:info@entirestudios.com">info@entirestudios.com</a></p>
        <p>Website: <a href="https://entirestudios.com" target="_blank">entirestudios.com</a></p>
      </div>
    </aside>
  `;
}

/**
 * 生成頁尾 HTML
 */
function generateFooter() {
    return `
    <footer>
      <p>2025 entire studios©</p>
    </footer>
  `;
}

/**
 * 初始化所有共用組件
 * @param {Object} options - 配置選項
 * @param {boolean} options.sidebarOverlay - 側邊欄是否顯示懸浮效果
 * @param {boolean} options.showFooter - 是否顯示頁尾
 */
function initComponents(options = {}) {
    const { sidebarOverlay = true, showFooter = true } = options;

    // 插入導航列
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (navbarPlaceholder) {
        navbarPlaceholder.outerHTML = generateNavbar();
    }

    // 插入側邊欄
    const sidebarPlaceholder = document.getElementById('sidebar-placeholder');
    if (sidebarPlaceholder) {
        sidebarPlaceholder.outerHTML = generateSidebar(sidebarOverlay);
    }

    // 插入頁尾
    if (showFooter) {
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            footerPlaceholder.outerHTML = generateFooter();
        }
    }

    // 高亮當前頁面
    highlightCurrentPage();
}

/**
 * 自動為當前頁面的導航連結添加 active class
 */
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';
    const navLinks = document.querySelectorAll('.navbar a');

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// 當 DOM 載入完成後自動初始化
document.addEventListener('DOMContentLoaded', function() {
    initComponents({
        sidebarOverlay: true,
        showFooter: true
    });
});