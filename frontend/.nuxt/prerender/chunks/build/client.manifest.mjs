const client_manifest = {
  "_C8h1mmMK.js": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "C8h1mmMK.js",
    "name": "entry",
    "isDynamicEntry": true
  },
  "_DGg9CJZi.js": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "DGg9CJZi.js",
    "name": "vendor"
  },
  "_Tfpyt7Ij.js": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "Tfpyt7Ij.js",
    "name": "webstomp",
    "isDynamicEntry": true
  },
  "_oIc38Ik0.js": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "oIc38Ik0.js",
    "name": "v3",
    "imports": [
      "node_modules/nuxt/dist/app/entry.js",
      "_DGg9CJZi.js"
    ]
  },
  "node_modules/nuxt/dist/app/components/error-404.vue": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "DjqHVLmo.js",
    "name": "error-404",
    "src": "node_modules/nuxt/dist/app/components/error-404.vue",
    "isDynamicEntry": true,
    "imports": [
      "node_modules/nuxt/dist/app/entry.js",
      "_DGg9CJZi.js",
      "_oIc38Ik0.js"
    ],
    "css": [
      "error-404.4oxyXxx0.css"
    ]
  },
  "error-404.4oxyXxx0.css": {
    "file": "error-404.4oxyXxx0.css",
    "resourceType": "style",
    "prefetch": true,
    "preload": true
  },
  "node_modules/nuxt/dist/app/components/error-500.vue": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "B1GyvMQF.js",
    "name": "error-500",
    "src": "node_modules/nuxt/dist/app/components/error-500.vue",
    "isDynamicEntry": true,
    "imports": [
      "node_modules/nuxt/dist/app/entry.js",
      "_oIc38Ik0.js",
      "_DGg9CJZi.js"
    ],
    "css": [
      "error-500.CZqNkBuR.css"
    ]
  },
  "error-500.CZqNkBuR.css": {
    "file": "error-500.CZqNkBuR.css",
    "resourceType": "style",
    "prefetch": true,
    "preload": true
  },
  "node_modules/nuxt/dist/app/entry.js": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "D_d5zky6.js",
    "name": "entry",
    "src": "node_modules/nuxt/dist/app/entry.js",
    "isEntry": true,
    "imports": [
      "_DGg9CJZi.js"
    ],
    "dynamicImports": [
      "node_modules/nuxt/dist/app/components/error-404.vue",
      "node_modules/nuxt/dist/app/components/error-500.vue"
    ],
    "css": [
      "entry.CksZEEgE.css"
    ]
  },
  "entry.CksZEEgE.css": {
    "file": "entry.CksZEEgE.css",
    "resourceType": "style",
    "prefetch": true,
    "preload": true
  },
  "pages/index.vue": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "BIX9uwT4.js",
    "name": "index",
    "src": "pages/index.vue",
    "isDynamicEntry": true,
    "imports": [
      "_DGg9CJZi.js",
      "node_modules/nuxt/dist/app/entry.js"
    ],
    "dynamicImports": [
      "_C8h1mmMK.js",
      "_Tfpyt7Ij.js"
    ]
  }
};

export { client_manifest as default };
