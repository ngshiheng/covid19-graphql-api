require('reflect-metadata');
const { ApolloServer } = require('apollo-server-lambda');
const { buildSchema } = require('type-graphql');
const { CountryResolvers } = require('./bundle/resolvers/Country.resolver');
const { StateResolvers } = require('./bundle/resolvers/State.resolver');
const {
    DEFAULT_QUERY_COUNTRIES,
    DEFAULT_QUERY_COUNTRY,
    DEFAULT_QUERY_STATES,
    DEFAULT_QUERY_COUNTRY_WITH_MOST_CASES,
    DEFAULT_QUERY_COUNTRY_WITH_MOST_DEATHS,
} = require('./bundle/utils/consts');

const endpoint = 'https://covid19-graphql.netlify.app/';

const runHandler = (event, context, handler) =>
    new Promise((resolve, reject) => {
        const callback = (error, body) =>
            error ? reject(error) : resolve(body);
        handler(event, context, callback);
    });

const run = async (event, context) => {
    const schema = await buildSchema({
        resolvers: [CountryResolvers, StateResolvers],
    });

    const server = new ApolloServer({
        schema,
        introspection: true,
        playground: {
            tabs: [
                {
                    endpoint,
                    name: 'By all countries',
                    query: DEFAULT_QUERY_COUNTRIES,
                },
                {
                    endpoint,
                    name: 'By a specific country',
                    query: DEFAULT_QUERY_COUNTRY,
                },
                {
                    endpoint,
                    name: 'By states in the US',
                    query: DEFAULT_QUERY_STATES,
                },
                {
                    endpoint,
                    name: 'Sort by country with most cases',
                    query: DEFAULT_QUERY_COUNTRY_WITH_MOST_CASES,
                },
                {
                    endpoint,
                    name: 'Sort by country with most deaths',
                    query: DEFAULT_QUERY_COUNTRY_WITH_MOST_DEATHS,
                },
            ],
        },
    });

    const handler = server.createHandler({
        cors: {
            origin: '*',
        },
    });

    const response = await runHandler(event, context, handler);
    return response;
};

exports.handler = run;

//  https://github.com/apollographql/apollo-server/issues/2179
//  https://github.com/apollographql/apollo-server/issues/2705
//  https://github.com/awslabs/aws-serverless-express/issues/234
