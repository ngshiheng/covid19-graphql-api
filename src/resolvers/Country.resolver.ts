import { Country, SortInput } from '@entities/Country.entity';
import { DATA_SOURCE_URL } from '@utils/consts';
import fetch from 'node-fetch';
import 'reflect-metadata';
import { Arg, Args, Query, Resolver } from 'type-graphql';

@Resolver(Country)
export class CountryResolvers {
    @Query(() => Country, {
        description:
            "Get the same data from the 'countries' query, but filter down to a specific country",
    })
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

    @Query(() => [Country], {
        description:
            'Returns a JSON array with an element for each country that has stats available. This includes iso codes, lat/long, a link to the country flag, cases, new cases, deaths, new deaths, recovered, active cases, critical cases, and cases/deaths per one million people',
    })
    async countries(@Args() { sortBy }: SortInput): Promise<Country[]> {
        try {
            const result = [];
            const response = await fetch(
                `${DATA_SOURCE_URL}/countries?sort=${sortBy}`,
            );
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
