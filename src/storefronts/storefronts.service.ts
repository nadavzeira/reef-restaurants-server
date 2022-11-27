import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Guid } from 'guid-typescript';
import { ArrayContains, Repository } from 'typeorm';

import { CreateStorefrontInput } from './dto/create-storefront.input';
import { UpdateStorefrontInput } from './dto/update-storefront.input';
import { imageAsByteArray } from './entities/labrador.entity';
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
    storefront.image = imageAsByteArray;
    
    return await this.storefrontRepository.save(storefront);
  }

  async findOne(id: Guid): Promise<Storefront> {
    const storefront = await this.storefrontRepository.findOneBy({
      id: id.toString(),
    });

    if (!storefront) {
      throw new NotFoundException(`Storefront #${id} not found`);
    }

    return storefront;
  }
  async findAll(): Promise<Array<Storefront>> {
    return this.storefrontRepository.find();
  }

  async update(
    id: Guid,
    updateStorefrontInput: UpdateStorefrontInput,
  ): Promise<Storefront> {
    const storefront = await this.storefrontRepository.preload({
      id,
      ...updateStorefrontInput,
    });

    if (!storefront) {
      throw new NotFoundException(`Storefront #${id} not found`);
    }

    return this.storefrontRepository.save(storefront);
  }

  async remove(id: Guid): Promise<Storefront> {
    const storefront = await this.findOne(id);

    await this.storefrontRepository.remove(storefront);

    return storefront;
  }

  async findAllByZipCode(zipCode: number): Promise<Storefront[]> {
    const storefronts = await this.storefrontRepository.findBy({
      zipCodes: ArrayContains([zipCode]),
    });

    if (!storefronts) {
      throw new NotFoundException(
        `Storefront that cover the zip code #${zipCode} not found`,
      );
    }

    return storefronts;
  }
}
