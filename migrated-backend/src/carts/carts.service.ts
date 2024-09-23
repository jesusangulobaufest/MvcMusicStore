import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../entities/cart.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private cartsRepository: Repository<Cart>,
  ) {}

  findAll(): Promise<Cart[]> {
    return this.cartsRepository.find();
  }

  findOne(id: number): Promise<Cart> {
    return this.cartsRepository.findOne({ where: { id } });
  }

  create(cart: Cart): Promise<Cart> {
    return this.cartsRepository.save(cart);
  }

  async update(id: number, cart: Cart): Promise<Cart> {
    await this.cartsRepository.update(id, cart);
    return this.cartsRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.cartsRepository.delete(id);
  }
}
