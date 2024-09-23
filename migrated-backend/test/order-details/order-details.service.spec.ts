import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetailsService } from '../../src/order-details/order-details.service';
import { OrderDetail } from '../../src/entities/order-detail.entity';

describe('OrderDetailsService', () => {
  let service: OrderDetailsService;
  let repository: Repository<OrderDetail>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderDetailsService,
        {
          provide: getRepositoryToken(OrderDetail),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<OrderDetailsService>(OrderDetailsService);
    repository = module.get<Repository<OrderDetail>>(getRepositoryToken(OrderDetail));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all order details', async () => {
    const orderDetails = [{ orderDetailId: 1, orderId: 1, albumId: 1, quantity: 1, unitPrice: 9.99 }];
    jest.spyOn(repository, 'find').mockResolvedValue(orderDetails as OrderDetail[]);

    expect(await service.findAll()).toEqual(orderDetails);
  });

  it('should find one order detail by id', async () => {
    const orderDetail = { orderDetailId: 1, orderId: 1, albumId: 1, quantity: 1, unitPrice: 9.99 };
    jest.spyOn(repository, 'findOne').mockResolvedValue(orderDetail as OrderDetail);

    expect(await service.findOne(1)).toEqual(orderDetail);
  });

  it('should create a new order detail', async () => {
    const orderDetail = { orderDetailId: 1, orderId: 1, albumId: 1, quantity: 1, unitPrice: 9.99 };
    jest.spyOn(repository, 'save').mockResolvedValue(orderDetail as OrderDetail);

    expect(await service.create(orderDetail as OrderDetail)).toEqual(orderDetail);
  });

  it('should update an order detail', async () => {
    const orderDetail = { orderDetailId: 1, orderId: 1, albumId: 1, quantity: 1, unitPrice: 9.99 };
    jest.spyOn(repository, 'update').mockResolvedValue(undefined);
    jest.spyOn(repository, 'findOne').mockResolvedValue(orderDetail as OrderDetail);

    expect(await service.update(1, orderDetail as OrderDetail)).toEqual(orderDetail);
  });

  it('should remove an order detail', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

    expect(await service.remove(1)).toBeUndefined();
  });
});
