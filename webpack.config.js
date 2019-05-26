const path = require('path');

module.exports = {
	entry: {
		index: './docs/js/index.js',
		analytics: './docs/js/analytics.js'
	},
	output: {
		filename: '[name].min.js',
		path: path.resolve(__dirname, 'docs/js/dist')
	},
	mode: 'production'
};
