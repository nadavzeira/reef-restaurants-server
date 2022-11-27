import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Guid } from 'guid-typescript';
import { typeOrmModuleOptions } from 'src/app.module';
import { FindManyOptions, Repository } from 'typeorm';
import { MenuItem } from './entities/menu-item.entity';
import menuItemsMock from './entities/menu-items.mock';

import { MenuItemsService } from './menu-items.service';

describe('MenuItemsService', () => {
  let service: MenuItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(typeOrmModuleOptions)],
      providers: [
        MenuItemsService,
        {
          provide: getRepositoryToken(MenuItem),
          useValue: createMock<Repository<MenuItem>>({
            find: (_?: FindManyOptions<MenuItem>): Promise<MenuItem[]> => {
              return Promise.resolve(menuItemsMock);
            },
          }),
        },
      ],
    }).compile();

    service = module.get<MenuItemsService>(MenuItemsService);
  });

  it('should have a findAllByStorefront function', () => {
    expect(service.findAllByStorefront).toBeDefined();
  });

  it('should find all menu items with storefront id of "7dad9a03-ecfb-4380-b41a-fb1e3be2d1c3"', () => {
    const storefrontId: Guid = Guid.parse(
      '7dad9a03-ecfb-4380-b41a-fb1e3be2d1c3',
    );

    expect(service.findAllByStorefront(storefrontId)).resolves.toHaveLength(4);
  });
});
