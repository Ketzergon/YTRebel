# YT Rebel 🔴

> Toma el control de YouTube. / Take control of YouTube.

Extensión de Chromium que elimina las partes molestas de YouTube.

## Features

| Feature | ES | EN |
|---|---|---|
| Quitar Recientes | Elimina el shelf "Más recientes / Más relevantes" | Removes the "Latest / Most relevant" shelf |
| Ocultar Mixes | Esconde playlists y videos tipo Mix | Hides all Mix playlists and videos |
| Auto-Reload | Recarga si aparece error de contenido | Reloads on content unavailable error |
| Tab Videos | Canales abren directo en pestaña Videos | Channels open directly on Videos tab |

La interfaz se adapta automáticamente al idioma del navegador (español / inglés).

## Instalación

1. Descarga el ZIP o clona el repo: `git clone https://github.com/TU_USUARIO/yt-rebel.git`
2. Ve a `chrome://extensions`
3. Activa **Modo desarrollador**
4. Clic en **"Cargar extensión sin empaquetar"** → selecciona la carpeta
5. ¡Listo!

## Agregar un nuevo feature

1. `content.js` → agrega clave en `DEFAULT_SETTINGS` y escribe tu función
2. `popup.html` → copia un bloque `<label class="feature-row">` con nuevos `data-i18n`
3. `background.js` → agrega la clave en `defaults`
4. `_locales/es/messages.json` y `_locales/en/messages.json` → agrega los textos
5. Recarga en `chrome://extensions`

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
