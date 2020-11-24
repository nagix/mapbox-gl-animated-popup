import fs from 'fs';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import {terser} from 'rollup-plugin-terser';
import strip from '@rollup/plugin-strip';

const pkg = JSON.parse(fs.readFileSync('package.json'));
const banner = `/*!
 * Mapbox GL JS Animated Popup v${pkg.version}
 * ${pkg.homepage}
 * (c) ${new Date().getFullYear()} ${pkg.author}
 * Released under the ${pkg.license} license
 */`;

export default [{
	input: 'src/index.js',
	output: {
		name: 'AnimatedPopup',
		file: 'dist/mapbox-gl-animated-popup.js',
		format: 'umd',
		indent: false,
		sourcemap: true,
		banner,
		globals: {
			'mapbox-gl': 'mapboxgl'
		}
	},
	plugins: [
		resolve(),
		commonjs()
	],
	external: ['mapbox-gl']
}, {
	input: 'src/index.js',
	output: {
		name: 'AnimatedPopup',
		file: 'dist/mapbox-gl-animated-popup.min.js',
		format: 'umd',
		indent: false,
		sourcemap: true,
		banner,
		globals: {
			'mapbox-gl': 'mapboxgl'
		}
	},
	plugins: [
		resolve(),
		commonjs(),
		terser({
			compress: {
				pure_getters: true,
				passes: 3
			}
		}),
		strip({
			sourceMap: true
		})
	],
	external: ['mapbox-gl']
}];
