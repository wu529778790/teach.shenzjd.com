import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import postcssConfig from './postcss.config';
import { visualizer } from 'rollup-plugin-visualizer' // 打包体积分析插件
import viteImagemin from 'vite-plugin-imagemin'; // 图片压缩插件
import { createHtmlPlugin } from 'vite-plugin-html' // 生成 html 插件
import externalGlobals from "rollup-plugin-external-globals"; // 导出全局变量

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    visualizer({ open: false }),
    createHtmlPlugin({
      inject: {
        data: {
          script: `
            <script src="https://unpkg.com/vue@3.4.23/dist/vue.global.prod.js"></script>
            <script src="https://unpkg.com/vue-router@4.3.2/dist/vue-router.global.js"></script>
            <script src="https://unpkg.com/axios@1.6.8/dist/axios.min.js"></script>
            <script src="https://unpkg.com/tinymce@7.0.1/tinymce.min.js"></script>
            <link rel="stylesheet" href="https://unpkg.com/tinymce@7.0.1/skins/ui/oxide/content.min.css">
            <script src="https://unpkg.com/@tinymce/tinymce-vue@5.1.1/lib/browser/tinymce-vue.min.js"></script>
            <script src="https://unpkg.com/dayjs/dayjs.min.js"></script>
            <script src="https://unpkg.com/dayjs/plugin/customParseFormat.js"></script>
            <script src="https://unpkg.com/dayjs/plugin/weekday.js"></script>
            <script src="https://unpkg.com/dayjs/plugin/localeData.js"></script>
            <script src="https://unpkg.com/dayjs/plugin/weekOfYear.js"></script>
            <script src="https://unpkg.com/dayjs/plugin/weekYear.js"></script>
            <script src="https://unpkg.com/dayjs/plugin/advancedFormat.js"></script>
            <script src="https://unpkg.com/dayjs/plugin/quarterOfYear.js"></script>
            <script src="https://unpkg.com/ant-design-vue@4.1.2/dist/antd.min.js"></script>
          `,
        }
      }
    }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false
      },
      // 无损压缩配置，无损压缩下图片质量不会变差
      optipng: {
        optimizationLevel: 7
      },
      mozjpeg: {
        quality: 20
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
  ],
  resolve: {
    alias: {
      "@": "/src/client",
    },
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
  build: {
    target: 'modules', // 默认值是一个 Vite 特有的值：'modules' https://cn.vitejs.dev/config/build-options.html#build-target
    minify: 'esbuild', // 默认为'esbuild'，boolean | 'terser' | 'esbuild' | 'gzip' | 'both'
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
        entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
        assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
        manualChunks: {
          antd: ['@ant-design/icons-vue'],
        }
      },
      //  告诉打包工具 在external配置的 都是外部依赖项  不需要打包
      plugins: [
        externalGlobals({
          'vue': 'Vue',
          'vue-router': 'VueRouter',
          'axios': 'axios',
          'tinymce': 'tinymce',
          'tinymce-vue': 'tinymceVue',
          'ant-design-vue': 'antd',
        })
      ],
    }
  },
  css: {
    postcss: postcssConfig
  }
});
