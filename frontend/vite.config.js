import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/kinetictech/',
  plugins: [
    react(),
    {
      name: 'redirect-base',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/kinetictech') {
            res.statusCode = 302;
            res.setHeader('Location', '/kinetictech/');
            res.end();
          } else {
            next();
          }
        });
      }
    }
  ],
  server: {
    port: 3000,
    open: true
  }
})
