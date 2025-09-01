import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import "src/tokens/index.scss";`,
				sourceMap: true,
			},
		},
	},
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'DesignSystem',
			fileName: (format) => `design-system.${format}.js`,
		},
		rollupOptions: {
			external: ['lit'],
			output: {
				globals: {
					lit: 'Lit',
				},
				sourcemap: true,
			},
		},
		sourcemap: true,
		minify: 'terser',
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
		},
	},
	server: {
		port: 3000,
		open: true,
	},
	preview: {
		port: 4173,
		open: true,
	},
});
