import { Result } from '@entities/Result.entity';
import 'reflect-metadata';
import {
    ArgsType,
    Field,
    Float,
    ID,
    ObjectType,
    registerEnumType,
} from 'type-graphql';

@ObjectType({ description: 'Contains the information of the country' })
export class CountryInfo {
    @Field(() => ID, {
        nullable: true,
        description: 'Unique ID of the country from the dataset',
    })
    _id: string;

    @Field(() => Float, { description: 'Latitude of the country' })
    lat: number;

    @Field(() => Float, { description: 'Longitude of the country' })
    long: number;

    @Field({ description: 'Image link to the country flag' })
    flag: string;

    @Field({
        nullable: true,
        description: "Country slug by its ISO3 like 'USA'",
    })
    iso3: string;

    @Field({
        nullable: true,
        description: "Country slug by its ISO2 like 'US'",
    })
    iso2: string;
}

@ObjectType({ description: 'Country object' })
export class Country {
    @Field({ description: 'Name of the country' })
    country: string;

    @Field({ description: 'Contains the information of the country ' })
    countryInfo: CountryInfo;

    @Field(() => Result, {
        description: 'Contains the results of the country',
    })
    result: Result;

    @Field({ description: 'Continent of the specific country' })
    continent: string;
}

@ArgsType()
export class CountryFilterInput {
    @Field(() => CountryResultParametersFilterInput, {
        nullable: true,
        description: 'Queries data reported a day ago or two days ago.',
    })
    filterBy?: CountryResultParametersFilterInput;
}

export enum CountryResultParametersFilterInput {
    yesterday = 'yesterday',
    twoDaysAgo = 'twoDaysAgo',
}

registerEnumType(CountryResultParametersFilterInput, {
    name: 'CountryResultParametersFilterInput',
    description: 'Filter parameters',
});

@ArgsType()
export class CountrySortInput {
    @Field(() => CountryResultParametersSortInput, {
        nullable: true,
        description:
            'Sort parameters for sorting response from countries query. Sorted by the highest number first',
    })
    sortBy?: CountryResultParametersSortInput;
}

export enum CountryResultParametersSortInput {
    cases = 'cases',
    todayCases = 'todayCases',
    deaths = 'deaths',
    todayDeaths = 'todayDeaths',
    recovered = 'recovered',
    active = 'active',
    critical = 'critical',
    casesPerOneMillion = 'casesPerOneMillion',
    deathsPerOneMillion = 'deathsPerOneMillion',
}

registerEnumType(CountryResultParametersSortInput, {
    name: 'CountryResultParametersSortInput',
    description: 'Sorting parameters',
});
