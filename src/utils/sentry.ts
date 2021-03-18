import * as Sentry from '@sentry/node';
import { ApolloError } from 'apollo-server';
import { PluginDefinition } from 'apollo-server-core';
import { GraphQLRequestContext } from 'apollo-server-types';
import gql from 'graphql-tag';

export const sentryPlugin: PluginDefinition = {
    // https://www.apollographql.com/docs/apollo-server/integrations/plugins/#request-lifecycle-event-flow
    requestDidStart(ctx: GraphQLRequestContext) {
        const transaction = Sentry.startTransaction({
            op: 'query',
            name: ctx.request.operationName,
        });

        const scope = Sentry.getCurrentHub().getScope();
        if (scope) {
            const query: any = gql`
                ${ctx.request.query}
            `;

            const transactionName = ctx.request.operationName
                ? ctx.request.operationName
                : query.definitions[0].selectionSet.selections[0].name.value;

            scope.setTransactionName(transactionName);

            scope.setTag('kind', ctx.operation.operation);
            scope.setExtra('query', ctx.request.query);
            scope.setExtra('variables', ctx.request.variables);
        }

        return {
            willSendResponse(_) {
                transaction.finish();
            },
            didEncounterErrors(ctx: GraphQLRequestContext) {
                // If we couldn't parse the operation, don't do anything here
                if (!ctx.operation) {
                    return;
                }

                for (const error of ctx.errors) {
                    // Only report internal server errors,
                    // all errors extending ApolloError should be user-facing
                    if (error instanceof ApolloError) {
                        continue;
                    }

                    // Add scoped report details and send to Sentry
                    Sentry.withScope((scope) => {
                        // Annotate whether failing operation was query/mutation/subscription

                        if (error.path) {
                            // We can also add the path as breadcrumb
                            scope.addBreadcrumb({
                                category: 'query-path',
                                message: error.path.join(' > '),
                                level: Sentry.Severity.Debug,
                            });
                        }
                        Sentry.captureException(error);
                    });
                }
            },
        };
    },
};
