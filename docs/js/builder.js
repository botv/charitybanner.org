export default function builder() {
	const url = new URL('https://us-central1-charity-banner.cloudfunctions.net/banner');
	url.searchParams.set('siteURL', this.siteURL);
	url.searchParams.set('projectId', this.projectId);
	url.searchParams.set('bannerStyle', this.bannerStyle);
	console.log("bruh? " + url.href);
	return `<script src="${url.href}" defer></script>`
};