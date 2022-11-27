import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOptions } from 'src/app.module';
import { CouponsModule } from 'src/coupons/coupons.module';
import { CouponsService } from 'src/coupons/coupons.service';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { MenuItem } from 'src/menu-items/entities/menu-item.entity';
import { MenuItemsModule } from 'src/menu-items/menu-items.module';
import { MenuItemsService } from 'src/menu-items/menu-items.service';
import { Order } from 'src/orders/entities/order.entity';
import { OrdersModule } from 'src/orders/orders.module';
import { OrdersService } from 'src/orders/orders.service';
import { Repository } from 'typeorm';

import { Storefront } from './entities/storefront.entity';
import storefrontsMock from './entities/storefronts.mock';
import { StorefrontsResolver } from './storefronts.resolver';
import { StorefrontsService } from './storefronts.service';

describe('StorefrontsResolver', () => {
  let resolver: StorefrontsResolver;

  const storefrontsService = {
    findAll: jest.fn(() => storefrontsMock),
    findAllByZipCode: jest.fn(() =>
      storefrontsMock.filter(({ zipCodes }) => zipCodes.includes(1)),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeOrmModuleOptions),
        OrdersModule,
        MenuItemsModule,
        CouponsModule,
      ],
      providers: [
        StorefrontsResolver,

        {
          provide: getRepositoryToken(Storefront),
          useValue: createMock<Repository<Storefront>>(),
        },
        {
          provide: getRepositoryToken(Order),
          useValue: createMock<Repository<Order>>(),
        },
        {
          provide: getRepositoryToken(MenuItem),
          useValue: createMock<Repository<MenuItem>>(),
        },
        {
          provide: getRepositoryToken(Coupon),
          useValue: createMock<Repository<Coupon>>(),
        },

        {
          provide: StorefrontsService,
          useValue: storefrontsService,
        },
        OrdersService,
        MenuItemsService,
        CouponsService,
      ],
    }).compile();

    resolver = module.get<StorefrontsResolver>(StorefrontsResolver);
  });

  it('should have a create function', () => {
    expect(resolver.createStorefront).toBeDefined();
  });

  it('should find all storefronts', () => {
    expect(
      (resolver.findAll() as unknown as Storefront[]).length,
    ).toBeGreaterThan(0);
  });

  it('should find all storefronts with a zip code of 1', () => {
    expect(
      (resolver.findAllByZipCode(1) as unknown as Storefront[]).length,
    ).toBeGreaterThan(0);
  });
});
