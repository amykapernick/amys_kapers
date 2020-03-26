require('dotenv').config()

const fetch = require('node-fetch'),
url = process.env.NOTIST_FEED;


// expose these results as data to eleventy.
module.exports = async () => {
	return await fetch(url)
		.then(res => res.json())
		.then(results => {
			return results.data[0].relationships.data.map(async talk => {
				const event = await fetch(talk.links.event)
					.then(res => res.json())
					.then(res => res.data[0].attributes.title)

				if(event) {
					return {
						title: talk.attributes.title,
						date: talk.attributes.published_on,
						link: talk.links.self,
						event: event
					}
				}
			})
		})
}