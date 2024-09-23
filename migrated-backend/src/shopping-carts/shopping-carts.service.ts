import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShoppingCart } from '../entities/shopping-cart.entity';

@Injectable()
export class ShoppingCartsService {
  constructor(
    @InjectRepository(ShoppingCart)
    private shoppingCartsRepository: Repository<ShoppingCart>,
  ) {}

  findAll(): Promise<ShoppingCart[]> {
    return this.shoppingCartsRepository.find();
  }

  findOne(id: number): Promise<ShoppingCart> {
    return this.shoppingCartsRepository.findOne({ where: { id } });
  }

  create(shoppingCart: ShoppingCart): Promise<ShoppingCart> {
    return this.shoppingCartsRepository.save(shoppingCart);
  }

  async update(id: number, shoppingCart: ShoppingCart): Promise<ShoppingCart> {
    await this.shoppingCartsRepository.update(id, shoppingCart);
    return this.shoppingCartsRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.shoppingCartsRepository.delete(id);
  }
}
