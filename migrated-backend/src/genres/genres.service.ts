import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from '../entities/genre.entity';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private genresRepository: Repository<Genre>,
  ) {}

  findAll(): Promise<Genre[]> {
    return this.genresRepository.find();
  }

  findOne(id: number): Promise<Genre> {
    return this.genresRepository.findOne({ where: { id } });
  }

  create(genre: Genre): Promise<Genre> {
    return this.genresRepository.save(genre);
  }

  async update(id: number, genre: Genre): Promise<Genre> {
    await this.genresRepository.update(id, genre);
    return this.genresRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.genresRepository.delete(id);
  }
}
