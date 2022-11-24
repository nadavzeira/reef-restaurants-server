import { Field, InputType, Int } from '@nestjs/graphql';
import { Guid } from 'guid-typescript';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@InputType()
export class MenuItemInput {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: "The menu item's ID" })
  id: Guid;

  @Column()
  @Field(() => String, { description: "The menu item's name" })
  name?: string;

  @Column()
  @Field(() => Int, { description: "The menu item's price" })
  price?: number;
}
