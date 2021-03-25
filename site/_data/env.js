module.exports = {
	env: process.env.ELEVENTY_ENV,
	api: process.env.API_URL,
	siteUrl: process.env.SITE_URL || 'https://www.amyskapers.dev',
	formWorkshopBooking: process.env.FORM_WORKSHOP_BOOKING
}