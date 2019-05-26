function banner(style, textColor, primaryColor, secondaryColor, tertiaryColor, organization) {
	let bannerDiv;
	switch (style) {
		case 'fixed':
			bannerDiv = $('<a id="banner"></a>')
				.css('color', textColor)
				.css('padding', '10px')
				.css('position', 'fixed')
				.css('top', '0')
				.css('right', '0')
				.css('left', '0')
				.css('height', '50px')
				.css('z-index', '2147483647')
				.css('background-size', 'cover')
				.css('background-position', 'center')
				.css('background-repeat', 'no-repeat')
				.css('text-align', 'center')
				.css('color', 'white')
				.css('font-size', '20px')
				.css('font-family', '"Righteous", cursive')
				.css('background-image', `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${organization.image.imagelink[0].url}")`)
				.attr('href', organization.projectLink)
				.attr('target', '_blank')
				.text(organization.title);

			break;
		case 'scroll':
			bannerDiv = $('<a id="banner"></a>');

			break;
		case 'vanish':
			bannerDiv = $('<a id="banner"></a>');

			break;
	}

	return bannerDiv;
}

$.get(`https://api.globalgiving.org/api/public/projectservice/projects/${charityId}`, {
	'api_key': '75b3e155-2250-45c1-8833-19a3e9678fd6'
}, res => {
	const organization = res.project;
	console.log(organization);
	const bannerDiv = banner(bannerStyle, textColor, primaryColor, secondaryColor, tertiaryColor, organization);

	$('head').append('<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Righteous&display=swap">');
	$('body')
		.prepend(bannerDiv)
		.css('padding-top', `50px`);
}, 'json');