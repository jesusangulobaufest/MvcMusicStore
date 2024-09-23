import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { Album } from './album.entity';

@Entity('order_details')
export class OrderDetail {
  @PrimaryGeneratedColumn()
  orderDetailId: number;

  @Column()
  orderId: number;

  @Column()
  albumId: number;

  @Column('int')
  quantity: number;

  @Column('decimal', { precision: 18, scale: 2 })
  unitPrice: number;

  @ManyToOne(() => Order, order => order.orderDetails)
  order: Order;

  @ManyToOne(() => Album, album => album.orderDetails)
  album: Album;
}
