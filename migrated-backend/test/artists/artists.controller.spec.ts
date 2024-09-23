import { Test, TestingModule } from '@nestjs/testing';
import { ArtistsController } from '../../src/artists/artists.controller';
import { ArtistsService } from '../../src/artists/artists.service';
import { Artist } from '../../src/entities/artist.entity';

describe('ArtistsController', () => {
  let controller: ArtistsController;
  let service: ArtistsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtistsController],
      providers: [
        {
          provide: ArtistsService,
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

    controller = module.get<ArtistsController>(ArtistsController);
    service = module.get<ArtistsService>(ArtistsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of artists', async () => {
    const result = [{ artistId: 1, name: 'Test Artist' }];
    jest.spyOn(service, 'findAll').mockResolvedValue(result as Artist[]);

    expect(await controller.findAll()).toBe(result);
  });

  it('should return a single artist', async () => {
    const result = { artistId: 1, name: 'Test Artist' };
    jest.spyOn(service, 'findOne').mockResolvedValue(result as Artist);

    expect(await controller.findOne(1)).toBe(result);
  });

  it('should create a new artist', async () => {
    const result = { artistId: 1, name: 'Test Artist' };
    jest.spyOn(service, 'create').mockResolvedValue(result as Artist);

    expect(await controller.create(result as Artist)).toBe(result);
  });

  it('should update an artist', async () => {
    const result = { artistId: 1, name: 'Updated Artist' };
    jest.spyOn(service, 'update').mockResolvedValue(result as Artist);

    expect(await controller.update(1, result as Artist)).toBe(result);
  });

  it('should remove an artist', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);

    expect(await controller.remove(1)).toBeUndefined();
  });
});
