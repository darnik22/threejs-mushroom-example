import resolve from '@rollup/plugin-node-resolve'; // locate and bundle dependencies in node_modules (mandatory)

export default {
	input: 'src/main.js',
	output: [
		{
			format: 'es',
			name: 'MYAPP',
			file: 'build/bundle.js'
		}
	],
	plugins: [ resolve() ]
};
