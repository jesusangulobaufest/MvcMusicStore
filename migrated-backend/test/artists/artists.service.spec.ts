import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistsService } from '../../src/artists/artists.service';
import { Artist } from '../../src/entities/artist.entity';

describe('ArtistsService', () => {
  let service: ArtistsService;
  let repository: Repository<Artist>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArtistsService,
        {
          provide: getRepositoryToken(Artist),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ArtistsService>(ArtistsService);
    repository = module.get<Repository<Artist>>(getRepositoryToken(Artist));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all artists', async () => {
    const artists = [{ artistId: 1, name: 'Test Artist' }];
    jest.spyOn(repository, 'find').mockResolvedValue(artists as Artist[]);

    expect(await service.findAll()).toEqual(artists);
  });

  it('should find one artist by id', async () => {
    const artist = { artistId: 1, name: 'Test Artist' };
    jest.spyOn(repository, 'findOne').mockResolvedValue(artist as Artist);

    expect(await service.findOne(1)).toEqual(artist);
  });

  it('should create a new artist', async () => {
    const artist = { artistId: 1, name: 'Test Artist' };
    jest.spyOn(repository, 'save').mockResolvedValue(artist as Artist);

    expect(await service.create(artist as Artist)).toEqual(artist);
  });

  it('should update an artist', async () => {
    const artist = { artistId: 1, name: 'Updated Artist' };
    jest.spyOn(repository, 'update').mockResolvedValue(undefined);
    jest.spyOn(repository, 'findOne').mockResolvedValue(artist as Artist);

    expect(await service.update(1, artist as Artist)).toEqual(artist);
  });

  it('should remove an artist', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

    expect(await service.remove(1)).toBeUndefined();
  });
});
