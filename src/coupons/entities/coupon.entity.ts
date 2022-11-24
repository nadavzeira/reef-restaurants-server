import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Order } from 'src/orders/entities/order.entity';
import { Storefront } from 'src/storefronts/entities/storefront.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CouponType } from './couponsModels';

@Entity()
@ObjectType()
export class Coupon {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: "The storefront's ID" })
  id: Guid;

  @Column()
  @Field(() => String /* TODO: Fix type*/, { description: "The coupon's type" })
  type: CouponType;

  @Column('int')
  @Field(() => Int, { description: "The coupon's discount" })
  discount: number;

  @ManyToMany(() => Storefront, (storefront) => storefront.coupons)
  storefronts: Storefront[];

  @ManyToOne(() => Order, (order) => order.coupons)
  order: Order;
}
