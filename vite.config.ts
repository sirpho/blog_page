import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import babel from "vite-plugin-babel"
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createStyleImportPlugin } from 'vite-plugin-style-import'

import { existsSync } from "node:fs";
import { join } from "node:path";

// 获取arco样式路径
// @ts-ignore
function getArcoStylePath(name: string) {
  let path = `@arco-design/web-vue/es/${name}/style/index.js`;
  if(name === 'icon') {
    path = `@arco-design/web-vue/es/style/icon.less`
    return path
  }
  const names = name.split("-");

  if (existsSync(join(__dirname, "./node_modules/" + path))) {
    return path;
  } else {
    names.pop()
    return getArcoStylePath(names.join("-")) || ""
  }
}
export default defineConfig({
  plugins: [
    babel(),
    vue(),
    vueJsx(),
    createStyleImportPlugin({
      libs: [
        {
          libraryName: '@arco-design/web-vue',
          esModule: true,
          resolveStyle: (name) => {
            // less
            return getArcoStylePath(name);
          },
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    open: true,
    host: true,
  },
  css: {
    modules: {
      generateScopedName: 'sirpho-[local]-[hash:base64:5]'
    },
    preprocessorOptions: {
      less: {
        modifyVars:{
          'arcoblue-6': '#7aa9f7'
          // 'arcoblue-6': '#ee9fb3'
        },
        javascriptEnabled: true
      }
    }
  },

  build: {
    target: 'es2015'
  }
})
