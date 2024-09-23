import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShoppingCartsService } from './shopping-carts.service';
import { ShoppingCart } from '../entities/shopping-cart.entity';

@Controller('shopping-carts')
export class ShoppingCartsController {
  constructor(private readonly shoppingCartsService: ShoppingCartsService) {}

  @Post()
  create(@Body() shoppingCart: ShoppingCart) {
    return this.shoppingCartsService.create(shoppingCart);
  }

  @Get()
  findAll() {
    return this.shoppingCartsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shoppingCartsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() shoppingCart: ShoppingCart) {
    return this.shoppingCartsService.update(+id, shoppingCart);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shoppingCartsService.remove(+id);
  }
}
