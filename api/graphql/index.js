require('dotenv').config()

const {ApolloServer, gql} = require('apollo-server-azure-functions')
const {GraphQLScalarType} = require('graphql')
const {Kind} = require('graphql/language')
const {CosmosClient} = require('@azure/cosmos')

const uuid = require('../src/utils/uuid')
const {tasks, sections, events, notes} = require('../src/utils/fetchData')

const client = new CosmosClient({
	endpoint: process.env.COSMOS_ENDPOINT,
	key: process.env.COSMOS_KEY
})

const typeDefs = gql`
	scalar Date

	enum Period {
		week
		month
	}

	type Task {
		name: String!
		completed: Boolean
		id: ID!
		list: String!
		due: Date
		section: Section!
	}

	type Event {
		name: String!
		startDate: Date!
		endDate: Date
		month: Section!
		id: ID!
	}

	type Note {
		id: ID!
		notes: String!
		section: Section!
	}

	type Section {
		sectionId: ID!
		id: ID!
		period: Period!
		events: [Event]
		tasks: [Task]
		notes: Note
	}

	type Query {
		tasks(list: String): [Task]
		sections(period: String): [Section]
		notes: [Note]
		task(id: ID): Task
		section(sectionId: ID): Section

	}

	input TaskInput {
		name: String
		list: String
		section: String
		due: Date
	}

	input EventInput {
		name: String
		startDate: Date
		endDate: Date
		month: String
	}

	input NoteInput {
		notes: String
		section: String
	}

	input SectionInput {
		sectionId: ID
		period: Period
	}

	type Mutation {
		addTask(task: TaskInput): [Task]
		addSection(section: SectionInput): [Section]
		addEvent(event: EventInput): [Event]
		addNote(note: NoteInput): Note
	}
`

const resolvers = {
	Query: {
		tasks: async () => {
			const results = await tasks()

			return results
		},
		sections: async () => {
			const results = await sections()

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
		}
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
		addNote: async (obj, args, context) => {
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


const server = new ApolloServer({
	typeDefs, resolvers,
	introspection: true,
	playground: process.env.NODE_ENV === "dev",
	context: ({req}) => {
		const fakeUser = {
			userId: 'userId'
		}
		return ({
			...fakeUser
		})
	}
})

module.exports = server.createHandler();
