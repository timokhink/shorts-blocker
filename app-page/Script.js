const STRINGS = {
  ru: {
    title: 'Блокировщик Shorts',
    lead: 'Убирает Shorts с YouTube в Safari, чтобы смотреть то, ради чего пришёл.',
    howTitle: 'Как включить',
    step1: 'Открой Настройки → Приложения → Safari → Расширения.',
    step1note: 'На iOS 17 и раньше: Настройки → Safari → Расширения.',
    step2: 'Выбери «Блокировщик Shorts» и включи его.',
    step3: 'В разрешениях для youtube.com выбери «Разрешить».',
    step4: 'Открой youtube.com в Safari — Shorts больше не будет.',
    macUnknown: 'Включи «Блокировщик Shorts» в настройках Safari, в разделе «Расширения».',
    macOn: 'Расширение включено. Управлять им можно в настройках Safari, в разделе «Расширения».',
    macOff: 'Расширение выключено. Включи его в настройках Safari, в разделе «Расширения».',
    macButton: 'Закрыть и открыть настройки Safari…',
    footer: 'Не собирает данные. Работает только на youtube.com. Открытый код.'
  },
  en: {
    title: 'Shorts Blocker',
    lead: 'Removes Shorts from YouTube in Safari, so you watch what you came for.',
    howTitle: 'How to turn it on',
    step1: 'Open Settings → Apps → Safari → Extensions.',
    step1note: 'On iOS 17 and earlier: Settings → Safari → Extensions.',
    step2: 'Choose “Shorts Blocker” and turn it on.',
    step3: 'Under permissions for youtube.com, choose “Allow”.',
    step4: 'Open youtube.com in Safari — Shorts are gone.',
    macUnknown: 'Turn on “Shorts Blocker” in Safari Settings, under Extensions.',
    macOn: 'The extension is on. You can manage it in Safari Settings, under Extensions.',
    macOff: 'The extension is off. Turn it on in Safari Settings, under Extensions.',
    macButton: 'Quit and Open Safari Settings…',
    footer: 'Collects no data. Works only on youtube.com. Open source.'
  }
};

const lang = (navigator.language || 'en').toLowerCase().startsWith('ru') ? 'ru' : 'en';
document.documentElement.lang = lang;
document.querySelectorAll('[data-i18n]').forEach((el) => {
  el.textContent = STRINGS[lang][el.dataset.i18n];
});

// Вызывается из ViewController шаблона Xcode: show('ios') или show('mac', isEnabled, ...)
function show(platform, enabled) {
  document.body.classList.add(`platform-${platform}`);
  document.body.classList.toggle('state-on', enabled === true);
  document.body.classList.toggle('state-off', enabled === false);
}

function openPreferences() {
  webkit.messageHandlers.controller.postMessage('open-preferences');
}

document.querySelector('button.open-preferences').addEventListener('click', openPreferences);
