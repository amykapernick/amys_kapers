require('dotenv').config()

module.exports = function(eleventyConfig) {
	// Dev Config
	eleventyConfig.setBrowserSyncConfig({
		notify: true,
		watch: true,
	})

	// Static Files
	eleventyConfig.addPassthroughCopy({'src/img': 'img'})
	eleventyConfig.addPassthroughCopy({'src/fonts': 'fonts'})
	eleventyConfig.addPassthroughCopy({'src/js': 'js'})
	eleventyConfig.addPassthroughCopy({'src/files': 'files'})
}