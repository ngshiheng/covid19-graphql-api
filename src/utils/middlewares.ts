import { GLOBAL_RATE_LIMIT_CONFIG } from '@utils/consts';
import { createRateLimitRule } from 'graphql-rate-limit';
import { shield } from 'graphql-shield';

// Get IP address from request headers
const globalTotalRateLimitRule = createRateLimitRule({
    identifyContext: (ctx) => ctx.req.headers['x-forwarded-for'],
});

const countryRateLimitRule = createRateLimitRule({
    identifyContext: (ctx) => ctx.req.headers['x-forwarded-for'],
});

const countriesRateLimitRule = createRateLimitRule({
    identifyContext: (ctx) => ctx.req.headers['x-forwarded-for'],
});

const stateRateLimitRule = createRateLimitRule({
    identifyContext: (ctx) => ctx.req.headers['x-forwarded-for'],
});

const statesRateLimitRule = createRateLimitRule({
    identifyContext: (ctx) => ctx.req.headers['x-forwarded-for'],
});

export const permissions = shield({
    /*eslint-disable */
    Query: {
        globalTotal: globalTotalRateLimitRule(GLOBAL_RATE_LIMIT_CONFIG),
        country: countryRateLimitRule(GLOBAL_RATE_LIMIT_CONFIG),
        countries: countriesRateLimitRule(GLOBAL_RATE_LIMIT_CONFIG),
        state: stateRateLimitRule(GLOBAL_RATE_LIMIT_CONFIG),
        states: statesRateLimitRule(GLOBAL_RATE_LIMIT_CONFIG),
    },
});
