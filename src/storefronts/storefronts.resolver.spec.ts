import { Test, TestingModule } from '@nestjs/testing';
import { StorefrontsResolver } from './storefronts.resolver';
import { StorefrontsService } from './storefronts.service';

describe('StorefrontsResolver', () => {
  let resolver: StorefrontsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StorefrontsResolver, StorefrontsService],
    }).compile();

    resolver = module.get<StorefrontsResolver>(StorefrontsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
