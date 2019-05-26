import uniqid from 'uniqid'

export default function builder(callback) {
	const bannerId = uniqid();

	$.get('https://us-central1-charity-banner.cloudfunctions.net/initAnalytics',
		{bannerId: bannerId}
	);

	const url = new URL('https://us-central1-charity-banner.cloudfunctions.net/banner');
	url.searchParams.set('projectId', this.projectId);
	url.searchParams.set('style', this.style);
	url.searchParams.set('bannerId', bannerId);

	callback(`<script src="${url.href}" defer></script>`, bannerId);
};