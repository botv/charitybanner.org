function banner(style, project) {
	let bannerDiv;
	switch (style) {
		case 'fixed':
			bannerDiv = $('<a id="banner"></a>')
				.css('color', 'white')
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
				.css('background-image', `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${project.image.imagelink[0].url}")`)
				.attr('href', project.projectLink)
				.attr('target', '_blank')
				.text(project.title);

			break;
		case 'scroll':
			bannerDiv = $('<a id="banner"></a>')
				.css('color', 'white')
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
				.css('background-image', `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${project.image.imagelink[0].url}")`)
				.attr('href', project.projectLink)
				.attr('target', '_blank')
				.text(project.title);

			break;
		case 'vanish':
			bannerDiv = $('<a id="banner"></a>')
				.css('color', 'white')
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
				.css('background-image', `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${project.image.imagelink[0].url}")`)
				.attr('href', project.projectLink)
				.attr('target', '_blank')
				.text(project.title);

			break;
	}

	return bannerDiv;
}

$.get(`https://api.globalgiving.org/api/public/projectservice/projects/${projectId}`, {
	'api_key': '75b3e155-2250-45c1-8833-19a3e9678fd6'
}, res => {
	const project = res.project;
	const bannerDiv = banner(bannerStyle, project);

	$('head').append('<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Righteous&display=swap">');
	$('body')
		.prepend(bannerDiv)
		.css('padding-top', `50px`);
}, 'json');