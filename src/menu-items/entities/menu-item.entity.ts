import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Guid } from 'guid-typescript';
import { Order } from 'src/orders/entities/order.entity';
import { Storefront } from 'src/storefronts/entities/storefront.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class MenuItem {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: Guid;

  @Column()
  @Field(() => String, { description: "The menu item's name" })
  name: string;

  @Column()
  @Field(() => Int, { description: "The menu item's price" })
  price: number;

  @ManyToOne(() => Storefront, (storefront) => storefront.menuItems)
  storefront: Storefront;

  @ManyToMany(() => Order, (order) => order.menuItems)
  orders: Order[];
}
