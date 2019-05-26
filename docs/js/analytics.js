const urlParams = new URLSearchParams(window.location.search);
const bannerId = urlParams.get('bannerId');

if (bannerId) {
	$('#tagIdCell').text(bannerId);
	$.get('https://us-central1-charity-banner.cloudfunctions.net/analytics', {bannerId: bannerId}, (res) => {
		console.log(res);
		$('#impressionsCell').text(res.impressions);
		$('#clicksCell').text(res.clicks);
	});
}

$('#bannerIdForm').submit(e => {
	e.preventDefault();

	const bannerId = $('#bannerIdInput').val();

	window.location.href = '//' + location.host + location.pathname + '?bannerId=' + bannerId;
});
