const {gql} = require('apollo-server-azure-functions')

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
		section: Section!
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
		tasks(list: String, section: String): [Task]
		sections(period: String): [Section]
		events(section: String): [Event]
		notes: [Note]
		task(id: ID): Task
		section(sectionId: ID): Section
		event(id: ID): Event
		note(section: String): Note
	}

	input TaskInput {
		id: ID
		name: String
		list: String
		section: String
		due: Date
	}

	input EventInput {
		name: String
		startDate: Date
		endDate: Date
		section: String
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
		deleteTask(task: ID): [Task]
		deleteEvent(event: ID): [Event]
		editTask(task: TaskInput): Task
		editEvent(event: EventInput): Event
		editNote(note: NoteInput): Note
	}
`

module.exports = typeDefs