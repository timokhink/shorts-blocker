(function () {
  'use strict';

  let config = SB_DEFAULT_CONFIG;
  let textSelectors = [];
  const style = document.createElement('style');

  // ---------- Конфиг ----------
  function isSafeSelector(sel) {
    if (typeof sel !== 'string' || sel.length > 300 || /[{}<@;]/.test(sel)) return false;
    try {
      document.createDocumentFragment().querySelector(sel);
      return true;
    } catch (e) {
      return false;
    }
  }

  function applyConfig(cfg) {
    config = cfg;
    // По правилу на селектор: один битый селектор не ломает остальные
    style.textContent = cfg.hide
      .filter(isSafeSelector)
      .map((s) => s + '{display:none!important}')
      .join('\n');
    if (!style.isConnected) (document.head || document.documentElement).appendChild(style);

    const h = cfg.hideByText;
    textSelectors = h && Array.isArray(h.selectors) ? h.selectors.filter(isSafeSelector) : [];
    hideByText();
  }

  // Удалённый конфиг берём, только если он не старее встроенного
  function usable(cfg) {
    return cfg && cfg.schema === 1 && Array.isArray(cfg.hide) &&
      cfg.revision >= SB_DEFAULT_CONFIG.revision ? cfg : null;
  }

  applyConfig(SB_DEFAULT_CONFIG);

  browser.storage.local.get('sbConfig')
    .then(({ sbConfig }) => { const c = usable(sbConfig); if (c) applyConfig(c); })
    .catch(() => {});

  browser.runtime.sendMessage({ type: 'sb:refresh' })
    .then((cfg) => { const c = usable(cfg); if (c && c.revision !== config.revision) applyConfig(c); })
    .catch(() => {});

  // ---------- Редирект /shorts/ID → /watch?v=ID ----------
  function shortsId(url) {
    const m = String(url).match(/\/shorts\/([\w-]{5,})/);
    return m ? m[1] : null;
  }

  function redirectIfShorts() {
    if (config.redirectShorts === false) return;
    const id = shortsId(location.pathname);
    if (id) location.replace('/watch?v=' + id);
  }

  redirectIfShorts();

  // YouTube — SPA, адрес меняется без перезагрузки
  let lastHref = location.href;
  setInterval(() => {
    if (location.href !== lastHref) {
      lastHref = location.href;
      redirectIfShorts();
    }
  }, 300);
  window.addEventListener('popstate', redirectIfShorts);

  document.addEventListener('click', (e) => {
    if (config.redirectShorts === false) return;
    const a = e.target.closest && e.target.closest('a[href*="/shorts/"]');
    if (!a) return;
    const id = shortsId(a.getAttribute('href'));
    if (!id) return;
    e.preventDefault();
    e.stopPropagation();
    location.href = '/watch?v=' + id;
  }, true);

  // ---------- Скрытие по тексту (вкладка и фильтры Shorts) ----------
  function hideByText() {
    const texts = (config.hideByText && config.hideByText.texts) || [];
    if (!textSelectors.length || !texts.length) return;
    document.querySelectorAll(textSelectors.join(',')).forEach((el) => {
      if (texts.includes(el.textContent.trim())) el.style.setProperty('display', 'none', 'important');
    });
  }

  let scheduled = false;
  new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      hideByText();
    });
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
