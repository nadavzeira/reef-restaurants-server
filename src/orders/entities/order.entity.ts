import { Field, ObjectType } from '@nestjs/graphql';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { MenuItem } from 'src/menu-items/entities/menu-item.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Storefront } from './../../storefronts/entities/storefront.entity';

@Entity()
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: "The order's ID" })
  id: string;

  @Column()
  @Field(() => String, { description: "The order's customer name" })
  customerName: string;

  @Column()
  @Field(() => String, { description: "The order's customer address" })
  customerAddress: string;

  // @OneToOne(() => Storefront)
  // @JoinColumn()
  // storefront: Storefront;

  @ManyToOne(() => Storefront, (storefront) => storefront.menuItems)
  storefront: Storefront;

  @ManyToMany(() => MenuItem, (menuItem) => menuItem.orders)
  @JoinTable()
  menuItems: MenuItem[];

  @OneToMany(() => Coupon, (coupon) => coupon.order)
  coupons: Coupon[];
}
