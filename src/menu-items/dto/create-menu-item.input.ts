import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateMenuItemInput {
  @Field(() => String, { description: "The menu item's name" })
  name: string;

  @Field(() => Int, { description: "The menu item's price" })
  price: number;
}
