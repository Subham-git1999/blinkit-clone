
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://subham-git1999.github.io/blinkit-clone/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "preload": [
      "chunk-FSHGZMEB.js"
    ],
    "route": "/blinkit-clone"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-CRKF23EW.js"
    ],
    "route": "/blinkit-clone/cart"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-SOMHWP75.js"
    ],
    "route": "/blinkit-clone/checkout"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-FP7WQ3GV.js"
    ],
    "route": "/blinkit-clone/checkout/success"
  },
  {
    "renderMode": 2,
    "redirectTo": "/blinkit-clone",
    "route": "/blinkit-clone/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 17300, hash: 'fa1e94fda068797116c9515ff3d7522c7151a42c858e55e22d88802fa8afdf24', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 15872, hash: 'ce41124d216c58b552c524083d179be3ecfd7862ab1d17f66cc5794043be3e36', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 67680, hash: '0defd6b56bff97bed795cbb7be2e3328b90535d131dc59fda22749551b168452', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'checkout/success/index.html': {size: 32637, hash: '6f4d6e186c7aee43fa92bc24dacc2f101cce48b0007591f011cdf5fe1f12b3b6', text: () => import('./assets-chunks/checkout_success_index_html.mjs').then(m => m.default)},
    'cart/index.html': {size: 30730, hash: '01de2c81a807af284cc43acf1dd880f1cfb321174f7d6a86c7586eb918e01f0d', text: () => import('./assets-chunks/cart_index_html.mjs').then(m => m.default)},
    'checkout/index.html': {size: 30309, hash: '756de729becc5dab1fdf6bd2e3d450d90525b537bd9a5b55d03e74bca049752c', text: () => import('./assets-chunks/checkout_index_html.mjs').then(m => m.default)},
    'styles-G42GBW6M.css': {size: 16751, hash: '7p5fMUnO+tE', text: () => import('./assets-chunks/styles-G42GBW6M_css.mjs').then(m => m.default)}
  },
};
