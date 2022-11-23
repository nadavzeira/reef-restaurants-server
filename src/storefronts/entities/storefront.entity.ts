import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { MenuItem } from 'src/menu-items/entities/menu-item.entity';
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
  @Field(() => String, { description: "The storefront's ID" })
  id: string;

  @Column()
  @Field(() => String, { description: "The storefront's name" })
  name: string;

  @Column()
  @Field(() => String, { description: "The storefront's address" })
  address: string;

  @Column()
  @Field(() => String /* TODO: Fix type*/, {
    description: 'An image of the storefront',
  })
  image: Base64<imageTypes>;

  @Column('int', { array: true })
  @Field(() => [Int], {
    description: "A list of zipcodes in the storefront's coverage area",
  })
  zipCodes: number[];

  @OneToMany(() => MenuItem, (menuItem) => menuItem.storefront)
  menuItems: MenuItem[];

  @ManyToMany(() => Coupon, (coupon) => coupon.storefronts)
  @JoinTable()
  coupons: Coupon[];
}
