import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { Artist } from '../entities/artist.entity';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  findAll(): Promise<Artist[]> {
    return this.artistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Artist> {
    return this.artistsService.findOne(id);
  }

  @Post()
  create(@Body() artist: Artist): Promise<Artist> {
    return this.artistsService.create(artist);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() artist: Artist): Promise<Artist> {
    return this.artistsService.update(id, artist);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.artistsService.remove(id);
  }
}
