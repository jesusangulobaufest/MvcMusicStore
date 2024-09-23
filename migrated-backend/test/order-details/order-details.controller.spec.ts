import { Test, TestingModule } from '@nestjs/testing';
import { OrderDetailsController } from '../../src/order-details/order-details.controller';
import { OrderDetailsService } from '../../src/order-details/order-details.service';
import { OrderDetail } from '../../src/entities/order-detail.entity';

describe('OrderDetailsController', () => {
  let controller: OrderDetailsController;
  let service: OrderDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderDetailsController],
      providers: [
        {
          provide: OrderDetailsService,
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

    controller = module.get<OrderDetailsController>(OrderDetailsController);
    service = module.get<OrderDetailsService>(OrderDetailsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of order details', async () => {
    const result = [{ orderDetailId: 1, orderId: 1, albumId: 1, quantity: 1, unitPrice: 9.99 }];
    jest.spyOn(service, 'findAll').mockResolvedValue(result as OrderDetail[]);

    expect(await controller.findAll()).toBe(result);
  });

  it('should return a single order detail', async () => {
    const result = { orderDetailId: 1, orderId: 1, albumId: 1, quantity: 1, unitPrice: 9.99 };
    jest.spyOn(service, 'findOne').mockResolvedValue(result as OrderDetail);

    expect(await controller.findOne(1)).toBe(result);
  });

  it('should create a new order detail', async () => {
    const result = { orderDetailId: 1, orderId: 1, albumId: 1, quantity: 1, unitPrice: 9.99 };
    jest.spyOn(service, 'create').mockResolvedValue(result as OrderDetail);

    expect(await controller.create(result as OrderDetail)).toBe(result);
  });

  it('should update an order detail', async () => {
    const result = { orderDetailId: 1, orderId: 1, albumId: 1, quantity: 1, unitPrice: 9.99 };
    jest.spyOn(service, 'update').mockResolvedValue(result as OrderDetail);

    expect(await controller.update(1, result as OrderDetail)).toBe(result);
  });

  it('should remove an order detail', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);

    expect(await controller.remove(1)).toBeUndefined();
  });
});
