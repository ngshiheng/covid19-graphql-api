import * as Sentry from '@sentry/node';
import { ApolloError } from 'apollo-server';
import { PluginDefinition } from 'apollo-server-core';

export const sentryPerformancePlugin: PluginDefinition = {
    requestDidStart: (ctx) => {
        // Override transaction name with query/mutation name.
        // You'll need to send operationName along when making the query or mutation
        const scope = Sentry.getCurrentHub().getScope();
        if (scope && ctx.request.operationName) {
            scope.setTransactionName(ctx.request.operationName);
        }
    },
};

export const sentryIssuesPlugin: PluginDefinition = {
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
                        scope.setTag('kind', ctx.operation.operation);

                        // Log query and variables as extras (make sure to strip out sensitive data!)
                        scope.setExtra('query', ctx.request.query);
                        scope.setExtra('variables', ctx.request.variables);

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
};
