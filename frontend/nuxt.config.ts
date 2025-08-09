export default defineNuxtConfig({
  // TypeScript設定
  typescript: {
    strict: true
  },

  // 開発サーバー設定
  devServer: {
    port: 3000
  },

  // 環境変数
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'http://localhost:8080',
      wsUrl: process.env.WS_URL || 'http://localhost:8080'
    }
  },

  // CSS
  css: [
    '~/assets/css/main.css'
  ],

  // ビルド設定
  build: {
    transpile: ['sockjs-client', 'webstomp-client']
  },

  // モジュール設定
  modules: [],

  // Vite設定
  vite: {
    optimizeDeps: {
      include: ['sockjs-client', 'webstomp-client']
    },
    ssr: {
      noExternal: ['sockjs-client', 'webstomp-client']
    }
  }
})
