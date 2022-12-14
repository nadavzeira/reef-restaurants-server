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

export type CouponType = 'percentage' | 'sum' | '';

@Entity()
@ObjectType()
export class Coupon {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: Guid;

  @Column()
  @Field(() => String, { description: "The coupon's type" })
  type: CouponType;

  @Column('int')
  @Field(() => Int, { description: "The coupon's discount" })
  discount: number;

  @ManyToMany(() => Storefront, (storefront) => storefront.coupons)
  storefronts: Storefront[];

  @ManyToOne(() => Order, (order) => order.coupons)
  order: Order;
}
