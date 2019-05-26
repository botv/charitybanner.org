const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.banner = functions.https.onRequest((req, res) => {
	const {projectId, style, bannerId} = req.query;
	let db = admin.firestore();

	db.collection('tags').doc(bannerId).update({
		impressions: admin.firestore.FieldValue.increment(1)
	});

	const script = `function banner(s,e,t){let i;switch(s){case"fixed":i=$('<a id="banner"></a>').css("color","white").css("padding","10px").css("position","fixed").css("top","0").css("right","0").css("left","0").css("height","50px").css("z-index","2147483647").css("background-size","cover").css("background-position","center").css("background-repeat","no-repeat").css("text-align","center").css("font-size","20px").css("font-family",'"Righteous", cursive').css("background-image",\`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("\${e.image.imagelink.pop().url}")\`).css("box-sizing","border-box").attr("href",e.projectLink).attr("target","_blank").text(e.title),$("body").css("padding-top","50px");break;case"scroll":i=$('<a id="banner"></a>').css("color","white").css("padding","10px").css("position","absolute").css("top","0").css("box-sizing","border-box").css("right","0").css("left","0").css("height","50px").css("z-index","2147483647").css("background-size","cover").css("background-position","center").css("background-repeat","no-repeat").css("text-align","center").css("font-size","20px").css("font-family",'"Righteous", cursive').css("background-image",\`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("\${e.image.imagelink.pop().url}")\`).attr("href",e.projectLink).attr("target","_blank").text(e.title),$("body").css("padding-top","50px");break;case"vanish":i=$('<a id="banner"></a>').css("color","white").css("padding","10px").css("position","fixed").css("top","20px").css("right","0").css("left","0").css("margin-left","20px").css("margin-right","20px").css("height","50px").css("box-sizing","border-box").css("z-index","2147483647").css("background-size","cover").css("background-position","center").css("background-repeat","no-repeat").css("text-align","center").css("font-size","20px").css("border-radius","5px").css("font-family",'"Righteous", cursive').css("background-image",\`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("\${e.image.imagelink.pop().url}")\`).attr("href",e.projectLink).attr("target","_blank").text(e.title),setTimeout(()=>{$("body")[0].onmousewheel=(()=>{i.fadeOut(500,()=>{i.remove()})})},3e3)}return i.click(()=>{$.get("https://us-central1-charity-banner.cloudfunctions.net/tagWasClicked",{tagId:t})}),i}$.get("https://api.globalgiving.org/api/public/projectservice/projects/${projectId}",{api_key:"75b3e155-2250-45c1-8833-19a3e9678fd6"},s=>{const e=banner("${style}",s.project,"${tagId}");$("head").append('<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Righteous&display=swap">'),$("body").prepend(e)},"json");`;
	res.send(script);
});

exports.getAllTagIds = functions.https.onRequest((req, res) => {
	res.set('Access-Control-Allow-Origin', '*');
	let db = admin.firestore();

	db.collection('config').doc('tagIds').get().then(function (doc) {
		if (doc.exists) {
			let tagIds = doc.data().tagIds;
			res.send(tagIds);
		} else {
			console.log('No such document!');
		}

	});
});

exports.initAnalytics = functions.https.onRequest((req, res) => {
	const {bannerId} = req.query;
	let db = admin.firestore();

	db.collection('config').doc('tagIds').update({
		tagIds: admin.firestore.FieldValue.arrayUnion(bannerId)
	});

	db.collection('tags').doc(bannerId).set({
		impressions: 0,
		clicks: 0
	});
});

exports.analytics = functions.https.onRequest((req, res) => {
	res.set('Access-Control-Allow-Origin', '*');

	const {bannerId} = req.query;
	let db = admin.firestore();

	db.collection('tags').doc(bannerId).get().then(function (doc) {
		if (doc.exists) {
			console.log(doc.data());
			res.send(doc.data());
		} else {
			console.log('No such document!');
			res.send({
				impressions: 'Not found',
				clicks: 'Not found'
			});
		}
	}).catch(function (error) {
		console.log('Error getting document:', error);
	});
});

exports.tagWasClicked = functions.https.onRequest((req, res) => {
	const {tagId} = req.query;
	let db = admin.firestore();

	db.collection('tags').doc(tagId).update({
		clicks: admin.firestore.FieldValue.increment(1)
	});
});