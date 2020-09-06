import { CountryFilterInput, CountrySortInput } from '@entities/Country.entity';
import { StateFilterInput, StateSortInput } from '@entities/State.entity';
import { DATA_SOURCE_URL } from '@utils/consts';
import { RESTDataSource } from 'apollo-datasource-rest';

export class DiseasesAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = DATA_SOURCE_URL;
    }

    async getAll({ filterBy }: CountryFilterInput) {
        const { updated, ...data } = await this.get(`covid-19/all`, {
            yesterday: filterBy === 'yesterday' ? true : false,
            twoDaysAgo: filterBy === 'twoDaysAgo' ? true : false,
        });
        return { updated: new Date(updated), ...data };
    }

    async getCountry(name: string, { filterBy }: CountryFilterInput) {
        const { updated, ...data } = await this.get(
            `covid-19/countries/${name}`,
            {
                yesterday: filterBy === 'yesterday' ? true : false,
                twoDaysAgo: filterBy === 'twoDaysAgo' ? true : false,
            },
        );

        return {
            result: {
                updated: new Date(updated),
                ...data,
            },
            ...data,
        };
    }

    async getCountries(
        { filterBy }: CountryFilterInput,
        { sortBy }: CountrySortInput,
    ) {
        const result = [];

        const response = await this.get(`covid-19/countries`, {
            sort: sortBy,
            yesterday: filterBy === 'yesterday' ? true : false,
            twoDaysAgo: filterBy === 'twoDaysAgo' ? true : false,
        });

        for (const { updated, ...data } of response) {
            result.push({
                result: {
                    updated: new Date(updated),
                    ...data,
                },
                ...data,
            });
        }
        return result;
    }

    async getState(name: string, { filterBy }: StateFilterInput) {
        const { updated, state, ...data } = await this.get(
            `covid-19/states/${name}`,
            {
                yesterday: filterBy === 'yesterday' ? true : false,
            },
        );

        return {
            state,
            result: {
                updated: new Date(updated),
                ...data,
            },
        };
    }

    async getStates(
        { filterBy }: StateFilterInput,
        { sortBy }: StateSortInput,
    ) {
        const result = [];

        const response = await this.get(`covid-19/states`, {
            sort: sortBy,
            yesterday: filterBy === 'yesterday' ? true : false,
        });

        for (const { updated, state, ...data } of response) {
            result.push({
                state,
                result: {
                    updated: new Date(updated),
                    ...data,
                },
            });
        }

        return result;
    }
}
