import uniqid from 'uniqid';

let selectedProjectId;

function createBannerTag(projectId, siteURL, style) {
	const bannerId = uniqid();

	$.get('https://us-central1-charity-banner.cloudfunctions.net/createBanner', {
		bannerId,
		projectId,
		siteURL,
		style
	});

	const url = new URL('https://us-central1-charity-banner.cloudfunctions.net/banner');
	url.searchParams.set('projectId', projectId);
	url.searchParams.set('style', style);
	url.searchParams.set('bannerId', bannerId);

	return `<script src="${url.href}" defer></script>`;
}

$('#searchButton').click(() => {
	let query = $('#projectInput').val();
	const searchResultsContainer = $('#searchResults');

	$.get('https://api.globalgiving.org/api/public/services/search/projects', {
		'api_key': '75b3e155-2250-45c1-8833-19a3e9678fd6',
		'q': encodeURIComponent(query)
	}, res => {
		let projects = res.search.response.projects;
		searchResultsContainer.empty();

		if (!projects) {
			const newOption = $('<li></li>')
				.addClass('list-group-item')
				.html('No projects found');
			searchResultsContainer.append(newOption);
			return;
		}

		projects = projects.project;

		for (let id in projects) {
			const project = projects[id];

			let option = $('<li></li>');

			option.addClass('list-group-item');
			option.css('cursor', 'pointer');
			option.html(project.title);

			option.click(() => {
				selectedProjectId = project.id;
				$('#projectInput').val(project.title);
				searchResultsContainer.empty();
			});

			option.hover(
				function () {
					$(this).css('background-color', '#eeeeee');
				},
				function () {
					$(this).css('background-color', '#ffffff');
				}
			);

			searchResultsContainer.append(option);
		}
	}, 'json');
});

$('#bannerForm').submit(e => {
	e.preventDefault();

	const siteURL = $('#siteURLInput').val();
	const projectId = selectedProjectId;
	const style = $('#styleSelect').val();
	const bannerTag = createBannerTag(projectId, siteURL, style);

	$('#resultScript').text(bannerTag);
	$('#resultsModal').modal();
});

$('#copyCode').click(() => {
	navigator.permissions.query({name: 'clipboard-write'}).then(result => {
		if (result.state === 'granted' || result.state === 'prompt') {
			navigator.clipboard.writeText(tag);
		}
	});
});