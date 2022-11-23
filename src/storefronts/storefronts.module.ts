import { Module } from '@nestjs/common';
import { StorefrontsService } from './storefronts.service';
import { StorefrontsResolver } from './storefronts.resolver';

@Module({
  providers: [StorefrontsResolver, StorefrontsService],
})
export class StorefrontsModule {}
