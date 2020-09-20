import { IDataSources } from '@datasources/diseases';
import {
    Country,
    CountryFilterInput,
    CountrySortInput,
} from '@entities/Country.entity';
import { Result } from '@entities/Result.entity';
import { ApolloError } from 'apollo-server';
import 'reflect-metadata';
import { Arg, Args, Ctx, Query, Resolver } from 'type-graphql';

@Resolver(Country)
export class CountryResolvers {
    @Query(() => Result, {
        description:
            'Get global stats: cases, deaths, recovered, time last updated, and active cases',
    })
    async globalTotal(
        @Ctx() { dataSources }: IDataSources,
        @Args() filterBy: CountryFilterInput,
    ): Promise<Result> {
        try {
            return dataSources.diseases.getAll(filterBy);
        } catch (error) {
            throw new ApolloError(error);
        }
    }

    @Query(() => Country, {
        description:
            "Get the same data from the 'countries' query, but filter down to a specific country",
    })
    async country(
        @Ctx() { dataSources }: IDataSources,
        @Arg('name') name: string,
        @Args() filterBy: CountryFilterInput,
    ): Promise<Country> {
        try {
            return dataSources.diseases.getCountry(name, filterBy);
        } catch (error) {
            throw new ApolloError(error);
        }
    }

    @Query(() => [Country], {
        description:
            'Returns a JSON array with an element for each country that has stats available. This includes iso codes, lat/long, a link to the country flag, cases, new cases, deaths, new deaths, recovered, active cases, critical cases, and cases/deaths per one million people',
    })
    async countries(
        @Ctx() { dataSources }: IDataSources,
        @Args() sortBy: CountrySortInput,
        @Args() filterBy: CountryFilterInput,
    ): Promise<Country[]> {
        try {
            return dataSources.diseases.getCountries(filterBy, sortBy);
        } catch (error) {
            throw new ApolloError(error);
        }
    }
}
