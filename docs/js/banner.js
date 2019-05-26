function createBanner(style, project, bannerId) {
	const body = $('body');
	let banner;

	switch (style) {
		case 'fixed':
			banner = $('<a id="createBanner"></a>')
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
				.css('font-size', '20px')
				.css('font-family', '"Righteous", cursive')
				.css('background-image', `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("\${project.image.imagelink.pop().url}")`)
				.css('box-sizing', 'border-box')
				.attr('href', project.projectLink)
				.attr('target', '_blank')
				.text(project.title);

			body.css('padding-top', `50px`);

			break;
		case 'scroll':
			banner = $('<a id="createBanner"></a>')
				.css('color', 'white')
				.css('padding', '10px')
				.css('position', 'absolute')
				.css('top', '0')
				.css('box-sizing', 'border-box')
				.css('right', '0')
				.css('left', '0')
				.css('height', '50px')
				.css('z-index', '2147483647')
				.css('background-size', 'cover')
				.css('background-position', 'center')
				.css('background-repeat', 'no-repeat')
				.css('text-align', 'center')
				.css('font-size', '20px')
				.css('font-family', '"Righteous", cursive')
				.css('background-image', `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(\${project.image.imagelink.pop().url}")`)
				.attr('href', project.projectLink)
				.attr('target', '_blank')
				.text(project.title);

			body.css('padding-top', `50px`);

			break;
		case 'vanish':
			banner = $('<a id="createBanner"></a>')
				.css('color', 'white')
				.css('padding', '10px')
				.css('position', 'fixed')
				.css('top', '20px')
				.css('right', '0')
				.css('left', '0')
				.css('margin-left', '20px')
				.css('margin-right', '20px')
				.css('height', '50px')
				.css('box-sizing', 'border-box')
				.css('z-index', '2147483647')
				.css('background-size', 'cover')
				.css('background-position', 'center')
				.css('background-repeat', 'no-repeat')
				.css('text-align', 'center')
				.css('font-size', '20px')
				.css('border-radius', '5px')
				.css('font-family', '"Righteous", cursive')
				.css('background-image', `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("\${project.image.imagelink.pop().url}")`)
				.attr('href', project.projectLink)
				.attr('target', '_blank')
				.text(project.title);

			setTimeout(()=> {
				$('body')[0].onmousewheel = () => {
					banner.fadeOut(500, () => {
						banner.remove();
					});
				};
			}, 3000);

			break;
	}

	banner.click(()=>{
		$.get('https://us-central1-charity-banner.cloudfunctions.net/bannerWasClicked', {bannerId});
	});

	return banner;
}

$.get('https://api.globalgiving.org/api/public/projectservice/projects/projectId', {
	'api_key': '75b3e155-2250-45c1-8833-19a3e9678fd6'
}, res => {
	const project = res.project;
	const banner = createBanner('style', project, 'bannerId');

	$('head').append('<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Righteous&display=swap">');
	$('body').prepend(banner);
}, 'json');