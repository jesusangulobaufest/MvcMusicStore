import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Artist } from './entities/artist.entity';
import { Cart } from './entities/cart.entity';
import { Genre } from './entities/genre.entity';
import { Order } from './entities/order.entity';
import { OrderDetail } from './entities/order-detail.entity';
import { ShoppingCart } from './entities/shopping-cart.entity';
import { AlbumsModule } from './albums/albums.module';
import { ArtistsModule } from './artists/artists.module';
import { CartsModule } from './carts/carts.module';
import { GenresModule } from './genres/genres.module';
import { OrdersModule } from './orders/orders.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import { ShoppingCartsModule } from './shopping-carts/shopping-carts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'musicstore',
      entities: [Album, Artist, Cart, Genre, Order, OrderDetail, ShoppingCart],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Album, Artist, Cart, Genre, Order, OrderDetail, ShoppingCart]),
    AlbumsModule,
    ArtistsModule,
    CartsModule,
    GenresModule,
    OrdersModule,
    OrderDetailsModule,
    ShoppingCartsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
