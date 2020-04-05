import { State } from '@entities/State.entity';
import { DATA_SOURCE_URL } from '@utils/consts';
import fetch from 'node-fetch';
import 'reflect-metadata';
import { Arg, Query, Resolver } from 'type-graphql';

@Resolver(State)
export class StateResolvers {
    @Query(() => State, {
        description:
            'Get cases, new cases, deaths, new deaths, and active cases for a state',
    })
    async state(@Arg('name') name: string): Promise<State> {
        try {
            const response = await fetch(`${DATA_SOURCE_URL}/states/${name}`);
            if (response.status !== 200) {
                throw new Error('State data not found, please try again');
            }
            const { state, ...data } = await response.json();
            return { state, result: { ...data } };
        } catch (error) {
            throw error;
        }
    }

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
            const results = await response.json();
            for (const { state, ...data } of results) {
                result.push({
                    state,
                    result: { ...data },
                });
            }
            return result;
        } catch (error) {
            throw error;
        }
    }
}
