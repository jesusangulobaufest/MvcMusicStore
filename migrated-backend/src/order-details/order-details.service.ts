import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetail } from '../entities/order-detail.entity';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetail)
    private orderDetailsRepository: Repository<OrderDetail>,
  ) {}

  findAll(): Promise<OrderDetail[]> {
    return this.orderDetailsRepository.find();
  }

  findOne(id: number): Promise<OrderDetail> {
    return this.orderDetailsRepository.findOne({ where: { id } });
  }

  create(orderDetail: OrderDetail): Promise<OrderDetail> {
    return this.orderDetailsRepository.save(orderDetail);
  }

  async update(id: number, orderDetail: OrderDetail): Promise<OrderDetail> {
    await this.orderDetailsRepository.update(id, orderDetail);
    return this.orderDetailsRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.orderDetailsRepository.delete(id);
  }
}
