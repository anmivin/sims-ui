import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'sims-ui': `${resolve(__dirname, './lib/main.ts')}`,
    },
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'sims-ui',
      // the proper extensions will be added
      fileName: 'sims-ui',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime'
        },
      },
    },
  },
})
