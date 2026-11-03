# Shorts Blocker

Free, open-source Safari extension for iPhone, iPad and Mac that hides YouTube Shorts on youtube.com and opens `/shorts/` links as regular videos. Collects no data.

Бесплатное расширение Safari с открытым кодом для iPhone, iPad и Mac: скрывает Shorts на youtube.com и открывает ссылки `/shorts/` как обычные видео. Не собирает данные.

## How it works

- `extension/` — the Safari web extension (Manifest V3).
- `selectors.json` — the list of CSS selectors to hide. The extension fetches it from this repository every few hours, so a YouTube layout change can be fixed here without an App Store update. It is data only: selectors, no code.
- `extension/defaults.js` — the same list bundled into the extension, used offline and on first launch.
- `app-page/` — the onboarding screen of the container app.

## Shorts are showing up again?

1. Open an issue with a screenshot and the page URL, or
2. Fix `selectors.json`, **increase `revision` by 1**, and open a pull request.

Users get the fix within ~6 hours. When releasing a new app version, copy the current `selectors.json` into `extension/defaults.js`.

## Build

```
xcrun safari-web-extension-converter ./extension --app-name "Shorts Blocker" --bundle-identifier com.example.shortsblocker
```

Then replace `Shared (App)/Resources` files with the ones from `app-page/`.

## Privacy

See [PRIVACY.md](PRIVACY.md).

## License

MIT
