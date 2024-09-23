import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdersService } from '../../src/orders/orders.service';
import { Order } from '../../src/entities/order.entity';

describe('OrdersService', () => {
  let service: OrdersService;
  let repository: Repository<Order>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(Order),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    repository = module.get<Repository<Order>>(getRepositoryToken(Order));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all orders', async () => {
    const orders = [{ orderId: 1, username: 'testuser', orderDate: new Date() }];
    jest.spyOn(repository, 'find').mockResolvedValue(orders as Order[]);

    expect(await service.findAll()).toEqual(orders);
  });

  it('should find one order by id', async () => {
    const order = { orderId: 1, username: 'testuser', orderDate: new Date() };
    jest.spyOn(repository, 'findOne').mockResolvedValue(order as Order);

    expect(await service.findOne(1)).toEqual(order);
  });

  it('should create a new order', async () => {
    const order = { orderId: 1, username: 'testuser', orderDate: new Date() };
    jest.spyOn(repository, 'save').mockResolvedValue(order as Order);

    expect(await service.create(order as Order)).toEqual(order);
  });

  it('should update an order', async () => {
    const order = { orderId: 1, username: 'testuser', orderDate: new Date() };
    jest.spyOn(repository, 'update').mockResolvedValue(undefined);
    jest.spyOn(repository, 'findOne').mockResolvedValue(order as Order);

    expect(await service.update(1, order as Order)).toEqual(order);
  });

  it('should remove an order', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

    expect(await service.remove(1)).toBeUndefined();
  });
});
