import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateStorefrontInput } from './dto/create-storefront.input';
import { UpdateStorefrontInput } from './dto/update-storefront.input';
import { Storefront } from './entities/storefront.entity';
import { StorefrontsService } from './storefronts.service';

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
  findOne(@Args('id', { type: () => String }) id: Guid) {
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
  removeStorefront(@Args('id', { type: () => String }) id: Guid) {
    return this.storefrontsService.remove(id);
  }

  @Query(() => [Storefront], { name: 'storefrontsByZipCode' })
  findByZipCode(@Args('zipCode', { type: () => Int }) zipCode: number) {
    const storefronts = this.storefrontsService.findByZipCode(zipCode);

    return storefronts;
  }
}
