import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
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

  @OneToOne(() => Storefront)
  @JoinColumn()
  storefront: Storefront;

  @Column()
  @Field(() => String, { description: "The order's customer name" })
  customerName: string;

  @Column()
  @Field(() => String, { description: "The order's customer address" })
  customerAddress: string;
}
