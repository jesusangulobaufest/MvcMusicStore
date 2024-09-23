import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from '../entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
  ) {}

  findAll(): Promise<Album[]> {
    return this.albumsRepository.find();
  }

  findOne(id: number): Promise<Album> {
    return this.albumsRepository.findOne({ where: { id } });
  }

  create(album: Album): Promise<Album> {
    return this.albumsRepository.save(album);
  }

  async update(id: number, album: Album): Promise<Album> {
    await this.albumsRepository.update(id, album);
    return this.albumsRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.albumsRepository.delete(id);
  }
}
