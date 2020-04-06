import 'reflect-metadata';
import { Field, Float, Int, ObjectType } from 'type-graphql';

@ObjectType({ description: 'Result object' })
export class Result {
    @Field(() => Int, { description: 'Total number of confirmed cases' })
    cases: number;

    @Field(() => Int, {
        description: 'Total number of confirmed cases reported today',
    })
    todayCases: number;

    @Field(() => Int, { description: 'Total number of reported deaths' })
    deaths: number;

    @Field(() => Int, { description: 'Total number of reported deaths today' })
    todayDeaths: number;

    @Field(() => Int, {
        nullable: true,
        description: 'Total number of reported recovery',
    })
    recovered: number;

    @Field(() => Int, { description: 'Total number of active cases' })
    active: number;

    @Field(() => Int, {
        nullable: true,
        description: 'Total number of critical cases',
    })
    critical?: number;

    @Field(() => Int, {
        nullable: true,
        description: 'Total number of tests conducted',
    })
    tests?: number;

    @Field(() => Float, {
        nullable: true,
        description: 'Cases per one million',
    })
    casesPerOneMillion?: number;

    @Field(() => Float, {
        nullable: true,
        description: 'Deaths per one million',
    })
    deathsPerOneMillion?: number;

    @Field(() => Float, {
        nullable: true,
        description: 'Tests per one million',
    })
    testsPerOneMillion?: number;

    @Field({ nullable: true, description: 'Last updated date' })
    updated?: Date;

    @Field(() => Int, {
        nullable: true,
        description: 'Total number of affected countries',
    })
    affectedCountries?: number;
}
