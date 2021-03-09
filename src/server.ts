import { DiseasesAPI } from '@datasources/diseases';
import * as Sentry from '@sentry/node';
import {
    DEFAULT_QUERY_COUNTRIES,
    DEFAULT_QUERY_COUNTRY,
    DEFAULT_QUERY_COUNTRY_WITH_MOST_CASES,
    DEFAULT_QUERY_COUNTRY_WITH_MOST_DEATHS,
    DEFAULT_QUERY_GLOBAL,
    DEFAULT_QUERY_STATE,
    DEFAULT_QUERY_STATES,
    SENTRY_DSN,
} from '@utils/consts';
import { ApolloError, ApolloServer } from 'apollo-server';
import { Request } from 'express';
import { resolve } from 'path';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';

export interface IContext {
    req: Request;
}

export const createLocalServer = async (): Promise<ApolloServer> => {
    const schema = await buildSchema({
        resolvers: [__dirname + '/resolvers/**/*.{ts,js}'],
        emitSchemaFile: resolve(__dirname, 'schemas/schema.gql'),
        validate: false,
    });

    // Configure Sentry
    Sentry.init({
        dsn: SENTRY_DSN,
        environment: process.env.NODE_ENV,
        tracesSampleRate: 1.0,
    });
    return new ApolloServer({
        schema,
        dataSources: () => ({ diseases: new DiseasesAPI() }),
        context: ({ req }) => ({ req } as IContext),
        uploads: false,
        plugins: [
            {
                requestDidStart(_) {
                    /* Within this returned object, define functions that respond
                   to request-specific lifecycle events. */

                    return {
                        didEncounterErrors(ctx) {
                            // If we couldn't parse the operation, don't
                            // do anything here
                            if (!ctx.operation) {
                                return;
                            }

                            for (const err of ctx.errors) {
                                // Only report internal server errors,
                                // all errors extending ApolloError should be user-facing
                                if (err instanceof ApolloError) {
                                    continue;
                                }

                                // Add scoped report details and send to Sentry
                                Sentry.withScope((scope) => {
                                    // Annotate whether failing operation was query/mutation/subscription
                                    scope.setTag(
                                        'kind',
                                        ctx.operation.operation,
                                    );

                                    // Log query and variables as extras (make sure to strip out sensitive data!)
                                    scope.setExtra('query', ctx.request.query);
                                    scope.setExtra(
                                        'variables',
                                        ctx.request.variables,
                                    );

                                    if (err.path) {
                                        // We can also add the path as breadcrumb
                                        scope.addBreadcrumb({
                                            category: 'query-path',
                                            message: err.path.join(' > '),
                                            level: Sentry.Severity.Debug,
                                        });
                                    }

                                    Sentry.captureException(err);
                                });
                            }
                        },
                    };
                },
            },
        ],
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
