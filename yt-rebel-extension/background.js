// background.js — YT Rebel
// Service worker mínimo. Aquí puedes agregar lógica de fondo en el futuro.

chrome.runtime.onInstalled.addListener(() => {
  // Establecer defaults al instalar por primera vez
  chrome.storage.sync.get(null, (existing) => {
    const defaults = {
      hideRecientes: true,
      hideMixes: true,
      autoReload: true,
      openVideosTab: true,
    };
    const toSet = {};
    for (const [key, val] of Object.entries(defaults)) {
      if (!(key in existing)) toSet[key] = val;
    }
    if (Object.keys(toSet).length > 0) {
      chrome.storage.sync.set(toSet);
    }
  });
});
