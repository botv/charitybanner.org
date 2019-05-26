import builder from './builder';

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

$('#bannerForm').submit(function (e) {
	e.preventDefault();

	const siteURL = $('#siteURLInput').val();
	const projectId = selectedProjectId;
	const style = $('#styleSelect').val();

	let params = {
		siteURL: siteURL,
		projectId: projectId,
		style: style
	};

	const tag = builder.bind(params)((tag, id)=>{
		$('#resultScript').text(tag);
		$('#resultId').text(id)
	});

	$('#resultsModal').modal();
});

$('#copyCode').click(() => {
	navigator.permissions.query({name: 'clipboard-write'}).then(result => {
		if (result.state === 'granted' || result.state === 'prompt') {
			navigator.clipboard.writeText(tag);
		}
	});
});