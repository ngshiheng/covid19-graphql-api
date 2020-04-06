import { Result } from '@entities/Result.entity';
import 'reflect-metadata';
import { Field, ObjectType } from 'type-graphql';

@ObjectType({ description: 'State object' })
export class State {
    @Field({ description: 'Name of the state' })
    state: string;

    @Field(() => Result, { description: 'Contains the result of the state' })
    result: Result;
}
