import { IDataSources } from '@datasources/diseases';
import {
    State,
    StateFilterInput,
    StateSortInput,
} from '@entities/State.entity';
import { ApolloError } from 'apollo-server';
import 'reflect-metadata';
import { Arg, Args, Ctx, Query, Resolver } from 'type-graphql';

@Resolver(State)
export class StateResolvers {
    @Query(() => State, {
        description:
            'Get cases, new cases, deaths, new deaths, and active cases for a state',
    })
    async state(
        @Ctx() { dataSources }: IDataSources,
        @Arg('name') name: string,
        @Args() filterBy: StateFilterInput,
    ): Promise<State> {
        try {
            return dataSources.diseases.getState(name, filterBy);
        } catch (error) {
            throw new ApolloError(error);
        }
    }

    @Query(() => [State], {
        description:
            'Get stats on United States of America States with COVID-19, including cases, new cases, deaths, new deaths, and active cases',
    })
    async states(
        @Ctx() { dataSources }: IDataSources,
        @Args() sortBy: StateSortInput,
        @Args() filterBy: StateFilterInput,
    ): Promise<State[]> {
        try {
            return dataSources.diseases.getStates(filterBy, sortBy);
        } catch (error) {
            throw new ApolloError(error);
        }
    }
}
