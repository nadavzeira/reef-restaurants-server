import { ObjectType, Field } from '@nestjs/graphql';
import { PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: "The order's ID" })
  id: string;
  @Column()
  @Field(() => String, { description: "The order's storefront id" })
  storefrontId: string;
  @Column()
  @Field(() => String, { description: "The order's customer name" })
  customerName: string;
  @Column()
  @Field(() => String, { description: "The order's customer address" })
  customerAddress: string;
}
