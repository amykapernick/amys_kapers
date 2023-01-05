module.exports = {
	eleventyComputed: {
		pagetitle: (data) => `${data.title} | Amy Kapernick`,
	},
	tags: [
		'workshops'
	],
	layout: 'templates/talk.njk'
}