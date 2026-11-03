// Встроенный набор селекторов: работает сразу и без сети.
// Держи в синхроне с selectors.json в корне репозитория (revision тоже).
var SB_DEFAULT_CONFIG = {
  "schema": 1,
  "revision": 1,
  "redirectShorts": true,
  "hide": [
    "ytm-reel-shelf-renderer",
    "ytm-shorts-lockup-view-model",
    "ytm-shorts-lockup-view-model-v2",
    "ytm-rich-section-renderer:has(ytm-reel-shelf-renderer, ytm-shorts-lockup-view-model, ytm-shorts-lockup-view-model-v2)",
    "ytm-item-section-renderer:has(ytm-reel-shelf-renderer)",
    "grid-shelf-view-model:has(ytm-shorts-lockup-view-model, ytm-shorts-lockup-view-model-v2)",
    "ytm-video-with-context-renderer:has(a[href*=\"/shorts/\"])",
    "ytm-compact-video-renderer:has(a[href*=\"/shorts/\"])",
    "ytm-rich-item-renderer:has(a[href*=\"/shorts/\"])",
    "ytd-reel-shelf-renderer",
    "ytd-rich-shelf-renderer[is-shorts]",
    "ytd-rich-section-renderer:has(ytd-rich-shelf-renderer[is-shorts])",
    "ytd-video-renderer:has(a[href*=\"/shorts/\"])",
    "ytd-grid-video-renderer:has(a[href*=\"/shorts/\"])",
    "ytd-rich-item-renderer:has(a[href*=\"/shorts/\"])",
    "ytd-guide-entry-renderer:has(a[title=\"Shorts\"])",
    "ytd-mini-guide-entry-renderer[aria-label=\"Shorts\"]",
    "yt-tab-shape[tab-title=\"Shorts\"]"
  ],
  "hideByText": {
    "selectors": [
      "ytm-pivot-bar-item-renderer",
      "ytm-chip-cloud-chip-renderer",
      "yt-chip-cloud-chip-renderer"
    ],
    "texts": [
      "Shorts"
    ]
  }
};
