const functions = require('firebase-functions');

exports.banner = functions.https.onRequest((req, res) => {
	const {charityId, bannerStyle, primaryColor, secondaryColor, tertiaryColor, textColor} = req.query;

	const script = `function banner(e,r,o,s,t,a){let c;switch(e){case"fixed":c=$('<a id="banner"></a>').css("color",r).css("padding","10px").css("position","fixed").css("top","0").css("right","0").css("left","0").css("height","50px").css("z-index","2147483647").css("background-size","cover").css("background-position","center").css("background-repeat","no-repeat").css("text-align","center").css("color","white").css("font-size","20px").css("font-family",'"Righteous", cursive').css("background-image",\`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${a.image.imagelink[0].url}")\`).attr("href",a.projectLink).attr("target","_blank").text(a.title);break;case"scroll":case"vanish":c=$('<a id="banner"></a>')}return c}const{charityId:charityId,bannerStyle:bannerStyle,primaryColor:primaryColor,secondaryColor:secondaryColor,tertiaryColor:tertiaryColor,textColor:textColor}=req.query;$.get(\`https://api.globalgiving.org/api/public/projectservice/projects/${charityId}\`,{api_key:"75b3e155-2250-45c1-8833-19a3e9678fd6"},e=>{const r=e.project;const o=banner(${bannerStyle},${textColor},${primaryColor},${secondaryColor},${tertiaryColor},r);$("head").append('<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Righteous&display=swap">'),$("body").prepend(o).css("padding-top","50px")},"json");`;
	res.send(script);
});
