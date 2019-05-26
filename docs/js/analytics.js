$('#bannerSearchForm').submit(e => {
	e.preventDefault();

	const siteURL = $('#bannerSearchInput').val();

	$.get('https://us-central1-charity-banner.cloudfunctions.net/analytics', {siteURL}, (res) => {
		$('#impressionsCell').text(res.impressions);
		$('#clicksCell').text(res.clicks);
	});
});
