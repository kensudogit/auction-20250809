// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
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
    '~/assets/css/global.css',
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
        external: ['@nuxt/kit', 'nitropack', 'h3', 'unjs'],
        output: {
          manualChunks: {
            vendor: ['vue']
          }
        },
        onwarn(warning: any, warn: any) {
          // -ms-high-contrast関連の警告を抑制
          if (warning.code === 'CSS_UNKNOWN_PROPERTY' && 
              warning.message.includes('-ms-')) {
            return;
          }
          // CSS関連の警告を抑制
          if (warning.code === 'CSS_UNKNOWN_PROPERTY') {
            return;
          }
          // 非推奨プロパティの警告を抑制
          if (warning.message && warning.message.includes('-ms-high-contrast')) {
            return;
          }
          // より広範囲の警告抑制
          if (warning.message && (
            warning.message.includes('-ms-') ||
            warning.message.includes('ms-high-contrast') ||
            warning.message.includes('high-contrast')
          )) {
            return;
          }
          warn(warning);
        }
      }
    },
    ssr: {
      noExternal: ['nuxt']
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    },
    css: {
      postcss: {
        plugins: [
          // 非推奨プロパティの警告を抑制
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule: any) => {
                if (atRule.name === 'charset') {
                  atRule.remove();
                }
              }
            }
          }
        ]
      }
    }
  },

  // Vercel設定
  nitro: {
    preset: 'vercel',
    static: {
      serveFiles: true
    },
    experimental: {
      wasm: false
    },
    // 非推奨プロパティの警告を抑制
    rollupConfig: {
      onwarn(warning: any, warn: any) {
        // -ms-high-contrast関連の警告を抑制
        if (warning.code === 'CSS_UNKNOWN_PROPERTY' && 
            warning.message.includes('-ms-')) {
          return;
        }
        // CSS関連の警告を抑制
        if (warning.code === 'CSS_UNKNOWN_PROPERTY') {
          return;
        }
        // 非推奨プロパティの警告を抑制
        if (warning.message && warning.message.includes('-ms-high-contrast')) {
          return;
        }
        // より広範囲の警告抑制
        if (warning.message && (
          warning.message.includes('-ms-') ||
          warning.message.includes('ms-high-contrast') ||
          warning.message.includes('high-contrast')
        )) {
          return;
        }
        warn(warning);
      }
    }
  },

  // アプリ設定
  app: {
    baseURL: '/',
    buildAssetsDir: '/_nuxt/',
    cdnURL: ''
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
    '/': { prerender: true }
  },

  // ソースマップ設定
  sourcemap: false,

  // 分析設定
  analyze: false,

  // アクセシビリティ設定
  appConfig: {
    // アクセシビリティの最適化
    accessibility: {
      // ハイコントラストモードのサポート
      highContrast: true,
      // フォーカス管理
      focusManagement: true,
      // キーボードナビゲーション
      keyboardNavigation: true
    }
  },

  // 警告抑制の強化
  hooks: {
    'build:done': () => {
      console.log('Build completed with enhanced warning suppression');
    }
  }
})
