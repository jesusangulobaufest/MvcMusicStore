import { Test, TestingModule } from '@nestjs/testing';
import { AlbumsController } from '../../src/albums/albums.controller';
import { AlbumsService } from '../../src/albums/albums.service';
import { Album } from '../../src/entities/album.entity';

describe('AlbumsController', () => {
  let controller: AlbumsController;
  let service: AlbumsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlbumsController],
      providers: [
        {
          provide: AlbumsService,
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

    controller = module.get<AlbumsController>(AlbumsController);
    service = module.get<AlbumsService>(AlbumsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of albums', async () => {
    const result = [{ albumId: 1, title: 'Test Album' }];
    jest.spyOn(service, 'findAll').mockResolvedValue(result as Album[]);

    expect(await controller.findAll()).toBe(result);
  });

  it('should return a single album', async () => {
    const result = { albumId: 1, title: 'Test Album' };
    jest.spyOn(service, 'findOne').mockResolvedValue(result as Album);

    expect(await controller.findOne(1)).toBe(result);
  });

  it('should create a new album', async () => {
    const result = { albumId: 1, title: 'Test Album' };
    jest.spyOn(service, 'create').mockResolvedValue(result as Album);

    expect(await controller.create(result as Album)).toBe(result);
  });

  it('should update an album', async () => {
    const result = { albumId: 1, title: 'Updated Album' };
    jest.spyOn(service, 'update').mockResolvedValue(result as Album);

    expect(await controller.update(1, result as Album)).toBe(result);
  });

  it('should remove an album', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);

    expect(await controller.remove(1)).toBeUndefined();
  });
});
