import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StorefrontsService } from './storefronts.service';
import { Storefront } from './entities/storefront.entity.new';
import { CreateStorefrontInput } from './dto/create-storefront.input';
import { UpdateStorefrontInput } from './dto/update-storefront.input';

@Resolver(() => Storefront)
export class StorefrontsResolver {
  constructor(private readonly storefrontsService: StorefrontsService) {}

  @Mutation(() => Storefront)
  createStorefront(
    @Args('createStorefrontInput') createStorefrontInput: CreateStorefrontInput,
  ) {
    return this.storefrontsService.create(createStorefrontInput);
  }

  @Query(() => [Storefront], { name: 'storefronts' })
  findAll() {
    return this.storefrontsService.findAll();
  }

  @Query(() => Storefront, { name: 'storefront' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.storefrontsService.findOne(id);
  }

  @Mutation(() => Storefront)
  updateStorefront(
    @Args('updateStorefrontInput') updateStorefrontInput: UpdateStorefrontInput,
  ) {
    return this.storefrontsService.update(
      updateStorefrontInput.id,
      updateStorefrontInput,
    );
  }

  @Mutation(() => Storefront)
  removeStorefront(@Args('id', { type: () => Int }) id: number) {
    return this.storefrontsService.remove(id);
  }
}
