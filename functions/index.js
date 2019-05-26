const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.banner = functions.https.onRequest((req, res) => {
	res.set('Access-Control-Allow-Origin', '*');
	const {projectId, style, bannerId} = req.query;
	let db = admin.firestore();

	db.collection('analytics').doc(bannerId).update({
		impressions: admin.firestore.FieldValue.increment(1)
	});

	const script = `function createBanner(s,e,t){const c=$("body");let r;switch(s){case"fixed":r=$('<a id="createBanner"></a>').css("color","white").css("padding","10px").css("position","fixed").css("top","0").css("right","0").css("left","0").css("height","50px").css("z-index","2147483647").css("background-size","cover").css("background-position","center").css("background-repeat","no-repeat").css("text-align","center").css("font-size","20px").css("font-family",'"Righteous", cursive').css("background-image",'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("\${project.image.imagelink.pop().url}")').css("box-sizing","border-box").attr("href",e.projectLink).attr("target","_blank").text(e.title),c.css("padding-top","50px");break;case"scroll":r=$('<a id="createBanner"></a>').css("color","white").css("padding","10px").css("position","absolute").css("top","0").css("box-sizing","border-box").css("right","0").css("left","0").css("height","50px").css("z-index","2147483647").css("background-size","cover").css("background-position","center").css("background-repeat","no-repeat").css("text-align","center").css("font-size","20px").css("font-family",'"Righteous", cursive').css("background-image",'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("\${project.image.imagelink.pop().url}")').attr("href",e.projectLink).attr("target","_blank").text(e.title),c.css("padding-top","50px");break;case"vanish":r=$('<a id="createBanner"></a>').css("color","white").css("padding","10px").css("position","fixed").css("top","20px").css("right","0").css("left","0").css("margin-left","20px").css("margin-right","20px").css("height","50px").css("box-sizing","border-box").css("z-index","2147483647").css("background-size","cover").css("background-position","center").css("background-repeat","no-repeat").css("text-align","center").css("font-size","20px").css("border-radius","5px").css("font-family",'"Righteous", cursive').css("background-image",'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("\${project.image.imagelink.pop().url}")').attr("href",e.projectLink).attr("target","_blank").text(e.title),setTimeout(()=>{$("body")[0].onmousewheel=(()=>{r.fadeOut(500,()=>{r.remove()})})},3e3)}return r.click(()=>{$.get("https://us-central1-charity-banner.cloudfunctions.net/bannerWasClicked",{bannerId:t})}),r}$.get("https://api.globalgiving.org/api/public/projectservice/projects/${projectId}",{api_key:"75b3e155-2250-45c1-8833-19a3e9678fd6"},s=>{const e=createBanner("${style}",s.project,"${bannerId}");$("head").append('<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Righteous&display=swap">'),$("body").prepend(e)},"json");`
	res.send(script);
});

exports.createBanner = functions.https.onRequest((req, res) => {
	res.set('Access-Control-Allow-Origin', '*');
	const {bannerId, projectId, siteURL, style} = req.query;
	let db = admin.firestore();

	db.collection('banners').doc(bannerId).set({
		id: bannerId,
		projectId,
		siteURL,
		style
	});

	db.collection('analytics').doc(bannerId).set({
		impressions: 0,
		clicks: 0
	});

	res.end();
});

exports.analytics = functions.https.onRequest((req, res) => {
	res.set('Access-Control-Allow-Origin', '*');
	const {siteURL} = req.query;
	let db = admin.firestore();

	db.collection('banners').where('siteURL', '==', siteURL).get().then(snapshot => {
		const {docs} = snapshot;
		if (docs.length < 1) return;

		const bannerId = docs[0].data().id;

		db.collection('analytics').doc(bannerId).get().then(doc => {
			if (doc.exists) {
				res.send(doc.data());
			} else {
				res.send({
					impressions: 'Not found',
					clicks: 'Not found'
				});
			}
		});
	}).catch(() => {
		res.status(404).end();
	});
});

exports.bannerWasClicked = functions.https.onRequest((req, res) => {
	res.set('Access-Control-Allow-Origin', '*');
	const {bannerId} = req.query;
	let db = admin.firestore();

	db.collection('analytics').doc(bannerId).update({
		clicks: admin.firestore.FieldValue.increment(1)
	});

	res.end();
});