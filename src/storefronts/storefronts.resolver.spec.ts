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

describe('StorefrontsResolver', () => {
  let resolver: StorefrontsResolver;

  let storefrontRepository: Repository<Storefront>;
  let orderRepository: Repository<Order>;
  let menuItemRepository: Repository<MenuItem>;
  let couponRepository: Repository<Coupon>;

  jest.setTimeout(100000);
  
  beforeEach(async () => {
    jest.setTimeout(100000);
    
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(),
        OrdersModule,
        MenuItemsModule,
        CouponsModule,
      ],
      providers: [
        StorefrontsResolver,
        StorefrontsService,
        // OrdersService, MenuItemsService, CouponsService,
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
      ],
    }).compile();


    
    resolver = module.get<StorefrontsResolver>(StorefrontsResolver);
    storefrontRepository = module.get<Repository<Storefront>>(getRepositoryToken(Storefront));
    orderRepository = module.get<Repository<Order>>(getRepositoryToken(Order));
    menuItemRepository = module.get<Repository<MenuItem>>(getRepositoryToken(MenuItem));
    couponRepository = module.get<Repository<Coupon>>(getRepositoryToken(Coupon));
  });

  it('should be defined', () => {
    jest.setTimeout(100000);
    
    expect(resolver).toBeDefined();
  });
});
