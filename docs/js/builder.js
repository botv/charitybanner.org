export default function builder(callback) {
	$.get('https://us-central1-charity-banner.cloudfunctions.net/getAllTagIds', (tagIds) => {
		console.log(tagIds);

		function makeId(length) {
			let result = '';
			let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			let charactersLength = characters.length;
			for (let i = 0; i < length; i++) {
				result += characters.charAt(Math.floor(Math.random() * charactersLength));
			}

			return result;
		}

		let id = makeId(30);
		while (tagIds.includes(id)) id = makeId(30);

		$.get('https://us-central1-charity-banner.cloudfunctions.net/initAnalytics',
			{bannerId: bannerId}
		);

		const url = new URL('https://us-central1-charity-banner.cloudfunctions.net/banner');
		url.searchParams.set('projectId', this.projectId);
		url.searchParams.set('style', this.style);
		url.searchParams.set('bannerId', id);

		callback(`<script src="${url.href}" defer></script>`, id);
	});
};