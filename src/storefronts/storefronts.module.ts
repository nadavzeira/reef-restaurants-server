import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Storefront } from './entities/storefront.entity';
import { StorefrontsResolver } from './storefronts.resolver';
import { StorefrontsService } from './storefronts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Storefront])],
  providers: [StorefrontsResolver, StorefrontsService],
})
export class StorefrontsModule {}
