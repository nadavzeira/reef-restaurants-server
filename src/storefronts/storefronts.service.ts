import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateStorefrontInput } from './dto/create-storefront.input';
import { UpdateStorefrontInput } from './dto/update-storefront.input';
import { Storefront } from './entities/storefront.entity';

@Injectable()
export class StorefrontsService {
  constructor(
    @InjectRepository(Storefront)
    private readonly storefrontRepository: Repository<Storefront>,
  ) {}

  async create(
    createStorefrontInput: CreateStorefrontInput,
  ): Promise<Storefront> {
    const storefront = this.storefrontRepository.create(createStorefrontInput);

    return await this.storefrontRepository.save(storefront);
  }

  async findOne(id: string): Promise<Storefront> {
    const storefront = await this.storefrontRepository.findOneBy({ id });

    if (!storefront) {
      throw new NotFoundException(`Storefront #${id} not found`);
    }

    return storefront;
  }
  async findAll(): Promise<Array<Storefront>> {
    return await this.storefrontRepository.find();
  }

  async update(
    storefrontId: string,
    updateStorefrontInput: UpdateStorefrontInput,
  ): Promise<Storefront> {
    const storefront = await this.storefrontRepository.preload({
      id: storefrontId,
      ...updateStorefrontInput,
    });

    if (!storefront) {
      throw new NotFoundException(`Storefront #${storefrontId} not found`);
    }

    return this.storefrontRepository.save(storefront);
  }

  async remove(storefrontId: string): Promise<Storefront> {
    const storefront = await this.findOne(storefrontId);

    await this.storefrontRepository.remove(storefront);

    return {
      id: storefrontId,
      name: '',
      address: '',
      image: null,
      zipCodes: [],
    };
  }

  async findByZipCode(zipCode: number): Promise<Storefront[]> {
    const storefronts = await this.storefrontRepository.find();

    if (!storefronts) {
      throw new NotFoundException(
        `Storefront that cover the zip code #${zipCode} not found`,
      );
    }

    return storefronts.filter(({ zipCodes }) => zipCodes.includes(zipCode));
  }
}
