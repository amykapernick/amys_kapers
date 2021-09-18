require('dotenv').config()

const markdownIt = require('markdown-it'),
svgPlugin = require('@jamshop/eleventy-plugin-svg'),
months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
]

module.exports = function(eleventyConfig) {
	// Dev Config
	eleventyConfig.setBrowserSyncConfig({
		notify: true,
		watch: true,
	})
	eleventyConfig.addWatchTarget('./site/_includes/')
	eleventyConfig.addWatchTarget('./site/src/')

	// Static Files
	eleventyConfig.addPassthroughCopy({'site/src/img': 'img'})
	eleventyConfig.addPassthroughCopy({'site/src/fonts': 'fonts'})
	eleventyConfig.addPassthroughCopy({'site/src/files': 'files'})

	// Filters and Shortcodes
	eleventyConfig.addNunjucksShortcode('debug', (data) => {
		console.log(data)
		return (
		`<pre>${JSON.stringify(data)}</pre>`
	)})
	eleventyConfig.addFilter('renderHtml', (string) => (new markdownIt().render(string)))
	eleventyConfig.addNunjucksShortcode('filterTalks', (title, events) => {
		if(!events) {
			return
		}
		const talks = events.filter(event => title === event.title)
		const talksList = talks.map(talk => (
			`<li>
				<h3>
					<a href="${talk.link}" target="_blank" rel="nofollow">
						${talk.event.title}
					</a>
				</h3> 
				- ${months[talk.date.getMonth()]} ${talk.date.getFullYear()}
			</li>`
		))

		return (
			`<ul>
				${talksList.join('')}
			</ul>`
		)
	})

	// Plugins
	eleventyConfig.addPlugin(svgPlugin, {
		input: "site/src/img/"
	  });
	  

	// Markdown Options
	const markdown = markdownIt({
		html: true,
		linkify: true
	})

	eleventyConfig.setFrontMatterParsingOptions({
		excerpt: true,
		excerpt_separator: '<!-- excerpt -->'
	})
	eleventyConfig.setLibrary('md', markdown)

	// Other Config
	return {
		dir: {
			input: "site"
		},
		markdownTemplateEngine: 'njk'
	}
}