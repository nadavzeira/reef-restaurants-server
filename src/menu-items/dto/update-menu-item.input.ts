import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Guid } from 'guid-typescript';

import { CreateMenuItemInput } from './create-menu-item.input';

@InputType()
export class UpdateMenuItemInput extends PartialType(CreateMenuItemInput) {
  @Field(() => String)
  id: Guid;
}
