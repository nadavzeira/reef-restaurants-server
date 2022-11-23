import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async findOne(orderId: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException(`Order #${orderId} not found`);
    }

    return order;
  }

  async findAll(): Promise<Array<Order>> {
    return await this.orderRepository.find();
  }

  async update(
    orderId: string,
    updateOrderInput: UpdateOrderInput,
  ): Promise<Order> {
    const order = await this.orderRepository.preload({
      id: orderId,
      ...updateOrderInput,
    });

    if (!order) {
      throw new NotFoundException(`Order #${orderId} not found`);
    }

    return this.orderRepository.save(order);
  }

  async remove(orderId: string): Promise<Order> {
    const order = await this.findOne(orderId);

    await this.orderRepository.remove(order);

    return {
      id: orderId,
      storefrontId: '',
      customerName: '',
      customerAddress: '',
    };
  }
}
