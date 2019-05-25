export default function builder() {
	const url = new URL('https://us-central1-charity-banner.cloudfunctions.net/banner');
	url.searchParams.set('charityURL', this.charityURL);
	url.searchParams.set('charityId', this.charityId);
	url.searchParams.set('bannerHeight', this.bannerHeight);
	url.searchParams.set('bannerStyle', this.bannerStyle);
	url.searchParams.set('bannerPrimaryColor', this.bannerPrimaryColor);
	url.searchParams.set('bannerSecondaryColor', this.bannerSecondaryColor);
	url.searchParams.set('bannerHighlightColor', this.bannerHighlightColor);
	return `<script src="${url.href}"></script>`
}