import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCart } from '../entities/shopping-cart.entity';
import { ShoppingCartsService } from './shopping-carts.service';
import { ShoppingCartsController } from './shopping-carts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingCart])],
  providers: [ShoppingCartsService],
  controllers: [ShoppingCartsController],
})
export class ShoppingCartsModule {}
