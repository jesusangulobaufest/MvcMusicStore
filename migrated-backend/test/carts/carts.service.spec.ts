import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartsService } from '../../src/carts/carts.service';
import { Cart } from '../../src/entities/cart.entity';

describe('CartsService', () => {
  let service: CartsService;
  let repository: Repository<Cart>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartsService,
        {
          provide: getRepositoryToken(Cart),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CartsService>(CartsService);
    repository = module.get<Repository<Cart>>(getRepositoryToken(Cart));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all carts', async () => {
    const carts = [{ cartId: 1, albumId: 1, count: 1, dateCreated: new Date(), cartSessionId: 'test' }];
    jest.spyOn(repository, 'find').mockResolvedValue(carts as Cart[]);

    expect(await service.findAll()).toEqual(carts);
  });

  it('should find one cart by id', async () => {
    const cart = { cartId: 1, albumId: 1, count: 1, dateCreated: new Date(), cartSessionId: 'test' };
    jest.spyOn(repository, 'findOne').mockResolvedValue(cart as Cart);

    expect(await service.findOne(1)).toEqual(cart);
  });

  it('should create a new cart', async () => {
    const cart = { cartId: 1, albumId: 1, count: 1, dateCreated: new Date(), cartSessionId: 'test' };
    jest.spyOn(repository, 'save').mockResolvedValue(cart as Cart);

    expect(await service.create(cart as Cart)).toEqual(cart);
  });

  it('should update a cart', async () => {
    const cart = { cartId: 1, albumId: 1, count: 1, dateCreated: new Date(), cartSessionId: 'test' };
    jest.spyOn(repository, 'update').mockResolvedValue(undefined);
    jest.spyOn(repository, 'findOne').mockResolvedValue(cart as Cart);

    expect(await service.update(1, cart as Cart)).toEqual(cart);
  });

  it('should remove a cart', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

    expect(await service.remove(1)).toBeUndefined();
  });
});
