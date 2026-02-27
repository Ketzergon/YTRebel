// popup.js — YT Rebel

// ── Aplicar traducciones al DOM ────────────────────────────
document.querySelectorAll('[data-i18n]').forEach((el) => {
  const msg = chrome.i18n.getMessage(el.dataset.i18n);
  if (msg) el.textContent = msg;
});

const DEFAULT_SETTINGS = {
  hideRecientes: true,
  hideMixes: true,
  autoReload: true,
  openVideosTab: true,
};

const toggles = document.querySelectorAll('input[data-key]');
const allToggleBtn = document.getElementById('all-toggle');

// Cargar estado guardado
chrome.storage.sync.get(DEFAULT_SETTINGS, (settings) => {
  toggles.forEach((input) => {
    const key = input.dataset.key;
    input.checked = settings[key] ?? DEFAULT_SETTINGS[key];
  });
  updateAllToggleLabel(settings);
});

// Guardar cambio individual
toggles.forEach((input) => {
  input.addEventListener('change', () => {
    const key = input.dataset.key;
    chrome.storage.sync.set({ [key]: input.checked }, () => {
      chrome.storage.sync.get(DEFAULT_SETTINGS, updateAllToggleLabel);
    });
  });
});

// Botón "desactivar todo / activar todo"
allToggleBtn.addEventListener('click', () => {
  chrome.storage.sync.get(DEFAULT_SETTINGS, (settings) => {
    const anyOn = Object.values(settings).some(Boolean);
    const newVal = !anyOn;
    const update = {};
    for (const key of Object.keys(DEFAULT_SETTINGS)) update[key] = newVal;

    chrome.storage.sync.set(update, () => {
      toggles.forEach((input) => (input.checked = newVal));
      updateAllToggleLabel(update);
    });
  });
});

function updateAllToggleLabel(settings) {
  const anyOn = Object.values(settings).some(Boolean);
  const key = anyOn ? 'disableAll' : 'enableAll';
  allToggleBtn.textContent = chrome.i18n.getMessage(key);
}
