import { Field, InputType, Int } from '@nestjs/graphql';
import { Guid } from 'guid-typescript';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { CouponType } from './couponsModels';

@Entity()
@InputType()
export class CouponInput {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: Guid;

  @Column()
  @Field(() => String /* TODO: Fix type*/, { description: "The coupon's type" })
  type: CouponType;

  @Column('int')
  @Field(() => Int, { description: "The coupon's discount" })
  discount: number;
}
