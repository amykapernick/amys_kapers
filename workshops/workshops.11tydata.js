module.exports = {
	eleventyComputed: {
		title: (data) => `${data.title} | Amy Kapernick`,
	},
	tags: [
		'workshops'
	],
	layout: 'templates/talk.njk'
}