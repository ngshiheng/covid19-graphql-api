import { DEFAULT_QUERY_STATE, DEFAULT_QUERY_STATES } from '@utils/consts';
import { getClient } from '@utils/getClient';
import { gql } from 'apollo-boost';
import 'cross-fetch/polyfill';

const client = getClient();

describe('Queries', () => {
    it('state', async () => {
        const stateQuery = gql`
            ${DEFAULT_QUERY_STATE}
        `;
        const { errors } = await client.query({
            query: stateQuery,
        });
        expect(errors).toBeUndefined();
    });

    it('states', async () => {
        const statesQuery = gql`
            ${DEFAULT_QUERY_STATES}
        `;
        const { errors } = await client.query({
            query: statesQuery,
        });
        expect(errors).toBeUndefined();
    });
});
