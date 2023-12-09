import { defineConfig, loadEnv, } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteRestart from 'vite-plugin-restart'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, }) => {
    // Load env file based on `mode` in the current working directory.
    // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
    const env = loadEnv(mode, process.cwd(), '')
    return {
        define: {
            VITE_API_URL: JSON.stringify(env.API_URL),
        },
        plugins: [
            vue(),
            ViteRestart({
                restart: [
                    'my.config.[jt]s',
                    '.env'
                ]
            })
        ]
    }
})