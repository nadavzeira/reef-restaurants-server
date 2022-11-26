import { Field, InputType } from '@nestjs/graphql';
import { Guid } from 'guid-typescript';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@InputType()
export class CouponInput {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: Guid;
}
