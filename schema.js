const graphql = require('graphql');

const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLSchema } = graphql;

// dummy data
let verbs = [
	{ spanishVerb: 'abandonar', tense: 'Presente', id: 1 },
	{ spanishVerb: 'abandonar', tense: 'Futuro', id: 2 },
	{ spanishVerb: 'abandonar', tense: 'Pretérito', id: 3 }
];

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
			resolve(parent, args) {
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
