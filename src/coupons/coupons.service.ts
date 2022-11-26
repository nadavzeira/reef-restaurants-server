import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Guid } from 'guid-typescript';
import { Storefront } from 'src/storefronts/entities/storefront.entity';
import { ArrayContains, Repository } from 'typeorm';

import { CreateCouponInput } from './dto/create-coupon.input';
import { UpdateCouponInput } from './dto/update-coupon.input';
import { Coupon } from './entities/coupon.entity';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
  ) {}

  async create(createCouponInput: CreateCouponInput): Promise<Coupon> {
    const coupon = this.couponRepository.create(createCouponInput);

    return await this.couponRepository.save(coupon);
  }

  async findOne(id: Guid): Promise<Coupon> {
    const coupon = await this.couponRepository.findOneBy({ id: id.toString() });

    if (!coupon) {
      throw new NotFoundException(`Coupon #${id} not found`);
    }

    return coupon;
  }

  async findAll(): Promise<Array<Coupon>> {
    return await this.couponRepository.find();
  }

  async update(
    couponId: Guid,
    updateCouponInput: UpdateCouponInput,
  ): Promise<Coupon> {
    const coupon = await this.couponRepository.preload({
      id: couponId,
      ...updateCouponInput,
    });

    if (!coupon) {
      throw new NotFoundException(`Coupon #${couponId} not found`);
    }

    return this.couponRepository.save(coupon);
  }

  async remove(couponId: Guid): Promise<Coupon> {
    const coupon = await this.findOne(couponId);

    await this.couponRepository.remove(coupon);

    return coupon;
  }

  async findAllByStorefront(storefront: Storefront): Promise<Array<Coupon>> {
    const coupons = await this.couponRepository.find({
      where: {
        storefronts: ArrayContains<Storefront>([storefront]),
      },
    });

    if (!coupons) {
      throw new NotFoundException(
        `No coupons foudn for storefront #${storefront.id}`,
      );
    }

    return coupons;
  }

  async findAllByOrder(id: Guid): Promise<Array<Coupon>> {
    const coupons = await this.couponRepository.find({
      where: {
        order: {
          id: id.toString(),
        },
      },
    });

    if (!coupons) {
      throw new NotFoundException(`No menu items found for order #${id}`);
    }

    return coupons;
  }
}
