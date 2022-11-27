import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { Repository } from 'typeorm';

import { CouponsModule } from 'src/coupons/coupons.module';
import { CouponsService } from 'src/coupons/coupons.service';
import { MenuItemsModule } from 'src/menu-items/menu-items.module';
import { MenuItemsService } from 'src/menu-items/menu-items.service';
import { OrdersModule } from 'src/orders/orders.module';
import { OrdersService } from 'src/orders/orders.service';
import { StorefrontsResolver } from './storefronts.resolver';
import { StorefrontsService } from './storefronts.service';
import { Storefront } from './entities/storefront.entity';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { Order } from 'src/orders/entities/order.entity';
import { MenuItem } from 'src/menu-items/entities/menu-item.entity';
import { typeOrmModuleOptions } from 'src/app.module';
import storefrontsMock from './entities/storefronts.mock'

describe('StorefrontsResolver', () => {
  let resolver: StorefrontsResolver;

  let storefrontRepository: Repository<Storefront>;
  let orderRepository: Repository<Order>;
  let menuItemRepository: Repository<MenuItem>;
  let couponRepository: Repository<Coupon>;

  const storefrontsService = {
    findAll: jest.fn(() => (storefrontsMock)),
    findAllByZipCode: jest.fn(() => (storefrontsMock.filter(({ zipCodes }) => zipCodes.includes(1)))),
  }

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
          useValue: storefrontsService
        },
        OrdersService, MenuItemsService, CouponsService,
      ],
    }).compile();


    
    resolver = module.get<StorefrontsResolver>(StorefrontsResolver);
    storefrontRepository = module.get<Repository<Storefront>>(getRepositoryToken(Storefront));
    orderRepository = module.get<Repository<Order>>(getRepositoryToken(Order));
    menuItemRepository = module.get<Repository<MenuItem>>(getRepositoryToken(MenuItem));
    couponRepository = module.get<Repository<Coupon>>(getRepositoryToken(Coupon));
  });

  it('should have a create function', () => {
    expect(resolver.createStorefront).toBeDefined();
  });

  it('should find all storefronts', () => {
    expect((resolver.findAll() as unknown as Storefront[]).length).toBeGreaterThan(0);
  });

  it('should find all storefronts with a zip code of 1', () => {
    expect((resolver.findAllByZipCode(1) as unknown as Storefront[]).length).toBeGreaterThan(0);
  });
});
