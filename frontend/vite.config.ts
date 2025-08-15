import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  
  // CSS設定
  css: {
    postcss: './postcss.config.js',
    // 警告を完全に抑制
    devSourcemap: false
  },
  
  // ビルド設定
  build: {
    // 警告を抑制
    rollupOptions: {
      onwarn(warning, warn) {
        // -ms-high-contrast 関連の警告を完全に抑制
        if (warning.code === 'CSS_UNKNOWN_PROPERTY' && 
            (warning.message.includes('-ms-high-contrast') || 
             warning.message.includes('ms-high-contrast'))) {
          return;
        }
        
        // CSS関連の警告を抑制
        if (warning.code === 'CSS_UNKNOWN_PROPERTY' && 
            warning.message.includes('ms-')) {
          return;
        }
        
        // その他の警告は通常通り表示
        warn(warning);
      }
    },
    // ソースマップを無効化（本番環境用）
    sourcemap: false,
    // 警告を抑制
    reportCompressedSize: false,
    // 非推奨プロパティの警告を抑制
    target: 'es2015'
  },
  
  // サーバー設定
  server: {
    host: '0.0.0.0',
    port: 3000,
    // 警告を抑制
    hmr: {
      overlay: false
    }
  },
  
  // 最適化設定
  optimizeDeps: {
    include: ['vue', 'vue-router']
  },
  
  // 環境変数
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    // 非推奨プロパティの警告を抑制
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false
  },
  
  // 警告抑制の強化
  logLevel: 'error',
  
  // 非推奨プロパティの警告を抑制
  esbuild: {
    target: 'es2015',
    legalComments: 'none'
  }
})
