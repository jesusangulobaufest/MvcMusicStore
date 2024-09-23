import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenresService } from '../../src/genres/genres.service';
import { Genre } from '../../src/entities/genre.entity';

describe('GenresService', () => {
  let service: GenresService;
  let repository: Repository<Genre>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenresService,
        {
          provide: getRepositoryToken(Genre),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<GenresService>(GenresService);
    repository = module.get<Repository<Genre>>(getRepositoryToken(Genre));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all genres', async () => {
    const genres = [{ genreId: 1, name: 'Test Genre' }];
    jest.spyOn(repository, 'find').mockResolvedValue(genres as Genre[]);

    expect(await service.findAll()).toEqual(genres);
  });

  it('should find one genre by id', async () => {
    const genre = { genreId: 1, name: 'Test Genre' };
    jest.spyOn(repository, 'findOne').mockResolvedValue(genre as Genre);

    expect(await service.findOne(1)).toEqual(genre);
  });

  it('should create a new genre', async () => {
    const genre = { genreId: 1, name: 'Test Genre' };
    jest.spyOn(repository, 'save').mockResolvedValue(genre as Genre);

    expect(await service.create(genre as Genre)).toEqual(genre);
  });

  it('should update a genre', async () => {
    const genre = { genreId: 1, name: 'Updated Genre' };
    jest.spyOn(repository, 'update').mockResolvedValue(undefined);
    jest.spyOn(repository, 'findOne').mockResolvedValue(genre as Genre);

    expect(await service.update(1, genre as Genre)).toEqual(genre);
  });

  it('should remove a genre', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

    expect(await service.remove(1)).toBeUndefined();
  });
});
