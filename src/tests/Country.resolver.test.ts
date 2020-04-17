import {
    DEFAULT_QUERY_COUNTRIES,
    DEFAULT_QUERY_COUNTRY,
    DEFAULT_QUERY_COUNTRY_WITH_MOST_CASES,
    DEFAULT_QUERY_GLOBAL,
} from '@utils/consts';
import { getClient } from '@utils/getClient';
import { gql } from 'apollo-boost';
import 'cross-fetch/polyfill';

const client = getClient();

describe('Queries', () => {
    it('globalTotal', async () => {
        const globalTotalQuery = gql`
            ${DEFAULT_QUERY_GLOBAL}
        `;
        const { errors } = await client.query({
            query: globalTotalQuery,
        });
        expect(errors).toBeUndefined();
    });

    it('country', async () => {
        const countryQuery = gql`
            ${DEFAULT_QUERY_COUNTRY}
        `;
        const { errors } = await client.query({
            query: countryQuery,
        });
        expect(errors).toBeUndefined();
    });

    it('countries', async () => {
        const countriesQuery = gql`
            ${DEFAULT_QUERY_COUNTRIES}
        `;
        const { errors } = await client.query({
            query: countriesQuery,
        });
        expect(errors).toBeUndefined();
    });

    it('countries with sortBy', async () => {
        const countriesQuery = gql`
            ${DEFAULT_QUERY_COUNTRY_WITH_MOST_CASES}
        `;
        const { errors } = await client.query({
            query: countriesQuery,
        });
        expect(errors).toBeUndefined();
    });
});
