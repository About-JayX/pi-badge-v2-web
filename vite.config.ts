import react from '@vitejs/plugin-react-swc'
import autoprefixer from 'autoprefixer'
import path from 'path'
import postcssPxtoRem from 'postcss-pxtorem'
import tailwindcss from 'tailwindcss'
import { defineConfig } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), './src/assets/icon')],
      symbolId: 'icon-[name]',
    }),
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
        postcssPxtoRem({ rootValue: 16, propList: ['*'] }),
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
  },
})
