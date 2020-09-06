import { DATA_SOURCE_URL } from '@utils/consts';
import { RESTDataSource } from 'apollo-datasource-rest';

export class DiseasesAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = DATA_SOURCE_URL;
    }

    async getAll() {
        const { updated, ...data } = await this.get(`covid-19/all`);
        return { updated: new Date(updated), ...data };
    }

    async getStates(name: string) {
        if (name === undefined) {
            const result = [];

            const response = await this.get(`covid-19/states`);

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
        } else {
            const { updated, state, ...data } = await this.get(
                `covid-19/states/${name}`,
            );

            return {
                state,
                result: {
                    updated: new Date(updated),
                    ...data,
                },
            };
        }
    }
}
