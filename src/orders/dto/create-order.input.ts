import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field(() => String, { description: "The order's storefront id" })
  storefrontId: string;
  @Field(() => String, { description: "The order's customer name" })
  customerName: string;
  @Field(() => String, { description: "The order's customer address" })
  customerAddress: string;
}
