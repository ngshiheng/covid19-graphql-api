import 'reflect-metadata';
import { Field, Float, ID, ObjectType } from 'type-graphql';
import { Result } from './Result.entity';

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
