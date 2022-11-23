import { CouponType } from './couponsModels';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
export class Coupon {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: "The storefront's ID" })
  id: string;
  @Column()
  @Field(() => String /* TODO: Fix type*/, { description: "The coupon's type" })
  type: CouponType;
  @Column('int')
  @Field(() => Int, { description: "The coupon's discount" })
  discount: number;
}
