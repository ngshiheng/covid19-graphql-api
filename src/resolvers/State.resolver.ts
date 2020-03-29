import { State } from '@entities/State.entity';
import { DATA_SOURCE_URL } from '@utils/consts';
import fetch from 'node-fetch';
import 'reflect-metadata';
import { Query, Resolver } from 'type-graphql';

@Resolver(State)
export class StateResolvers {
    @Query(() => [State], {
        description:
            'Get stats on United States of America States with COVID-19, including cases, new cases, deaths, new deaths, and active cases',
    })
    async states(): Promise<State[]> {
        try {
            const result = [];
            const response = await fetch(`${DATA_SOURCE_URL}/states`);
            if (response.status !== 200) {
                throw new Error('States data not found, please try again');
            }
            const data = await response.json();
            for (const {
                state,
                cases,
                todayCases,
                deaths,
                todayDeaths,
                active,
            } of data) {
                result.push({
                    state,
                    result: {
                        cases,
                        todayCases,
                        deaths,
                        todayDeaths,
                        active,
                    },
                });
            }
            return result;
        } catch (error) {
            throw error;
        }
    }
}
