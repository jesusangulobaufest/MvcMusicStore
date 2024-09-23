import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrderDetail } from './order-detail.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  orderId: number;

  @Column({ length: 160 })
  username: string;

  @Column()
  orderDate: Date;

  @Column({ length: 160 })
  firstName: string;

  @Column({ length: 160 })
  lastName: string;

  @Column({ length: 70 })
  address: string;

  @Column({ length: 40 })
  city: string;

  @Column({ length: 40 })
  state: string;

  @Column({ length: 10 })
  postalCode: string;

  @Column({ length: 24 })
  country: string;

  @Column({ length: 24 })
  phone: string;

  @Column({ length: 160 })
  email: string;

  @Column('decimal', { precision: 18, scale: 2 })
  total: number;

  @OneToMany(() => OrderDetail, orderDetail => orderDetail.order)
  orderDetails: OrderDetail[];
}
