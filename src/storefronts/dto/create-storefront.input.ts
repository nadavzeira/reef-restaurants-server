import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateStorefrontInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
