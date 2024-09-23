import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Album } from './album.entity';

@Entity('genres')
export class Genre {
  @PrimaryGeneratedColumn()
  genreId: number;

  @Column({ length: 120 })
  name: string;

  @OneToMany(() => Album, album => album.genre)
  albums: Album[];
}
