import {
    DEFAULT_QUERY_COUNTRIES,
    DEFAULT_QUERY_COUNTRY,
    DEFAULT_QUERY_COUNTRY_WITH_MOST_CASES,
    DEFAULT_QUERY_COUNTRY_WITH_MOST_DEATHS,
    DEFAULT_QUERY_GLOBAL,
    DEFAULT_QUERY_STATE,
    DEFAULT_QUERY_STATES,
} from '@utils/consts';
import { ApolloServer } from 'apollo-server';
import { Request } from 'express';
import { resolve } from 'path';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';

export interface Context {
    req: Request;
}

export const createLocalServer = async () => {
    const schema = await buildSchema({
        resolvers: [__dirname + '/resolvers/**/*.{ts,js}'],
        emitSchemaFile: resolve(__dirname, 'schemas/schema.gql'),
        validate: false,
    });

    return new ApolloServer({
        schema,
        context: ({ req }) => ({ req } as Context),
        uploads: false,
        playground: {
            tabs: [
                {
                    endpoint: '',
                    name: 'By all countries',
                    headers: {},
                    query: DEFAULT_QUERY_COUNTRIES,
                },
                {
                    name: 'By a specific country',
                    headers: {},
                    query: DEFAULT_QUERY_COUNTRY,
                },
                {
                    name: 'By states in the US',
                    headers: {},
                    query: DEFAULT_QUERY_STATES,
                },
                {
                    name: 'By a specific state in the US',
                    headers: {},
                    query: DEFAULT_QUERY_STATE,
                },
                {
                    name: 'Sort by country with most cases',
                    headers: {},
                    query: DEFAULT_QUERY_COUNTRY_WITH_MOST_CASES,
                },
                {
                    name: 'Sort by country with most deaths',
                    headers: {},
                    query: DEFAULT_QUERY_COUNTRY_WITH_MOST_DEATHS,
                },
                {
                    name: 'By global total',
                    headers: {},
                    query: DEFAULT_QUERY_GLOBAL,
                },
            ],
        },
    });
};
