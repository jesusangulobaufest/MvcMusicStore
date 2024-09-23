import { Test, TestingModule } from '@nestjs/testing';
import { CartsController } from '../../src/carts/carts.controller';
import { CartsService } from '../../src/carts/carts.service';
import { Cart } from '../../src/entities/cart.entity';

describe('CartsController', () => {
  let controller: CartsController;
  let service: CartsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartsController],
      providers: [
        {
          provide: CartsService,
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

    controller = module.get<CartsController>(CartsController);
    service = module.get<CartsService>(CartsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of carts', async () => {
    const result = [{ cartId: 1, albumId: 1, count: 1, dateCreated: new Date(), cartSessionId: 'test' }];
    jest.spyOn(service, 'findAll').mockResolvedValue(result as Cart[]);

    expect(await controller.findAll()).toBe(result);
  });

  it('should return a single cart', async () => {
    const result = { cartId: 1, albumId: 1, count: 1, dateCreated: new Date(), cartSessionId: 'test' };
    jest.spyOn(service, 'findOne').mockResolvedValue(result as Cart);

    expect(await controller.findOne(1)).toBe(result);
  });

  it('should create a new cart', async () => {
    const result = { cartId: 1, albumId: 1, count: 1, dateCreated: new Date(), cartSessionId: 'test' };
    jest.spyOn(service, 'create').mockResolvedValue(result as Cart);

    expect(await controller.create(result as Cart)).toBe(result);
  });

  it('should update a cart', async () => {
    const result = { cartId: 1, albumId: 1, count: 1, dateCreated: new Date(), cartSessionId: 'test' };
    jest.spyOn(service, 'update').mockResolvedValue(result as Cart);

    expect(await controller.update(1, result as Cart)).toBe(result);
  });

  it('should remove a cart', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);

    expect(await controller.remove(1)).toBeUndefined();
  });
});
