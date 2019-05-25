const functions = require('firebase-functions');

exports.banner = functions.https.onRequest((req, res) => {
	const {message} = req.query;
	res.send(`console.log('${message}')`);
});
