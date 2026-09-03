class SiteSidebar extends HTMLElement {
  connectedCallback() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const currentSearch = window.location.search;

    this.innerHTML = `
      <div class="topbar">
        <a class="brand" href="index.html">
          <img src="assets/logo-racines.png" alt="Logo RACINES">
          RACINES
        </a>
        <button class="nav-toggle" id="navToggle" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="siteSidebar">
          <span></span><span></span><span></span>
        </button>
      </div>

      <div class="overlay" id="overlay"></div>

      <aside class="sidebar" id="siteSidebar">
        <a class="brand" href="index.html">
          <img src="assets/logo-racines.png" alt="Logo RACINES">
          RACINES
        </a>

        <nav>
          <ul class="nav-list">
            <li><a href="index.html" class="${currentPath === 'index.html' || currentPath === '' ? 'active' : ''}">Accueil</a></li>
            <li><a href="a-propos.html" class="${currentPath === 'a-propos.html' ? 'active' : ''}">Notre mission</a></li>
            <li><a href="nos-actions.html" class="${currentPath === 'nos-actions.html' ? 'active' : ''}">Nos actions</a></li>
            <li><a href="en-construction.html?section=videos" class="${currentPath === 'en-construction.html' && currentSearch.includes('section=videos') ? 'active' : ''}">Vidéos</a></li>
            <li><a href="en-construction.html?section=diy" class="${currentPath === 'en-construction.html' && currentSearch.includes('section=diy') ? 'active' : ''}">Le faire soi-même</a></li>
            <li><a href="index.html#contact">Contact</a></li>
          </ul>
        </nav>

        <div class="sidebar-foot">Association loi 1901<br>Ranville, Normandie</div>
      </aside>
    `;

    this.initEvents();
  }

  initEvents() {
    const navToggle = this.querySelector('#navToggle');
    const sidebar = this.querySelector('#siteSidebar');
    const overlay = this.querySelector('#overlay');

    if (!navToggle || !sidebar || !overlay) return;

    const closeSidebar = () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    };

    navToggle.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('open');
      overlay.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    overlay.addEventListener('click', closeSidebar);

    this.querySelectorAll('.nav-list a').forEach(link => {
      link.addEventListener('click', closeSidebar);
    });
  }
}

customElements.define('site-sidebar', SiteSidebar);