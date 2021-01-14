require('dotenv').config()

const {ApolloServer, gql} = require('apollo-server-azure-functions')
const {GraphQLScalarType} = require('graphql')
const {Kind} = require('graphql/language')

const uuid = require('../src/utils/uuid')
const {tasks, sections, events, notes} = require('../src/utils/fetchData')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')



const server = new ApolloServer({
	typeDefs, 
	resolvers,
	introspection: true,
	playground: true,
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
