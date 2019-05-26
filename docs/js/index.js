import builder from "./builder";

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

			let option = $('<li></li>')
				.addClass('list-group-item')
				.css('cursor', 'pointer')
				.html(project.title);

			option.hover(
				() => $(this).css('background-color', '#dddddd'),
				() => $(this).css('background-color', '#ffffff')
			);

			option.click(() => {
				selectedProjectId = project.id;
				$('#projectInput').val(project.title);
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

	let params = {
		siteURL: siteURL,
		projectId: projectId,
		bannerStyle: bannerStyle
	};
	console.log(params);

	const tag = builder.bind(params)();

	$('#resultsModal').modal('show');

	let textNode = document.createTextNode(tag);
	$('#resultScript').html(document.createTextNode(tag));

	$('#copyCode').click(()=>{
		// Copy from resultScript here
	});
});