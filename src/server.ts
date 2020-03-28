import { ApolloServer } from 'apollo-server';
import { resolve } from 'path';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';

export const createLocalServer = async () => {
    const schema = await buildSchema({
        resolvers: [__dirname + '/resolvers/**/*.{ts,js}'],
        emitSchemaFile: resolve(__dirname, 'schemas/schema.gql'),
    });
    return new ApolloServer({
        schema,
        uploads: false,
    });
};
