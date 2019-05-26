const urlParams = new URLSearchParams(window.location.search);
const bannerId = urlParams.get('bannerId');

if (bannerId) {
	$('#tagIdCell').text(bannerId);
	$.get('https://us-central1-charity-banner.cloudfunctions.net/analytics', {bannerId: bannerId}, (res)=>{
		console.log(res);
		$('#impressionsCell').text(res.impressions);
		$('#clicksCell').text(res.clicks);
	});
}

$('#tagIdForm').submit(function(e) {
	e.preventDefault();

	console.log("Fc");
	let val = $('#tagIdInput').val();

	window.location.href = '//' + location.host + location.pathname + '?bannerId=' + val;
});
