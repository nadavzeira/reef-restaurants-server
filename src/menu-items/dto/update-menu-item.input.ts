import { CreateMenuItemInput } from './create-menu-item.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMenuItemInput extends PartialType(CreateMenuItemInput) {
  @Field(() => String)
  id: string;
}
