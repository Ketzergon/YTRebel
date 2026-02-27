# YT Rebel 🔴

> Toma el control de YouTube. / Take control of YouTube.

Extensión de Chromium que se rebela contra algunas decisiones molestas de YouTube/Rebel against YouTube.

## Features

| Feature | ES | EN |
|---|---|---|
| Quitar Recientes | Elimina el shelf "Más recientes / Más relevantes" | Removes the "Latest / Most relevant" shelf |
| Ocultar Mixes | Esconde playlists y videos tipo Mix | Hides all Mix playlists and videos |
| Auto-Reload | Auto recarga la página si aparece el mensaje de "Error de contenido" | Reloads on "Content unavailable" error |
| Tab Videos | Canales abren directo en pestaña "Videos" | Channels open directly on "Videos" tab |

La interfaz se adapta automáticamente al idioma del navegador/The UI automatically adapts to your browser's language.

## Instalación

1. Descarga y descomprime el ZIP o clona el repo: `git clone https://github.com/Ketzergon/yt-rebel.git`
2. Ve a `chrome://extensions`
3. Activa **Modo desarrollador**
4. Clic en **"Cargar extensión sin empaquetar"** → selecciona la carpeta
5. ¡Listo!

## Installation

1. Download and unzip the ZIP or clone the repo: `git clone https://github.com/Ketzergon/yt-rebel.git`
2. Go to `chrome://extensions`
3. Enable **Developer mode**
4. Click **"Load unpacked" → select the folder**
5. Done!

## Agregar un nuevo feature

1. `content.js` → agrega clave en `DEFAULT_SETTINGS` y escribe tu función
2. `popup.html` → copia un bloque `<label class="feature-row">` con nuevos `data-i18n`
3. `background.js` → agrega la clave en `defaults`
4. `_locales/es/messages.json` y `_locales/en/messages.json` → agrega los textos
5. Recarga en `chrome://extensions`

## Adding a new feature

1. `content.js` → add key in `DEFAULT_SETTINGS` and write your function
2. `popup.html` → copy a `<label class="feature-row">` block with new `data-i18n` attributes
3. `background.js` → add the key in `defaults`
4. `_locales/es/messages.json` and `_locales/en/messages.json` → add the texts
5. Reload at `chrome://extensions`

## Estructura
```
yt-rebel-extension/
├── manifest.json
├── content.js
├── popup.html
├── popup.js
├── background.js
├── _locales/
│   ├── es/messages.json
│   └── en/messages.json
└── icons/
    ├── icon16.png
    ├── icon32.png
    ├── icon48.png
    └── icon128.png
```

## Licencia
MIT — úsalo, modifícalo, compártelo.
