import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Guid } from 'guid-typescript';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { MenuItem } from 'src/menu-items/entities/menu-item.entity';
import { Order } from 'src/orders/entities/order.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Base64, imageTypes } from './storefrontModels';

@Entity()
@ObjectType()
export class Storefront {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: Guid;

  @Column()
  @Field(() => String, { description: "The storefront's name" })
  name: string;

  @Column()
  @Field(() => String, { description: "The storefront's address" })
  address: string;

  @Column('bytea')
  @Field(() => [Int], {
    description: 'An image of the storefront',
  })
  image: Uint8Array;

  @Column('int', { array: true })
  @Field(() => [Int], {
    description: "A list of zipcodes in the storefront's coverage area",
  })
  zipCodes: number[];

  @OneToMany(() => Order, (order) => order.storefront)
  orders: Order[];

  @OneToMany(() => MenuItem, (menuItem) => menuItem.storefront)
  menuItems: MenuItem[];

  @ManyToMany(() => Coupon, (coupon) => coupon.storefronts)
  @JoinTable()
  coupons: Coupon[];
}
