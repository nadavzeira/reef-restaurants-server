import { Test, TestingModule } from '@nestjs/testing';

import { MenuItemsResolver } from './menu-items.resolver';
import { MenuItemsService } from './menu-items.service';

describe('MenuItemsResolver', () => {
  let resolver: MenuItemsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuItemsResolver, MenuItemsService],
    }).compile();

    resolver = module.get<MenuItemsResolver>(MenuItemsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
