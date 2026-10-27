# Copy Tab Links

A tiny Chrome extension that copies the links of all your selected tabs at once, one per line, like Arc's "copy links" feature.

Private by design: it runs entirely on your machine, makes no network requests, and collects nothing.

## Install

1. Download or clone this repo.
2. Open `chrome://extensions` and turn on **Developer mode** (top right).
3. Click **Load unpacked** and select this folder.
4. Open `chrome://extensions/shortcuts` and set a shortcut for **Copy links of selected tabs** (for example `Option+Shift+C`; Chrome reserves `Cmd+Shift+C` for DevTools).

## Use

1. Select tabs: Cmd-click (Ctrl-click on Windows) individual tabs, or Shift-click a range.
2. Press your shortcut, or click the extension's toolbar icon.
3. Paste. A green badge on the icon briefly shows how many links were copied.

## How it works

- `background.js` reads the highlighted tabs in the current window, in tab order.
- Service workers can't touch the clipboard, so the text is handed to a hidden offscreen page (`offscreen.html`) that does the copy.

Permissions: `tabs` (to read tab URLs), `offscreen` and `clipboardWrite` (to copy).

## License

MIT
