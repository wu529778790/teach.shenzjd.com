import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { visualizer } from 'rollup-plugin-visualizer' // 打包体积分析插件
import postcssConfig from './postcss.config';
import viteImagemin from 'vite-plugin-imagemin'; // 图片压缩插件
import { createHtmlPlugin } from 'vite-plugin-html' // 生成 html 插件
import externalGlobals from "rollup-plugin-external-globals"; // 导出全局变量

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    visualizer({ open: false }),
    viteImagemin({
      // 无损压缩配置，无损压缩下图片质量不会变差
      optipng: {
        optimizationLevel: 7
      },
      // 有损压缩配置，有损压缩下图片质量可能会变差
      pngquant: {
        quality: [0.8, 0.9]
      },
      // svg 优化
      svgo: {
        plugins: [
          {
            name: 'removeViewBox'
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      }
    }),
    createHtmlPlugin({
      inject: {
        data: {
          script: `
            <script src="https://cdn.jsdelivr.net/npm/vue@3.4.23/dist/vue.global.min.js"></script>
          `,
        }
      }
    })
  ],
  resolve: {
    alias: {
      "@": "/src/client",
    },
  },
  build: {
    rollupOptions: {
      external: ['vue'],
      plugins: [
        externalGlobals({ vue: 'Vue' })
      ],
      output: {
        manualChunks: {
          vue: ['vue-router'],
          antd: ['@ant-design/icons-vue'],
          tinymce: ['tinymce', '@tinymce/tinymce-vue'],
          axios: ['axios'],
        }
      }
    }
  },
  css: {
    postcss: postcssConfig
  }
});
