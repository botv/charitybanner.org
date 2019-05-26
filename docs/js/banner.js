function banner(style, project) {
	let bannerDiv;
	switch (style) {
		case 'fixed':
			bannerDiv = $('<a id="banner"></a>')
				.css('color', 'white !important')
				.css('padding', '10px !important')
				.css('position', 'fixed !important')
				.css('top', '0 !important')
				.css('right', '0 !important')
				.css('left', '0 !important')
				.css('height', '50px !important')
				.css('z-index', '2147483647 !important')
				.css('background-size', 'cover !important')
				.css('background-position', 'center !important')
				.css('background-repeat', 'no-repeat !important')
				.css('text-align', 'center !important')
				.css('font-size', '20px !important')
				.css('font-family', '"Righteous", cursive !important')
				.css('background-image', `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${project.image.imagelink.pop().url}") !important`)
				.attr('href', project.projectLink)
				.attr('target', '_blank')
				.text(project.title);

			break;
		case 'scroll':
			bannerDiv = $('<a id="banner"></a>')
				.css('color', 'white !important')
				.css('padding', '10px !important')
				.css('position', 'fixed !important')
				.css('top', '0 !important')
				.css('right', '0 !important')
				.css('left', '0 !important')
				.css('height', '50px !important')
				.css('z-index', '2147483647 !important')
				.css('background-size', 'cover !important')
				.css('background-position', 'center !important')
				.css('background-repeat', 'no-repeat !important')
				.css('text-align', 'center !important')
				.css('font-size', '20px !important')
				.css('font-family', '"Righteous", cursive !important')
				.css('background-image', `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${project.image.imagelink.pop().url}") !important`)
				.attr('href', project.projectLink)
				.attr('target', '_blank')
				.text(project.title);

			break;
		case 'vanish':
			bannerDiv = $('<a id="banner"></a>')
				.css('color', 'white !important')
				.css('padding', '10px !important')
				.css('position', 'fixed !important')
				.css('top', '0 !important')
				.css('right', '0 !important')
				.css('left', '0 !important')
				.css('height', '50px !important')
				.css('z-index', '2147483647 !important')
				.css('background-size', 'cover !important')
				.css('background-position', 'center !important')
				.css('background-repeat', 'no-repeat !important')
				.css('text-align', 'center !important')
				.css('font-size', '20px !important')
				.css('font-family', '"Righteous", cursive !important')
				.css('background-image', `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${project.image.imagelink.pop().url}") !important`)
				.attr('href', project.projectLink)
				.attr('target', '_blank')
				.text(project.title);

			break;
	}

	return bannerDiv;
}

$.get('https://api.globalgiving.org/api/public/projectservice/projects/projectId', {
	'api_key': '75b3e155-2250-45c1-8833-19a3e9678fd6'
}, res => {
	const project = res.project;
	const bannerDiv = banner('style', project);

	$('head').append('<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Righteous&display=swap">');
	$('body')
		.prepend(bannerDiv)
		.css('padding-top', `50px`);
}, 'json');