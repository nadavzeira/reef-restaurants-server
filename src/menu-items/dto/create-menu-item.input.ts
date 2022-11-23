import { Field, InputType, Int } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreateMenuItemInput {
  @Column()
  @Field(() => String, { description: "The menu item's name" })
  name: string;
  @Column()
  @Field(() => Int, { description: "The menu item's price" })
  price: number;
}
