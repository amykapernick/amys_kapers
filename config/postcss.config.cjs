const stylelint = require('stylelint')
const nesting = require('postcss-nesting')
const staticVariables = require('postcss-advanced-variables')

const colours = require('../src/styles/config/colours')
const variables = require('../src/styles/config/variables')

console.log({ variables, colours })


module.exports = {
	plugins: [
		staticVariables({
			variables: {
				...colours,
				...variables
			},
			importPaths: ['../src/styles/mixins/*.css'],
			importRoot: '../src/styles'
		}),
		nesting({
			noIsPseudoSelector: true
		}),
		// stylelint({
		// 	configFile: `./config/.stylelint.config.cjs`,
		// 	quiet: true
		// })
	],
};