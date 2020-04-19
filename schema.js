const graphql = require('graphql');
const db = require('./data/db-config.js');

const {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString,
	GraphQLSchema,
	GraphQLID
} = graphql;

const VerbType = new GraphQLObjectType({
	name: 'Verb',
	fields: () => ({
		id: { type: GraphQLInt },
		spanishVerb: { type: GraphQLString },
		tense: { type: GraphQLString }
	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		verb: {
			type: VerbType,
			args: { id: { type: GraphQLInt } },
			async resolve(parent, args) {
				let verbs = await db('verbs');

				return verbs.find(verb => {
					if (verb.id === args.id) {
						return verb;
					}
				});
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
