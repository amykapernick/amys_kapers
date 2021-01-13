require('dotenv').config()

const {CosmosClient} = require('@azure/cosmos')

const client = new CosmosClient({
	endpoint: process.env.COSMOS_ENDPOINT,
	key: process.env.COSMOS_KEY
})

const tasks = async () => {
	const results = await client
		.database('bullet-journal')
		.container('tasks')
		.items
		.query({
			query: "SELECT * FROM c"
		})
		.fetchAll()

		if (results.resources.length > 0) {
			return results.resources;
		}
		return [];
}

const events = async () => {
	const results = await client
		.database('bullet-journal')
		.container('events')
		.items
		.query({
			query: "SELECT * FROM c"
		})
		.fetchAll()

		if (results.resources.length > 0) {
			return results.resources;
		}
		return [];
}

const notes = async () => {
	const results = await client
		.database('bullet-journal')
		.container('notes')
		.items
		.query({
			query: "SELECT * FROM c"
		})
		.fetchAll()

		if (results.resources.length > 0) {
			return results.resources;
		}
		return [];
}

const sections = async () => {
	const results = await client
		.database('bullet-journal')
		.container('sections')
		.items
		.query({
			query: "SELECT * FROM c"
		})
		.fetchAll()

		if (results.resources.length > 0) {
			return results.resources;
		}
		return [];
}

module.exports = {tasks, sections, events, notes}
