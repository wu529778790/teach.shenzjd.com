import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), visualizer({ open: false })],
  resolve: {
    alias: {
      "@": "/src/client",
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router'],
          antd: ['ant-design-vue', '@ant-design/icons-vue'],
          tinymce: ['tinymce', '@tinymce/tinymce-vue'],
          axios: ['axios'],
        }
      }
    }
  }
});
