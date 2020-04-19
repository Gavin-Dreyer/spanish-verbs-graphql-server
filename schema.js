const graphql = require('graphql');
const db = require('./data/db-config.js');

const {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLList
} = graphql;

const VerbType = new GraphQLObjectType({
	name: 'Verb',
	fields: () => ({
		id: { type: GraphQLInt },
		spanishVerb: { type: GraphQLString },
		tense: { type: GraphQLString },
		mood: { type: GraphQLString },
		englishDefinition: { type: GraphQLString },
		firstPersonSingular: { type: GraphQLString },
		secondPersonSingular: { type: GraphQLString },
		thirdPersonSingular: { type: GraphQLString },
		firstPersonPlural: { type: GraphQLString },
		secondPersonPlural: { type: GraphQLString },
		thirdPersonPlural: { type: GraphQLString }
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
		},
		verbList: {
			type: new GraphQLList(VerbType),
			args: { verb: { type: GraphQLString } },
			async resolve(parent, args) {
				let verbs = await db('verbs');

				return verbs.filter(verb => {
					if (verb.spanishVerb === args.verb) {
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
