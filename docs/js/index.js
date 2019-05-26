import builder from './builder.js'

let projects = {};
let selectedId = null;

$('#bannerForm').submit(function (e) {
	e.preventDefault();

	// Make sure a charity has been selected
	if (!selectedId) return;

	// get all the inputs into an array.
	let inputs = $('#bannerForm :input');

	// not sure if you wanted this, but I thought I'd add it.
	// get an associative array of just the values.
	let values = {};
	inputs.each(function() {
		values[this.name] = $(this).val();
	});

	// Manual setup
	values.charityId = selectedId;
	values.projectData = projects[values.charityId];
	if (values.charityURL === '') values.charityURL = values.projectData.url;
	if (values.bannerHeight === "" || values.bannerHeight < 150) values.bannerHeight = 150;

	console.log(values);
	const scriptTag = builder.bind(values);
});

// Set up organization search
$('#searchProjects').click(()=>{
	let query = encodeURI($('#searchProjectsQuery').val());
	if (query === "") return;

	console.log('q:' + query);

	$.get(
		'https://api.globalgiving.org/api/public/services/search/projects?api_key=75b3e155-2250-45c1-8833-19a3e9678fd6&q='+query,
		(res)=>{
			let ul = $('#searchResults');
			ul.empty();

			if (!res.search.response.projects) {
				console.log(res.search.response);
				let option = document.createElement('li');
				option.classList.add("list-group-item");
				option.innerHTML = "No results! :(";
				ul.append(option);
				return;
			}

			for (let project of res.search.response.projects.project) {
				projects[project.id] = {
					title: project.title,
					id: project.id,
					desc: project.activities,
					url: (project.contactUrl || project.projectLink),
					img: project.imageLink
				};
			}

			for (let key in projects) {
				let option = $('<li></li>');
				option.addClass("list-group-item");
				option.css('cursor', 'pointer');
				option.html(projects[key].title);

				option.hover(function(){
					$(this).css("background-color", "#bbb");
				}, function(){
					$(this).css("background-color", "#fff");
				});

				option.click(()=>{
					selectedId = projects[key].id;
					$('#projectLabel').html('Project ('+projects[key].title+')');
					console.log('click!')
				});

				ul.append(option)
			}

			console.log(projects);
		},
		'json'
		)
});