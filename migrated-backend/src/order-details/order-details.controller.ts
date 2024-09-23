import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { OrderDetail } from '../entities/order-detail.entity';

@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Get()
  findAll(): Promise<OrderDetail[]> {
    return this.orderDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<OrderDetail> {
    return this.orderDetailsService.findOne(id);
  }

  @Post()
  create(@Body() orderDetail: OrderDetail): Promise<OrderDetail> {
    return this.orderDetailsService.create(orderDetail);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() orderDetail: OrderDetail): Promise<OrderDetail> {
    return this.orderDetailsService.update(id, orderDetail);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.orderDetailsService.remove(id);
  }
}
