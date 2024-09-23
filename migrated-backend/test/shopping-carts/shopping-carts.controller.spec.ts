import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingCartsController } from '../../src/shopping-carts/shopping-carts.controller';
import { ShoppingCartsService } from '../../src/shopping-carts/shopping-carts.service';
import { ShoppingCart } from '../../src/entities/shopping-cart.entity';

describe('ShoppingCartsController', () => {
  let controller: ShoppingCartsController;
  let service: ShoppingCartsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShoppingCartsController],
      providers: [
        {
          provide: ShoppingCartsService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ShoppingCartsController>(ShoppingCartsController);
    service = module.get<ShoppingCartsService>(ShoppingCartsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a shopping cart', async () => {
    const shoppingCart: ShoppingCart = { shoppingCartId: 1, albumId: 1, count: 1, dateCreated: new Date(), cartSessionId: 'test' };
    jest.spyOn(service, 'create').mockResolvedValue(shoppingCart);

    expect(await controller.create(shoppingCart)).toEqual(shoppingCart);
  });

  it('should find all shopping carts', async () => {
    const shoppingCarts: ShoppingCart[] = [{ shoppingCartId: 1, albumId: 1, count: 1, dateCreated: new Date(), cartSessionId: 'test' }];
    jest.spyOn(service, 'findAll').mockResolvedValue(shoppingCarts);

    expect(await controller.findAll()).toEqual(shoppingCarts);
  });

  it('should find one shopping cart by id', async () => {
    const shoppingCart: ShoppingCart = { shoppingCartId: 1, albumId: 1, count: 1, dateCreated: new Date(), cartSessionId: 'test' };
    jest.spyOn(service, 'findOne').mockResolvedValue(shoppingCart);

    expect(await controller.findOne('1')).toEqual(shoppingCart);
  });

  it('should update a shopping cart', async () => {
    const shoppingCart: ShoppingCart = { shoppingCartId: 1, albumId: 1, count: 1, dateCreated: new Date(), cartSessionId: 'test' };
    jest.spyOn(service, 'update').mockResolvedValue(shoppingCart);

    expect(await controller.update('1', shoppingCart)).toEqual(shoppingCart);
  });

  it('should remove a shopping cart', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);

    expect(await controller.remove('1')).toBeUndefined();
  });
});
