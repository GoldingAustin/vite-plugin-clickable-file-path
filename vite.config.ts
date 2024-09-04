import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
	plugins: [dts()],
	build: {
		sourcemap: true,
		lib: {
			formats: ['es', 'cjs'],
			entry: './src/index.ts',
			name: 'ViteClickableFilePathPlugin',
			fileName: 'index',
		},
		rollupOptions: {
			external: ['vite'],
			output: {},
		},
	},
});
