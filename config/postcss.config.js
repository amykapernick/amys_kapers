const stylelint = require('stylelint')
const nesting = require('postcss-nesting')
const staticVariables = require('postcss-advanced-variables')

const colours = require('./app/styles/config/colours')
const sizes = require('./app/styles/config/sizes')
const variables = require('./app/styles/config/variables')

console.log({ variables, colours, sizes })


module.exports = {
	plugins: [
		staticVariables({
			variables: {
				...colours,
				...sizes,
				...variables
			},
			importPaths: ['./src/styles/mixins/*.css'],
		}),
		nesting,
		stylelint
	],
};