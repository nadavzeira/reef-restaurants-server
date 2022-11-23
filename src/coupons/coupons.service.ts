import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  async findOne(couponId: string): Promise<Coupon> {
    const coupon = await this.couponRepository.findOne({
      where: { id: couponId },
    });

    if (!coupon) {
      throw new NotFoundException(`Coupon #${couponId} not found`);
    }

    return coupon;
  }

  async findAll(): Promise<Array<Coupon>> {
    return await this.couponRepository.find();
  }

  async update(
    couponId: string,
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

  async remove(couponId: string): Promise<Coupon> {
    const coupon = await this.findOne(couponId);

    await this.couponRepository.remove(coupon);

    return {
      id: couponId,
      type: '',
      discount: 0,
    };
  }
}