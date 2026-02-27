// ============================================================
//  YT REBEL — content.js
//  Todos los features se controlan desde chrome.storage.sync
//  Para añadir un nuevo feature:
//    1. Agrega su clave en DEFAULT_SETTINGS
//    2. Agrega su función en FEATURES
//    3. Agrega su entrada en popup.html
// ============================================================

const DEFAULT_SETTINGS = {
  hideRecientes: true,
  hideMixes: true,
  autoReload: true,
  openVideosTab: true,
};

// ── Estado actual ──────────────────────────────────────────
let settings = { ...DEFAULT_SETTINGS };

// ── Cargar settings y arrancar ─────────────────────────────
chrome.storage.sync.get(DEFAULT_SETTINGS, (stored) => {
  settings = stored;
  initFeatures();
});

// Escuchar cambios en tiempo real desde el popup
chrome.storage.onChanged.addListener((changes) => {
  for (const [key, { newValue }] of Object.entries(changes)) {
    settings[key] = newValue;
  }
  // Re-observar / detener según nuevos settings
  restartObserver();
});

// ══════════════════════════════════════════════════════════
//  FEATURE 1 — Quitar sección "Más recientes / Más relevantes"
// ══════════════════════════════════════════════════════════
const SHELF_TITLES = ['Más recientes', 'Más relevantes'];

function removeShelf() {
  if (!settings.hideRecientes) return;

  document.querySelectorAll('ytd-shelf-renderer').forEach((shelf) => {
    const title = shelf.querySelector('#title');
    if (title && SHELF_TITLES.includes(title.textContent.trim())) {
      shelf.closest('ytd-item-section-renderer')?.remove() || shelf.remove();
    }
  });

  document.querySelectorAll('ytd-rich-shelf-renderer').forEach((shelf) => {
    const title = shelf.querySelector('#title');
    if (title && SHELF_TITLES.includes(title.textContent.trim())) {
      shelf.closest('ytd-rich-section-renderer')?.remove() || shelf.remove();
    }
  });
}

// ══════════════════════════════════════════════════════════
//  FEATURE 2 — Ocultar Mixes
// ══════════════════════════════════════════════════════════
function hideMixVideos() {
  if (!settings.hideMixes) return;

  const selectors = [
    'ytd-video-renderer',
    'ytd-grid-video-renderer',
    'ytd-compact-video-renderer',
    'ytd-playlist-renderer',
    'ytd-radio-renderer',
    'ytd-rich-item-renderer',
  ].join(', ');

  document.querySelectorAll(selectors).forEach((el) => {
    if (el.dataset.rebelHidden) return;
    const text = el.textContent || '';
    if (text.includes('Mix:') || text.includes('Mix -')) {
      el.style.display = 'none';
      el.dataset.rebelHidden = '1';
    }
  });
}

// ══════════════════════════════════════════════════════════
//  FEATURE 3 — Auto-reload en error de contenido
// ══════════════════════════════════════════════════════════
const ERROR_MESSAGES = [
  'Este contenido no está disponible',
  "This content isn't available",
];

let reloadInterval = null;

function startAutoReload() {
  if (reloadInterval) return;
  reloadInterval = setInterval(() => {
    if (!settings.autoReload) return;
    if (!document.body) return;
    const text = document.body.textContent;
    if (ERROR_MESSAGES.some((msg) => text.includes(msg))) {
      window.location.reload();
    }
  }, 1000);
}

function stopAutoReload() {
  if (reloadInterval) {
    clearInterval(reloadInterval);
    reloadInterval = null;
  }
}

// ══════════════════════════════════════════════════════════
//  FEATURE 4 — Abrir pestaña Videos por defecto
// ══════════════════════════════════════════════════════════
function processChannelLink(link, e) {
  if (!settings.openVideosTab) return false;
  const href = link.href;
  if (!href) return false;

  const isChannel =
    href.includes('youtube.com/@') || href.includes('youtube.com/channel/');
  const alreadyVideos = href.includes('/videos');

  if (isChannel && !alreadyVideos) {
    e.preventDefault();
    const cleanUrl = href.split('?')[0].replace(/\/$/, '') + '/videos';
    if (e.button === 1 || e.ctrlKey || e.metaKey) {
      window.open(cleanUrl, '_blank');
    } else {
      window.location.href = cleanUrl;
    }
    return true;
  }
  return false;
}

function attachLinkListeners() {
  document.addEventListener(
    'click',
    (e) => {
      const link = e.target.closest('a');
      if (link) processChannelLink(link, e);
    },
    true
  );

  document.addEventListener(
    'auxclick',
    (e) => {
      if (e.button !== 1) return;
      const link = e.target.closest('a');
      if (link) processChannelLink(link, e);
    },
    true
  );
}

// ══════════════════════════════════════════════════════════
//  OBSERVER CENTRAL
// ══════════════════════════════════════════════════════════
let observer = null;

function runAll() {
  removeShelf();
  hideMixVideos();
}

function restartObserver() {
  if (observer) observer.disconnect();

  runAll();

  if (settings.autoReload) {
    startAutoReload();
  } else {
    stopAutoReload();
  }

  const target = document.querySelector('ytd-app') || document.body;
  observer = new MutationObserver(runAll);
  observer.observe(target, { childList: true, subtree: true });
}

function initFeatures() {
  attachLinkListeners();
  restartObserver();
  if (settings.autoReload) startAutoReload();
}
