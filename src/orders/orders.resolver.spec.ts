import { createMock } from '@golevelup/ts-jest';
import { ModuleMetadata } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOptions } from 'src/app.module';
import { CouponsModule } from 'src/coupons/coupons.module';
import { CouponsService } from 'src/coupons/coupons.service';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { MenuItem } from 'src/menu-items/entities/menu-item.entity';
import { MenuItemsModule } from 'src/menu-items/menu-items.module';
import { MenuItemsService } from 'src/menu-items/menu-items.service';
import { defaultOrder } from 'src/orders/entities/orders.mock';
import { Repository } from 'typeorm';

import { Order } from './entities/order.entity';
import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';

describe('OrdersResolver', () => {
  let resolver: OrdersResolver;

  beforeEach(async () => {
    const testingModuleMetaData: ModuleMetadata = {
      imports: [
        TypeOrmModule.forRoot(typeOrmModuleOptions),
        MenuItemsModule,
        CouponsModule,
      ],
      providers: [
        OrdersResolver,
        OrdersService,
        MenuItemsService,
        CouponsService,
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
    };

    const module: TestingModule = await Test.createTestingModule(
      testingModuleMetaData,
    ).compile();

    resolver = module.get<OrdersResolver>(OrdersResolver);
  });

  it('should have createOrder function', () => {
    expect(resolver.createOrder).toBeDefined();
  });

  it('should create default order', () => {
    resolver.createOrder(defaultOrder).then((order) => {
      expect(order).toEqual(defaultOrder);
    });
  });
});
