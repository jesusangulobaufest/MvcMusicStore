import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CartsService } from './carts.service';
import { Cart } from '../entities/cart.entity';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get()
  findAll(): Promise<Cart[]> {
    return this.cartsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Cart> {
    return this.cartsService.findOne(id);
  }

  @Post()
  create(@Body() cart: Cart): Promise<Cart> {
    return this.cartsService.create(cart);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() cart: Cart): Promise<Cart> {
    return this.cartsService.update(id, cart);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.cartsService.remove(id);
  }
}
