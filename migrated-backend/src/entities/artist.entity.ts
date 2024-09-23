import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Album } from './album.entity';

@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn()
  artistId: number;

  @Column({ length: 120 })
  name: string;

  @OneToMany(() => Album, album => album.artist)
  albums: Album[];
}
