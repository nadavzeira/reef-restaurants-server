import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOptions } from 'src/app.module';
import { Repository } from 'typeorm';

import { CouponsResolver } from './coupons.resolver';
import { CouponsService } from './coupons.service';
import { Coupon } from './entities/coupon.entity';

describe('CouponsResolver', () => {

  let resolver: CouponsResolver;
  let couponsRepository: Repository<Coupon>;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(typeOrmModuleOptions)],
      providers: [
        CouponsResolver, CouponsService,
        {
          provide: getRepositoryToken(Coupon),
          useValue: createMock<Repository<Coupon>>(),
        },
      ],
    }).compile();

    resolver = module.get<CouponsResolver>(CouponsResolver);
    couponsRepository = module.get<Repository<Coupon>>(getRepositoryToken(Coupon));
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
