// 静的サイト生成用のNuxt設定
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // TypeScript設定
  typescript: {
    strict: true
  },

  // 開発サーバー設定
  devServer: {
    port: 3000,
    host: '0.0.0.0'
  },

  // CSS
  css: [
    '~/assets/css/main.css',
    '~/assets/css/accessibility.css'
  ],

  // ビルド設定
  build: {
    transpile: ['sockjs-client', 'webstomp-client']
  },

  // モジュール設定
  modules: [],

  // Vite設定
  vite: {
    server: {
      host: '0.0.0.0',
      port: 3000
    },
    optimizeDeps: {
      include: ['sockjs-client', 'webstomp-client']
    },
    build: {
      rollupOptions: {
        external: ['@nuxt/kit', 'nitropack', 'h3', 'unjs', 'node:fs', 'node:path'],
        output: {
          manualChunks: {
            vendor: ['vue']
          }
        }
      }
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }
  },

  // 静的サイト生成設定
  nitro: {
    preset: 'vercel-static',
    prerender: {
      routes: ['/'],
      crawlLinks: true
    },
    static: {
      serveFiles: true
    }
  },

  // アプリ設定
  app: {
    baseURL: '/',
    buildAssetsDir: '/_nuxt/',
    cdnURL: '',
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  // 実験的機能
  experimental: {
    payloadExtraction: false,
    inlineSSRStyles: false,
    renderJsonPayloads: false
  },

  // ビルド設定の最適化
  builder: 'vite',
  
  // クライアントサイドのビルド最適化
  client: {
    // クライアントサイドでの不要なインポートを防ぐ
    transpile: ['sockjs-client', 'webstomp-client']
  },

  // ルート設定
  routeRules: {
    '/': { prerender: true },
    '/_nuxt/**': { prerender: false }
  },

  // ソースマップ設定
  sourcemap: false,

  // 分析設定
  analyze: false,

  // 静的サイト生成設定
  ssr: false,
  
  // ターゲット設定
  target: 'static'
})
