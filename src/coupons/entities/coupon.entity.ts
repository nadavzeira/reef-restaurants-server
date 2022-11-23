import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

import { CouponType } from './couponsModels';

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
