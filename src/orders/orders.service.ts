import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Guid } from 'guid-typescript';
import { Repository } from 'typeorm';

import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(createOrderInput: CreateOrderInput): Promise<Order> {
    const order = this.orderRepository.create(createOrderInput);

    return await this.orderRepository.save(order);
  }

  async findOne(id: Guid): Promise<Order> {
    const order = await this.orderRepository.findOneBy({ id: id.toString() });

    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }

    return order;
  }

  async findAll(): Promise<Array<Order>> {
    return await this.orderRepository.find();
  }

  async update(id: Guid, updateOrderInput: UpdateOrderInput): Promise<Order> {
    const order = await this.orderRepository.preload({
      id,
      ...updateOrderInput,
    });

    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }

    return this.orderRepository.save(order);
  }

  async remove(id: Guid): Promise<Order> {
    const order = await this.findOne(id);

    await this.orderRepository.remove(order);

    return order;
  }

  async findAllByStorefront(id: Guid): Promise<Order[]> {
    const orders = await this.orderRepository.findBy({
      storefront: {
        id: id.toString(),
      },
    });

    if (!orders) {
      throw new NotFoundException(
        `Orders from the storefront #${id} not found`,
      );
    }

    return orders;
  }
}
