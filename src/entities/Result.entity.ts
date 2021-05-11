import 'reflect-metadata';
import { Field, Float, ObjectType } from 'type-graphql';

@ObjectType({ description: 'Result object' })
export class Result {
    @Field({ nullable: true, description: 'Last updated date' })
    updated?: Date;

    @Field(() => Float, { description: 'Total number of confirmed cases' })
    cases: number;

    @Field(() => Float, {
        description: 'Total number of confirmed cases reported today',
    })
    todayCases: number;

    @Field(() => Float, { description: 'Total number of reported deaths' })
    deaths: number;

    @Field(() => Float, {
        description: 'Total number of reported deaths today',
    })
    todayDeaths: number;

    @Field(() => Float, {
        nullable: true,
        description: 'Total number of reported recovery',
    })
    recovered: number;

    @Field(() => Float, {
        description: 'Total number of recovered cases reported today',
    })
    todayRecovered: number;

    @Field(() => Float, { description: 'Total number of active cases' })
    active: number;

    @Field(() => Float, {
        nullable: true,
        description: 'Total number of critical cases',
    })
    critical?: number;

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
        description: 'Total number of tests conducted',
    })
    tests?: number;

    @Field(() => Float, {
        nullable: true,
        description: 'Tests per one million',
    })
    testsPerOneMillion?: number;

    @Field(() => Float, {
        nullable: true,
        description: 'Total number of affected population',
    })
    population?: number;

    @Field(() => Float, {
        nullable: true,
        description: 'Active cases per one million',
    })
    activePerOneMillion?: number;

    @Field(() => Float, {
        nullable: true,
        description: 'Recovered cases per one million',
    })
    recoveredPerOneMillion?: number;

    @Field(() => Float, {
        nullable: true,
        description: 'Critical cases per one million',
    })
    criticalPerOneMillion?: number;

    @Field(() => Float, {
        nullable: true,
        description: 'Total number of affected countries',
    })
    affectedCountries?: number;
}
