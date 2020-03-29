import 'reflect-metadata';
import { Field, ObjectType } from 'type-graphql';

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

    @Field({ nullable: true })
    casesPerOneMillion?: number;

    @Field({ nullable: true })
    deathsPerOneMillion?: number;
}
