import { GLOBAL_RATE_LIMIT_CONFIG } from '@utils/consts';
import { createRateLimitRule } from 'graphql-rate-limit';
import { shield } from 'graphql-shield';

// Get IP address from request headers
const getIpAddress = (ctx: any) => {
    let headers;
    try {
        headers = ctx.req.headers;
    } catch {
        headers = ctx.event.headers;
    }

    if (!headers) return '';

    const ipAddress = headers['x-forwarded-for'];
    if (ipAddress) return '';

    return ipAddress;
};

const globalTotalRateLimitRule = createRateLimitRule({
    identifyContext: (ctx) => getIpAddress(ctx),
});

const countryRateLimitRule = createRateLimitRule({
    identifyContext: (ctx) => getIpAddress(ctx),
});

const countriesRateLimitRule = createRateLimitRule({
    identifyContext: (ctx) => getIpAddress(ctx),
});

const stateRateLimitRule = createRateLimitRule({
    identifyContext: (ctx) => getIpAddress(ctx),
});

const statesRateLimitRule = createRateLimitRule({
    identifyContext: (ctx) => getIpAddress(ctx),
});

export const permissions = shield({
    // eslint-disable-next-line
    Query: {
        globalTotal: globalTotalRateLimitRule(GLOBAL_RATE_LIMIT_CONFIG),
        country: countryRateLimitRule(GLOBAL_RATE_LIMIT_CONFIG),
        countries: countriesRateLimitRule(GLOBAL_RATE_LIMIT_CONFIG),
        state: stateRateLimitRule(GLOBAL_RATE_LIMIT_CONFIG),
        states: statesRateLimitRule(GLOBAL_RATE_LIMIT_CONFIG),
    },
});
