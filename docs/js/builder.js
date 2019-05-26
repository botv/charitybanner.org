export default function builder() {
	const url = new URL('https://us-central1-charity-banner.cloudfunctions.net/banner');
	url.searchParams.set('projectId', this.projectId);
	url.searchParams.set('style', this.style);
	return `<script src="${url.href} defer"></script>`
}