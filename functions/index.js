const functions = require('firebase-functions');

exports.banner = functions.https.onRequest((req, res) => {
	const {projectId, style} = req.query;

	const script = `function banner(t,e){let s;switch(t){case"fixed":case"scroll":case"vanish":s=$('<a id="banner"></a>').css("color","white !important").css("padding","10px !important").css("position","fixed !important").css("top","0 !important").css("right","0 !important").css("left","0 !important").css("height","50px !important").css("z-index","2147483647 !important").css("background-size","cover !important").css("background-position","center !important").css("background-repeat","no-repeat !important").css("text-align","center !important").css("font-size","20px !important").css("font-family",'"Righteous", cursive !important').css("background-image",\`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${e.image.imagelink.pop().url}") !important\`).attr("href",e.projectLink).attr("target","_blank").text(e.title)}return s}$.get("https://api.globalgiving.org/api/public/projectservice/projects/${projectId}",{api_key:"75b3e155-2250-45c1-8833-19a3e9678fd6"},t=>{const e=banner("${style}",t.project);$("head").append('<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Righteous&display=swap">'),$("body").prepend(e).css("padding-top","50px")},"json");`;
	res.send(script);
});
