const axios = require('axios');
const {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString,
	GraphQLSchema,
	GraphQLList,
} = require('graphql');

const CharacterType = new GraphQLObjectType({
	name: 'Character',
	fields: () => ({
		id: { type: GraphQLInt },
		name: { type: GraphQLString },
		status: { type: GraphQLString },
		species: { type: GraphQLString },
		type: { type: GraphQLString },
		gender: { type: GraphQLString },
		origin: {
			type: OriginType,
		},
		location: {
			type: LocationType,
		},
		episode: { type: EpisodeType },
		image: { type: GraphQLString },
		url: { type: GraphQLString },
		created: { type: GraphQLString },
	}),
});

const InfoType = new GraphQLObjectType({
	name: 'Info',
	fields: () => ({
		count: { type: GraphQLInt },
		pages: { type: GraphQLInt },
		next: { type: GraphQLString },
		prev: { type: GraphQLString },
	}),
});

const OriginType = new GraphQLObjectType({
	name: 'Origin',
	fields: () => ({
		name: { type: GraphQLString },
		url: { type: GraphQLString },
	}),
});

const LocationType = new GraphQLObjectType({
	name: 'Location',
	fields: () => ({
		name: { type: GraphQLString },
		url: { type: GraphQLString },
	}),
});

const EpisodeType = new GraphQLList(GraphQLString);

const ResultType = new GraphQLObjectType({
	name: 'Result',
	fields: () => ({
		info: { type: InfoType },
		results: { type: new GraphQLList(CharacterType) },
	}),
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		characters: {
			type: ResultType,
			args: {
				name: { type: GraphQLString },
				status: { type: GraphQLString },
				gender: { type: GraphQLString },
				species: { type: GraphQLString },
			},
			resolve(parent, args) {
				return axios
					.get(
						`https://rickandmortyapi.com/api/character?name=${args.name}&status=${args.status}&gender=${args.gender}&species=${args.species}`
					)
					.then(res => res.data);
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});
