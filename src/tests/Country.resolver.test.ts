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
    afterAll(() => {
        client.stop();
    });
    it('globalTotal', async () => {
        const globalTotalQuery = gql`
            ${DEFAULT_QUERY_GLOBAL}
        `;
        const { errors, data } = await client.query({
            query: globalTotalQuery,
        });
        expect(errors).toBeUndefined();
        expect(data).toHaveProperty('globalTotal');
        expect(data.globalTotal).toEqual(
            expect.objectContaining({
                affectedCountries: expect.any(Number),
                tests: expect.any(Number),
                cases: expect.any(Number),
                todayCases: expect.any(Number),
                deaths: expect.any(Number),
                todayDeaths: expect.any(Number),
                recovered: expect.any(Number),
                active: expect.any(Number),
                critical: expect.any(Number),
                casesPerOneMillion: expect.any(Number),
                deathsPerOneMillion: expect.any(Number),
                testsPerOneMillion: expect.any(Number),
            }),
        );
    });

    it('country', async () => {
        const countryQuery = gql`
            ${DEFAULT_QUERY_COUNTRY}
        `;
        const { errors, data } = await client.query({
            query: countryQuery,
        });
        expect(errors).toBeUndefined();
        expect(data).toHaveProperty('country');
        expect(data.country).toMatchObject({ country: 'Malaysia' });
        expect(data.country).toHaveProperty('countryInfo');
        expect(data.country).toMatchObject({ continent: 'Asia' });
        expect(data.country.countryInfo).toEqual(
            expect.objectContaining({
                _id: expect.any(String),
                lat: expect.any(Number),
                long: expect.any(Number),
                flag: expect.any(String),
                iso2: expect.any(String),
                iso3: expect.any(String),
            }),
        );
        expect(data.country).toHaveProperty('result');
        expect(data.country.result).toEqual(
            expect.objectContaining({
                tests: expect.any(Number),
                cases: expect.any(Number),
                todayCases: expect.any(Number),
                deaths: expect.any(Number),
                todayDeaths: expect.any(Number),
                recovered: expect.any(Number),
                active: expect.any(Number),
                critical: expect.any(Number),
                casesPerOneMillion: expect.any(Number),
                deathsPerOneMillion: expect.any(Number),
                testsPerOneMillion: expect.any(Number),
            }),
        );
    });

    it('countries', async () => {
        const countriesQuery = gql`
            ${DEFAULT_QUERY_COUNTRIES}
        `;
        const { errors, data } = await client.query({
            query: countriesQuery,
        });
        expect(errors).toBeUndefined();
        expect(data).toHaveProperty('countries');
        expect(data.countries).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    country: expect.any(String),
                    countryInfo: expect.objectContaining({
                        _id: expect.any(String),
                        lat: expect.any(Number),
                        long: expect.any(Number),
                        flag: expect.any(String),
                        iso2: expect.any(String),
                        iso3: expect.any(String),
                    }),
                    continent: expect.any(String),
                    result: expect.objectContaining({
                        tests: expect.any(Number),
                        cases: expect.any(Number),
                        todayCases: expect.any(Number),
                        deaths: expect.any(Number),
                        todayDeaths: expect.any(Number),
                        recovered: expect.any(Number),
                        active: expect.any(Number),
                        critical: expect.any(Number),
                        casesPerOneMillion: expect.any(Number),
                        deathsPerOneMillion: expect.any(Number),
                        testsPerOneMillion: expect.any(Number),
                    }),
                }),
            ]),
        );
    });

    it('countries with sortBy', async () => {
        const countriesQuery = gql`
            ${DEFAULT_QUERY_COUNTRY_WITH_MOST_CASES}
        `;
        const { errors, data } = await client.query({
            query: countriesQuery,
        });
        expect(errors).toBeUndefined();
        expect(data).toHaveProperty('countries');
        expect(data.countries).toBeInstanceOf(Array);
    });
});
