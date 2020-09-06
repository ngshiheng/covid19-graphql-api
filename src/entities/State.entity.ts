import { Result } from '@entities/Result.entity';
import 'reflect-metadata';
import { ArgsType, Field, ObjectType, registerEnumType } from 'type-graphql';

@ObjectType({ description: 'State object' })
export class State {
    @Field({ description: 'Name of the state' })
    state: string;

    @Field(() => Result, { description: 'Contains the result of the state' })
    result: Result;
}

@ArgsType()
export class StateFilterInput {
    @Field(() => StateResultParametersFilterInput, {
        nullable: true,
        description: 'Queries data reported a day ago or two days ago.',
    })
    filterBy?: StateResultParametersFilterInput;
}

export enum StateResultParametersFilterInput {
    yesterday = 'yesterday',
}

registerEnumType(StateResultParametersFilterInput, {
    name: 'StateResultParametersFilterInput',
    description: 'Filter parameters',
});

@ArgsType()
export class StateSortInput {
    @Field(() => StateResultParametersSortInput, {
        nullable: true,
        description:
            'Sort parameters for sorting response from states query. Sorted by the highest number first',
    })
    sortBy?: StateResultParametersSortInput;
}

export enum StateResultParametersSortInput {
    cases = 'cases',
    todayCases = 'todayCases',
    deaths = 'deaths',
    todayDeaths = 'todayDeaths',
    active = 'active',
}

registerEnumType(StateResultParametersSortInput, {
    name: 'StateResultParametersSortInput',
    description: 'Sorting parameters',
});
