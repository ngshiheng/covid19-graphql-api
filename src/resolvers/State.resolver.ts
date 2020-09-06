import { State } from '@entities/State.entity';
import { ApolloError } from 'apollo-server';
import 'reflect-metadata';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';

@Resolver(State)
export class StateResolvers {
    @Query(() => State, {
        description:
            'Get cases, new cases, deaths, new deaths, and active cases for a state',
    })
    async state(
        @Ctx() { dataSources }: any,
        @Arg('name') name: string,
    ): Promise<State> {
        try {
            return dataSources.diseases.getState(name);
        } catch (error) {
            throw new ApolloError(error);
        }
    }

    @Query(() => [State], {
        description:
            'Get stats on United States of America States with COVID-19, including cases, new cases, deaths, new deaths, and active cases',
    })
    async states(@Ctx() { dataSources }: any): Promise<State[]> {
        try {
            return dataSources.diseases.getStates();
        } catch (error) {
            throw new ApolloError(error);
        }
    }
}
