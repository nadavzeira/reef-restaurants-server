import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Storefront {
  @Field(() => Int, { description: 'An example field' })
  exampleField: number;
}
