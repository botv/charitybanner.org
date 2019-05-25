const path = require('path');

module.exports = {
	entry: './docs/js/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'docs/js/dist')
	},
	mode: 'production'
};
