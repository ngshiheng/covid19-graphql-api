import 'reflect-metadata';
import { Field, ObjectType } from 'type-graphql';

@ObjectType({ description: 'Result object' })
export class Result {
    @Field({ description: 'Total number of confirmed cases' })
    cases: number;

    @Field({ description: 'Total number of confirmed cases reported today' })
    todayCases: number;

    @Field({ description: 'Total number of reported deaths' })
    deaths: number;

    @Field({ description: 'Total number of reported deaths today' })
    todayDeaths: number;

    @Field({ nullable: true, description: 'Total number of reported recovery' })
    recovered: number;

    @Field({ description: 'Total number of active cases' })
    active: number;

    @Field({ nullable: true, description: 'Total number of critical cases' })
    critical?: number;

    @Field({ nullable: true, description: 'Cases per one million' })
    casesPerOneMillion?: number;

    @Field({ nullable: true, description: 'Deaths per one million' })
    deathsPerOneMillion?: number;
}
