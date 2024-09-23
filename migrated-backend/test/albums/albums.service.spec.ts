import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumsService } from '../../src/albums/albums.service';
import { Album } from '../../src/entities/album.entity';

describe('AlbumsService', () => {
  let service: AlbumsService;
  let repository: Repository<Album>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlbumsService,
        {
          provide: getRepositoryToken(Album),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AlbumsService>(AlbumsService);
    repository = module.get<Repository<Album>>(getRepositoryToken(Album));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all albums', async () => {
    const albums = [{ albumId: 1, title: 'Test Album' }];
    jest.spyOn(repository, 'find').mockResolvedValue(albums as Album[]);

    expect(await service.findAll()).toEqual(albums);
  });

  it('should find one album by id', async () => {
    const album = { albumId: 1, title: 'Test Album' };
    jest.spyOn(repository, 'findOne').mockResolvedValue(album as Album);

    expect(await service.findOne(1)).toEqual(album);
  });

  it('should create a new album', async () => {
    const album = { albumId: 1, title: 'Test Album' };
    jest.spyOn(repository, 'save').mockResolvedValue(album as Album);

    expect(await service.create(album as Album)).toEqual(album);
  });

  it('should update an album', async () => {
    const album = { albumId: 1, title: 'Updated Album' };
    jest.spyOn(repository, 'update').mockResolvedValue(undefined);
    jest.spyOn(repository, 'findOne').mockResolvedValue(album as Album);

    expect(await service.update(1, album as Album)).toEqual(album);
  });

  it('should remove an album', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

    expect(await service.remove(1)).toBeUndefined();
  });
});
