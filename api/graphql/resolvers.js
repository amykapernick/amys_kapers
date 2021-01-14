const {GraphQLScalarType} = require('graphql')
const {Kind} = require('graphql/language')
const {CosmosClient} = require('@azure/cosmos')

const uuid = require('../src/utils/uuid')
const {tasks, sections, events, notes} = require('../src/utils/fetchData')

const client = new CosmosClient({
	endpoint: process.env.COSMOS_ENDPOINT,
	key: process.env.COSMOS_KEY
})

const resolvers = {
	Query: {
		tasks: async (obj, {list, section}) => {
			let results = await tasks()

			if(section) {
				results = results.filter((task) => section === task.section)
			}

			if(list) {
				results = results.filter((task) => list === task.list)
			}

			return results
		},
		sections: async (obj, {period}) => {
			let results = await sections()

			if(period) {
				results = results.filter((section) => period === section.period)
			}

			return results
		},
		events: async (obj, {section}) => {
			let results = await events()

			if(section) {
				results = results.filter((event) => section === event.section)
			}

			return results
		},
		notes: async () => {
			const results = await notes()

			return results
		},
		task: async (obj, {id}) => {
			const results = await tasks()

			return results.find((task) => task.id === id)
		},
		section: async (obj, {sectionId}) => {
			const results = await sections()

			return results.find((section) => section.sectionId === sectionId)
		},
		event: async (obj, {id}) => {
			const results = await events()

			return results.find((event) => event.id === id)
		},
		note: async (obj, {section}) => {
			const results = await notes()

			return results.find((note) => note.section === section)
		},
	},
	Section: {
		tasks: async (parent) => {
			const results = await tasks()

			return results.filter((task) => parent.sectionId === task.section)
		},
		events: async (parent) => {
			const results = await events()

			return results.filter((event) => parent.sectionId === event.month)
		},
		notes: async (parent) => {
			const results = await notes()

			return results.find((notes) => parent.sectionId === notes.section)
		}
	},
	Date: new GraphQLScalarType({
		name: `Date`,
		description: 'This is a proper date',
		parseValue(value) {
			// value from the client
			// console.log(value)
			return new Date(value)
		},
		serialize(value) {
			// value sent to the client
			return new Date(value)
		},
		parseLiteral(ast) {
			if(ast.kind === Kind.INT) {
				return new Date(ast.value)
			}
			return null
		}
	}),
	Note: {
		section: async (parent) => {
			const results = await sections()

			return results.find((section) => parent.section === section.sectionId)
		}
	},
	Task: {
		section: async (parent) => {
			const results = await sections()

			return results.find((section) => parent.section === section.sectionId)
		}
	},
	Event: {
		section: async (parent) => {
			const results = await sections()

			return results.find((section) => parent.section === section.sectionId)
		}
	},
	Mutation: {
		addTask: async (obj, args, context) => {
			if(context.userId) {
				await client
					.database('bullet-journal')
					.container('tasks')
					.items
					.create({
						...args.task
					})

				const results = await tasks()
	
				return results
			}
			return await tasks()
		},
		addSection: async (obj, args, context) => {
			const results = await sections()
			if(context.userId) {
				if(!results.some(section => section.sectionId == args.section.sectionId)) {
					await client
					.database('bullet-journal')
					.container('sections')
					.items
					.create({
						...args.section
					})

					const newResults = await sections()
		
					return newResults
				}				
			}
			return results
		},
		addEvent: async (obj, args, context) => {
			if(context.userId) {
				await client
					.database('bullet-journal')
					.container('events')
					.items
					.create({
						...args.event
					})

				const results = await events()
	
				return results
			}
			return await events()
		},
		deleteTask: async (obj, args, context) => {
			const results = await tasks()

			if(context.userId) {
				const selectedTask = results.find(task => task.id == args.task)

				if(selectedTask) {
					await client
					.database('bullet-journal')
					.container('tasks')
					.item(selectedTask.id, selectedTask.section)
					.delete()

					const newResults = await tasks()
		
					return newResults
				}					
			}

			return results
		},
		deleteEvent: async (obj, args, context) => {
			const results = await events()

			if(context.userId) {
				const selectedEvent = results.find(event => event.id == args.event)

				if(selectedTask) {
					await client
					.database('bullet-journal')
					.container('events')
					.item(selectedEvent.id, selectedEvent.section)
					.delete()

					const newResults = await events()
		
					return newResults
				}					
			}

			return results
		},
		editTask: async (obj, args, context) => {
			const results = await tasks()

			if(context.userId) {
				const selectedTask = results.find(task => task.id == args.task.id)
				
				if(selectedTask) {
					if(args.task.section) {
						await client
							.database('bullet-journal')
							.container('tasks')
							.item(selectedTask.id, selectedTask.section)
							.delete()

						await client
							.database('bullet-journal')
							.container('tasks')
							.items
							.create({
								...selectedTask,
								...args.task,
							})
					}
					else {
						await client
						.database('bullet-journal')
						.container('tasks')
						.item(selectedTask.id, selectedTask.section)
						.replace({
							...selectedTask,
							...args.task,
						})
					}

					const newResults = await tasks()
		
					return newResults.find(task => task.id == args.task.id)
				}					
			}

			return results
		},
		editEvent: async (obj, args, context) => {
			const results = await events()

			if(context.userId) {
				const selectedEvent = results.find(event => event.id == args.event.id)
				
				if(selectedEvent) {
					if(args.event.section) {
						await client
							.database('bullet-journal')
							.container('events')
							.item(selectedEvent.id, selectedEvent.section)
							.delete()

						await client
							.database('bullet-journal')
							.container('events')
							.items
							.create({
								...selectedEvent,
								...args.event,
							})
					}
					else {
						await client
						.database('bullet-journal')
						.container('events')
						.item(selectedEvent.id, selectedEvent.section)
						.replace({
							...selectedEvent,
							...args.event,
						})
					}

					const newResults = await events()
		
					return newResults.find(event => event.id == args.event.id)
				}					
			}

			return results
		},
		editNote: async (obj, args, context) => {
			const results = await notes()

			if(context.userId) {
				if(!results.some(note => note.section == args.note.section)) {
					await client
					.database('bullet-journal')
					.container('notes')
					.items
					.create({
						...args.note
					})

					const newResults = await notes()
		
					return newResults
				}	
				else {
					const note = results.find(note => note.section == args.note.section)

					await client
					.database('bullet-journal')
					.container('notes')
					.item(note.id)
					.replace({
						...note,
						...args.note,
						noteId: uuid(),
					})

					const newResults = await notes()
		
					return newResults
				}			
			}

			return results
		},
	}
}

module.exports = resolvers