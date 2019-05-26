let selectedProjectId;

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
			console.log(projects[id]);
			let option = $('<li></li>')
				.addClass('list-group-item')
				.css('cursor', 'pointer')
				.html(projects[id].title);

			option.hover(
				() => $(this).css('background-color', '#dddddd'),
				() => $(this).css('background-color', '#ffffff')
			);

			option.click(() => {
				selectedProjectId = projects[id].id;
				$('#projectInput').val(projects[id].title);
				searchResultsContainer.empty();
			});

			searchResultsContainer.append(option);
		}
	}, 'json');
});

$('#bannerForm').submit(function (e) {
	e.preventDefault();

	const siteURL = $('#siteURLInput').val();
	const projectId = selectedProjectId;
	const bannerStyle = $('#bannerStyleSelect').val();

	console.log(siteURL, projectId, bannerStyle);
});