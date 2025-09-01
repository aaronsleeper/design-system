import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import scss from 'rollup-plugin-scss';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
	input: 'src/index.ts',
	output: [
		{
			file: 'dist/design-system.esm.js',
			format: 'esm',
			sourcemap: true,
		},
		{
			file: 'dist/design-system.umd.js',
			format: 'umd',
			name: 'DesignSystem',
			sourcemap: true,
		},
	],
	external: ['lit'],
	plugins: [
		nodeResolve(),
		commonjs(),
		typescript({
			tsconfig: './tsconfig.json',
			declaration: true,
			declarationDir: './dist/types',
		}),
		scss({
			output: 'dist/design-system.css',
			outputStyle: 'compressed',
			sourceMap: true,
			includePaths: ['src/tokens', 'src/themes'],
		}),
		terser(),
	],
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
		},
	},
});
