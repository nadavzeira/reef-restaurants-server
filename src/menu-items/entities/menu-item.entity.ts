import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
export class MenuItem {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: "The menu item's ID" })
  id: string;
  @Column()
  @Field(() => String, { description: "The menu item's name" })
  name: string;
  @Column()
  @Field(() => Int, { description: "The menu item's price" })
  price: number;
}
