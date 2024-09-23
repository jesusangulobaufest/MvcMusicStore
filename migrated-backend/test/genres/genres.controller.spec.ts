import { Test, TestingModule } from '@nestjs/testing';
import { GenresController } from '../../src/genres/genres.controller';
import { GenresService } from '../../src/genres/genres.service';
import { Genre } from '../../src/entities/genre.entity';

describe('GenresController', () => {
  let controller: GenresController;
  let service: GenresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenresController],
      providers: [
        {
          provide: GenresService,
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

    controller = module.get<GenresController>(GenresController);
    service = module.get<GenresService>(GenresService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find all genres', async () => {
    const genres = [{ genreId: 1, name: 'Test Genre' }];
    jest.spyOn(service, 'findAll').mockResolvedValue(genres as Genre[]);

    expect(await controller.findAll()).toEqual(genres);
  });

  it('should find one genre by id', async () => {
    const genre = { genreId: 1, name: 'Test Genre' };
    jest.spyOn(service, 'findOne').mockResolvedValue(genre as Genre);

    expect(await controller.findOne(1)).toEqual(genre);
  });

  it('should create a new genre', async () => {
    const genre = { genreId: 1, name: 'Test Genre' };
    jest.spyOn(service, 'create').mockResolvedValue(genre as Genre);

    expect(await controller.create(genre as Genre)).toEqual(genre);
  });

  it('should update a genre', async () => {
    const genre = { genreId: 1, name: 'Updated Genre' };
    jest.spyOn(service, 'update').mockResolvedValue(genre as Genre);

    expect(await controller.update(1, genre as Genre)).toEqual(genre);
  });

  it('should remove a genre', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);

    expect(await controller.remove(1)).toBeUndefined();
  });
});
