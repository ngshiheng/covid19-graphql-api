import 'reflect-metadata';
import { Field, Float, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class CountryInfo {
    @Field(() => ID, { nullable: true })
    _id: string;

    @Field(() => Float, { nullable: true })
    lat: number;

    @Field(() => Float)
    long: number;

    @Field()
    flag: string;

    @Field({ nullable: true })
    iso3: string;

    @Field({ nullable: true })
    iso2: string;
}

@ObjectType()
export class Result {
    @Field()
    cases: number;

    @Field()
    todayCases: number;

    @Field()
    deaths: number;

    @Field()
    todayDeaths: number;

    @Field()
    recovered: number;

    @Field()
    active: number;

    @Field()
    critical?: number;

    @Field()
    casesPerOneMillion?: number;

    @Field()
    deathsPerOneMillion?: number;
}

@ObjectType()
export class Country {
    @Field()
    country: string;

    @Field()
    countryInfo: CountryInfo;

    @Field(() => Result)
    result: Result;
}

@ObjectType()
export class State {
    @Field()
    state: string;

    @Field(() => Result)
    result: Result;
}
