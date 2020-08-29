import { DEFAULT_QUERY_STATE, DEFAULT_QUERY_STATES } from '@utils/consts';
import { getClient } from '@utils/getClient';
import { gql } from 'apollo-boost';
import 'cross-fetch/polyfill';

const client = getClient();

describe('Queries', () => {
    afterAll(() => {
        client.stop();
    });
    it('state', async () => {
        const stateQuery = gql`
            ${DEFAULT_QUERY_STATE}
        `;
        const { errors, data } = await client.query({
            query: stateQuery,
        });
        expect(errors).toBeUndefined();
        expect(data).toHaveProperty('state');
        expect(data.state).toMatchObject({ state: 'New York' });
        expect(data.state).toHaveProperty('result');
        expect(data.state.result).toEqual(
            expect.objectContaining({
                population: expect.any(Number),
                active: expect.any(Number),
                tests: expect.any(Number),
                cases: expect.any(Number),
                todayCases: expect.any(Number),
                deaths: expect.any(Number),
                todayDeaths: expect.any(Number),
                casesPerOneMillion: expect.any(Number),
                deathsPerOneMillion: expect.any(Number),
                testsPerOneMillion: expect.any(Number),
                updated: expect.any(String),
            }),
        );
    });

    it('states', async () => {
        const statesQuery = gql`
            ${DEFAULT_QUERY_STATES}
        `;
        const { errors, data } = await client.query({
            query: statesQuery,
        });
        expect(errors).toBeUndefined();
        expect(data).toHaveProperty('states');
        expect(data.states).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    result: expect.objectContaining({
                        population: expect.any(Number),
                        active: expect.any(Number),
                        tests: expect.any(Number),
                        cases: expect.any(Number),
                        todayCases: expect.any(Number),
                        deaths: expect.any(Number),
                        todayDeaths: expect.any(Number),
                        casesPerOneMillion: expect.any(Number),
                        deathsPerOneMillion: expect.any(Number),
                        testsPerOneMillion: expect.any(Number),
                        updated: expect.any(String),
                    }),
                }),
            ]),
        );
    });
});
