import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Genre } from './genre.entity';
import { Artist } from './artist.entity';
import { OrderDetail } from './order-detail.entity';

@Entity('albums')
export class Album {
  @PrimaryGeneratedColumn()
  albumId: number;

  @Column()
  genreId: number;

  @Column()
  artistId: number;

  @Column({ length: 160 })
  title: string;

  @Column('decimal', { precision: 5, scale: 2 })
  price: number;

  @Column({ length: 1024 })
  albumArtUrl: string;

  @ManyToOne(() => Genre, genre => genre.albums)
  genre: Genre;

  @ManyToOne(() => Artist, artist => artist.albums)
  artist: Artist;

  @OneToMany(() => OrderDetail, orderDetail => orderDetail.album)
  orderDetails: OrderDetail[];
}
