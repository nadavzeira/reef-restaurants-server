import { Field, ObjectType } from '@nestjs/graphql';
import { Guid } from 'guid-typescript';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { MenuItem } from 'src/menu-items/entities/menu-item.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Storefront } from './../../storefronts/entities/storefront.entity';

@Entity()
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: "The order's ID" })
  id: Guid;

  @Column()
  @Field(() => String, { description: "The order's customer name" })
  customerName: string;

  @Column()
  @Field(() => String, { description: "The order's customer address" })
  customerAddress: string;

  @ManyToOne(() => Storefront, (storefront) => storefront.menuItems)
  storefront: Storefront;

  @ManyToMany(() => MenuItem, (menuItem) => menuItem.orders)
  @JoinTable()
  menuItems: MenuItem[];

  @OneToMany(() => Coupon, (coupon) => coupon.order)
  coupons: Coupon[];
}
