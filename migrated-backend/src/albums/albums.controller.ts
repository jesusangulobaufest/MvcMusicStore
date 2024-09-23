import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { Album } from '../entities/album.entity';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  findAll(): Promise<Album[]> {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Album> {
    return this.albumsService.findOne(id);
  }

  @Post()
  create(@Body() album: Album): Promise<Album> {
    return this.albumsService.create(album);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() album: Album): Promise<Album> {
    return this.albumsService.update(id, album);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.albumsService.remove(id);
  }
}
