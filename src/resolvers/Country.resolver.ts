import { Country, SortInput } from '@entities/Country.entity';
import { Result } from '@entities/Result.entity';
import { DATA_SOURCE_URL } from '@utils/consts';
import fetch from 'node-fetch';
import 'reflect-metadata';
import { Arg, Args, Query, Resolver } from 'type-graphql';

@Resolver(Country)
export class CountryResolvers {
    @Query(() => Result, {
        description:
            'Get global stats: cases, deaths, recovered, time last updated, and active cases',
    })
    async globalTotal(): Promise<Result> {
        try {
            const response = await fetch(`${DATA_SOURCE_URL}/all`);
            if (response.status !== 200) {
                throw new Error(
                    'An unknown error has occurred, please try again later',
                );
            }
            const { updated, ...data } = await response.json();
            return { updated: new Date(updated), ...data };
        } catch (error) {
            throw error;
        }
    }

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
                updated,
                ...data
            } = await response.json();
            return {
                country,
                countryInfo,
                result: {
                    updated: new Date(updated),
                    ...data,
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
                    'An unknown error has occurred, please try again later',
                );
            }
            const results = await response.json();
            for (const { country, countryInfo, updated, ...data } of results) {
                result.push({
                    country,
                    countryInfo,
                    result: {
                        updated: new Date(updated),
                        ...data,
                    },
                });
            }
            return result;
        } catch (error) {
            throw error;
        }
    }

    @Query(() => [Country], {
        description:
            'Returns a JSON array with an element for each country that has stats available. This includes iso codes, lat/long, a link to the country flag, cases, new cases, deaths, new deaths, recovered, active cases, critical cases, and cases/deaths per one million people',
    })
    async yesterday(@Args() { sortBy }: SortInput): Promise<Country[]> {
        try {
            const result = [];
            const response = await fetch(
                `${DATA_SOURCE_URL}/countries?sort=${sortBy}`,
            );
            if (response.status !== 200) {
                throw new Error(
                    'An unknown error has occurred, please try again later',
                );
            }
            const results = await response.json();
            for (const { country, countryInfo, updated, ...data } of results) {
                result.push({
                    country,
                    countryInfo,
                    result: {
                        updated: new Date(updated),
                        ...data,
                    },
                });
            }
            return result;
        } catch (error) {
            throw error;
        }
    }
}
