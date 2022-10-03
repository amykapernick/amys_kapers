const countries = require('../_data/countries.json')

const countryCode = (country) => {
	const code = Object.keys(countries).find(code => countries[code] === country)

	return code
}

module.exports = countryCode