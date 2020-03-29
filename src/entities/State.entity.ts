import { Result } from '@entities/Result.entity';
import 'reflect-metadata';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class State {
    @Field()
    state: string;

    @Field(() => Result)
    result: Partial<Result>;
}
