import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Storefront } from 'src/storefronts/entities/storefront.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CouponType } from './couponsModels';

@Entity()
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

  @ManyToMany(() => Storefront, (storefront) => storefront.coupons)
  storefronts: Storefront[];
}
