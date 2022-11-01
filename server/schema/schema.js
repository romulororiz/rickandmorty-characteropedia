const axios = require('axios');
const {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString,
	GraphQLSchema,
	GraphQLList,
} = require('graphql');

const ResultsType = new GraphQLObjectType({
	name: 'Results',
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

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		characters: {
			type: new GraphQLList(ResultsType),
			resolve(parent, args) {
				return axios
					.get('https://rickandmortyapi.com/api/character')
					.then(res => res.data.results);
			},
		},
		infoALL: {
			type: InfoType,
			resolve(parent, args) {
				return axios
					.get('https://rickandmortyapi.com/api/character')
					.then(res => res.data.info);
			},
		},
		character: {
			type: new GraphQLList(ResultsType),
			args: { name: { type: GraphQLString } },
			resolve(parent, args) {
				return axios
					.get(`https://rickandmortyapi.com/api/character?name=${args.name}`)
					.then(res => res.data.results);
			},
		},
		infoCharacter: {
			type: InfoType,
			args: { name: { type: GraphQLString } },
			resolve(parent, args) {
				return axios
					.get(`https://rickandmortyapi.com/api/character?name=${args.name}`)
					.then(res => res.data.info);
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});
