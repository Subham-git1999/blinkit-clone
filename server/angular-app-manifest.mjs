
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://subham-git1999.github.io/blinkit-clone/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "preload": [
      "chunk-3LMQMHJF.js"
    ],
    "route": "/blinkit-clone"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-M6YAIABY.js"
    ],
    "route": "/blinkit-clone/cart"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-R6O4GWMT.js"
    ],
    "route": "/blinkit-clone/checkout"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-HW4HCSHU.js"
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
    'index.csr.html': {size: 17300, hash: 'b4aadcaa36ad8ddee5ee519853c5b2eb22d36386ecfd9b5239551526198b6ec6', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 15872, hash: 'ebf35dc4f76bb695068f80de0e454d5b842b6d1cf8371897bd9de466bfcd3d92', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'checkout/index.html': {size: 29874, hash: 'ed44880c114f21ebd1f8a7cfb67b3f2439b7ad093b767f938711aef9d3abcf98', text: () => import('./assets-chunks/checkout_index_html.mjs').then(m => m.default)},
    'cart/index.html': {size: 30294, hash: 'bf53fbbf26f9d453ad948aa6562f1e0b58523fd450e9610c55285d630a81e27d', text: () => import('./assets-chunks/cart_index_html.mjs').then(m => m.default)},
    'index.html': {size: 66799, hash: 'c4bd33b0b8aadcaa6f3eaf110597a59386c24581a5ea70fcdb5640dabcf16bd0', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'checkout/success/index.html': {size: 32081, hash: '6bf0eaccb3993682787cadebf8b9222ee6113631c09fa1c49a8a0ee4c902da7c', text: () => import('./assets-chunks/checkout_success_index_html.mjs').then(m => m.default)},
    'styles-TNHU3SOI.css': {size: 15711, hash: 'ZrZ9O35F5Ws', text: () => import('./assets-chunks/styles-TNHU3SOI_css.mjs').then(m => m.default)}
  },
};
