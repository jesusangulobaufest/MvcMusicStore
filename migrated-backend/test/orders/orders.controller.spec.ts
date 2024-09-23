import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from '../../src/orders/orders.controller';
import { OrdersService } from '../../src/orders/orders.service';
import { Order } from '../../src/entities/order.entity';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
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

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of orders', async () => {
    const result = [{ orderId: 1, username: 'testuser', orderDate: new Date() }];
    jest.spyOn(service, 'findAll').mockResolvedValue(result as Order[]);

    expect(await controller.findAll()).toBe(result);
  });

  it('should return a single order', async () => {
    const result = { orderId: 1, username: 'testuser', orderDate: new Date() };
    jest.spyOn(service, 'findOne').mockResolvedValue(result as Order);

    expect(await controller.findOne(1)).toBe(result);
  });

  it('should create a new order', async () => {
    const result = { orderId: 1, username: 'testuser', orderDate: new Date() };
    jest.spyOn(service, 'create').mockResolvedValue(result as Order);

    expect(await controller.create(result as Order)).toBe(result);
  });

  it('should update an order', async () => {
    const result = { orderId: 1, username: 'testuser', orderDate: new Date() };
    jest.spyOn(service, 'update').mockResolvedValue(result as Order);

    expect(await controller.update(1, result as Order)).toBe(result);
  });

  it('should remove an order', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);

    expect(await controller.remove(1)).toBeUndefined();
  });
});
