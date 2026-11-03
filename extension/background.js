// Где лежит актуальный набор селекторов.
// ЗАМЕНИ YOUR_GITHUB_USER на свой логин после создания репозитория.
const CONFIG_URL = 'https://raw.githubusercontent.com/timokhink/shorts-blocker/main/selectors.json';

const MAX_AGE_MS = 6 * 60 * 60 * 1000;   // проверять не чаще раза в 6 часов
const RETRY_MS = 30 * 60 * 1000;         // после ошибки — повтор через 30 минут

function isValidConfig(cfg) {
  if (!cfg || cfg.schema !== 1 || !Number.isInteger(cfg.revision)) return false;
  const okList = (list) =>
    Array.isArray(list) && list.length <= 300 &&
    list.every((s) => typeof s === 'string' && s.length <= 300 && !/[{}<@;]/.test(s));
  if (!okList(cfg.hide)) return false;
  if (cfg.hideByText && !(okList(cfg.hideByText.selectors) && okList(cfg.hideByText.texts))) return false;
  return true;
}

async function refresh() {
  const { sbConfig, sbFetchedAt = 0 } = await browser.storage.local.get(['sbConfig', 'sbFetchedAt']);
  if (Date.now() - sbFetchedAt < MAX_AGE_MS) return sbConfig || null;

  try {
    const res = await fetch(CONFIG_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const cfg = await res.json();
    if (!isValidConfig(cfg)) throw new Error('invalid config');
    await browser.storage.local.set({ sbConfig: cfg, sbFetchedAt: Date.now() });
    return cfg;
  } catch (e) {
    await browser.storage.local.set({ sbFetchedAt: Date.now() - MAX_AGE_MS + RETRY_MS });
    return sbConfig || null;
  }
}

browser.runtime.onMessage.addListener((msg) => {
  if (msg && msg.type === 'sb:refresh') return refresh();
});
