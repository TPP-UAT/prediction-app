import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.REACT_APP_API_BASE_URL': JSON.stringify(env.REACT_APP_API_BASE_URL)
    },
    plugins: [react()],
    server: {
      proxy: {
        '/predict': {
          target: 'http://localhost:8000/', // FastAPI backend URL
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})