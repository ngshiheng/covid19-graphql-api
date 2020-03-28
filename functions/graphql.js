require('reflect-metadata');
const { ApolloServer } = require('apollo-server-lambda');
const { buildSchema } = require('type-graphql');
const { CountryResolvers } = require('./bundle/resolvers/Result.resolver');

const runHandler = (event, context, handler) =>
    new Promise((resolve, reject) => {
        const callback = (error, body) =>
            error ? reject(error) : resolve(body);
        handler(event, context, callback);
    });

const run = async (event, context) => {
    const schema = await buildSchema({
        resolvers: [CountryResolvers],
    });

    const server = new ApolloServer({
        schema,
        playground: true,
        introspection: true,
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
