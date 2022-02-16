module.exports = {
	eleventyComputed: {
		permalink: (data) => `${data.page.filePathStem.replace(/^\/pages/, '').replace(/\/index$/, '')}/index.html`
	}
}