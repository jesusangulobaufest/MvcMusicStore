import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShoppingCartsService } from '../../src/shopping-carts/shopping-carts.service';
import { ShoppingCart } from '../../src/entities/shopping-cart.entity';

describe('ShoppingCartsService', () => {
  let service: ShoppingCartsService;
  let repository: Repository<ShoppingCart>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShoppingCartsService,
        {
          provide: getRepositoryToken(ShoppingCart),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ShoppingCartsService>(ShoppingCartsService);
    repository = module.get<Repository<ShoppingCart>>(getRepositoryToken(ShoppingCart));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all shopping carts', async () => {
    const shoppingCarts = [{ shoppingCartId: 1, albumId: 1, count: 1, dateCreated: new Date(), cartSessionId: 'test' }];
    jest.spyOn(repository, 'find').mockResolvedValue(shoppingCarts as ShoppingCart[]);

    expect(await service.findAll()).toEqual(shoppingCarts);
  });

  it('should find one shopping cart by id', async () => {
    const shoppingCart = { shoppingCartId: 1, albumId: 1, count: 1, dateCreated: new Date(), cartSessionId: 'test' };
    jest.spyOn(repository, 'findOne').mockResolvedValue(shoppingCart as ShoppingCart);

    expect(await service.findOne(1)).toEqual(shoppingCart);
  });

  it('should create a new shopping cart', async () => {
    const shoppingCart = { shoppingCartId: 1, albumId: 1, count: 1, dateCreated: new Date(), cartSessionId: 'test' };
    jest.spyOn(repository, 'save').mockResolvedValue(shoppingCart as ShoppingCart);

    expect(await service.create(shoppingCart as ShoppingCart)).toEqual(shoppingCart);
  });

  it('should update a shopping cart', async () => {
    const shoppingCart = { shoppingCartId: 1, albumId: 1, count: 1, dateCreated: new Date(), cartSessionId: 'test' };
    jest.spyOn(repository, 'update').mockResolvedValue(undefined);
    jest.spyOn(repository, 'findOne').mockResolvedValue(shoppingCart as ShoppingCart);

    expect(await service.update(1, shoppingCart as ShoppingCart)).toEqual(shoppingCart);
  });

  it('should remove a shopping cart', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

    expect(await service.remove(1)).toBeUndefined();
  });
});
