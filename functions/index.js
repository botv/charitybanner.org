const functions = require('firebase-functions');

exports.banner = functions.https.onRequest((req, res) => {
	const {projectId, style} = req.query;

	const script = `function banner(e,s){let t;switch(e){case"fixed":case"scroll":case"vanish":t=$('<a id="banner"></a>').css("color","white").css("padding","10px").css("position","fixed").css("top","0").css("right","0").css("left","0").css("height","50px").css("z-index","2147483647").css("background-size","cover").css("background-position","center").css("background-repeat","no-repeat").css("text-align","center").css("color","white").css("font-size","20px").css("font-family",'"Righteous", cursive').css("background-image",\`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("\${s.image.imagelink[0].url}")\`).attr("href",s.projectLink).attr("target","_blank").text(s.title)}return t}$.get(\`https://api.globalgiving.org/api/public/projectservice/projects/${projectId}\`,{api_key:"75b3e155-2250-45c1-8833-19a3e9678fd6"},e=>{const s=e.project,t=banner(${style},s);$("head").append('<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Righteous&display=swap">'),$("body").prepend(t).css("padding-top","50px")},"json");`;
	res.send(script);
});
