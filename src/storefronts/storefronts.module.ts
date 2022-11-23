import { Storefront } from './entities/storefront.entity';
import { Module } from '@nestjs/common';
import { StorefrontsService } from './storefronts.service';
import { StorefrontsResolver } from './storefronts.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Storefront])],
  providers: [StorefrontsResolver, StorefrontsService],
})
export class StorefrontsModule {}
