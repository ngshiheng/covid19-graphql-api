import { Country } from '@entities/Country.entity';
import { DATA_SOURCE_URL } from '@utils/consts';
import fetch from 'node-fetch';
import 'reflect-metadata';
import { Arg, Query, Resolver } from 'type-graphql';

@Resolver(Country)
export class CountryResolvers {
    @Query(() => Country)
    async country(@Arg('name') name: string): Promise<Country> {
        try {
            const response = await fetch(
                `${DATA_SOURCE_URL}/countries/${name}`,
            );
            if (response.status !== 200) {
                throw new Error('Country data not found, please try again');
            }
            const {
                country,
                countryInfo,
                cases,
                todayCases,
                deaths,
                todayDeaths,
                recovered,
                active,
                critical,
                casesPerOneMillion,
                deathsPerOneMillion,
            } = await response.json();
            return {
                country,
                countryInfo,
                result: {
                    cases,
                    todayCases,
                    deaths,
                    todayDeaths,
                    recovered,
                    active,
                    critical,
                    casesPerOneMillion,
                    deathsPerOneMillion,
                },
            };
        } catch (error) {
            throw error;
        }
    }

    @Query(() => [Country])
    async countries(): Promise<Country[]> {
        try {
            const result = [];
            const response = await fetch(`${DATA_SOURCE_URL}/countries/`);
            if (response.status !== 200) {
                throw new Error(
                    'An unknown error has occurred, please try again',
                );
            }
            const data = await response.json();
            for (const {
                country,
                countryInfo,
                cases,
                todayCases,
                deaths,
                todayDeaths,
                recovered,
                active,
                critical,
                casesPerOneMillion,
                deathsPerOneMillion,
            } of data) {
                result.push({
                    country,
                    countryInfo,
                    result: {
                        cases,
                        todayCases,
                        deaths,
                        todayDeaths,
                        recovered,
                        active,
                        critical,
                        casesPerOneMillion,
                        deathsPerOneMillion,
                    },
                });
            }
            return result;
        } catch (error) {
            throw error;
        }
    }
}
