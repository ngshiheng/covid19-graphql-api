require('reflect-metadata');
const { DiseasesAPI } = require('./bundle/datasources/diseases');
const { ApolloServer, ApolloError } = require('apollo-server-lambda');
const { buildSchema } = require('type-graphql');
const { CountryResolvers } = require('./bundle/resolvers/Country.resolver');
const { StateResolvers } = require('./bundle/resolvers/State.resolver');
const {
    DEFAULT_QUERY_COUNTRIES,
    DEFAULT_QUERY_COUNTRY,
    DEFAULT_QUERY_STATE,
    DEFAULT_QUERY_STATES,
    DEFAULT_QUERY_COUNTRY_WITH_MOST_CASES,
    DEFAULT_QUERY_COUNTRY_WITH_MOST_DEATHS,
    DEFAULT_QUERY_GLOBAL,
    SENTRY_DSN,
} = require('./bundle/utils/consts');
const Sentry = require('@sentry/node');

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

    Sentry.init({
        dsn: SENTRY_DSN,
        environment: process.env.NODE_ENV,
        tracesSampleRate: 1.0,
    });

    const server = new ApolloServer({
        schema,
        dataSources: () => ({
            diseases: new DiseasesAPI(),
        }),
        introspection: true,
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
                    name: 'By a specific state in the US',
                    headers: {},
                    query: DEFAULT_QUERY_STATE,
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
                {
                    endpoint,
                    name: 'By global total',
                    headers: {},
                    query: DEFAULT_QUERY_GLOBAL,
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
