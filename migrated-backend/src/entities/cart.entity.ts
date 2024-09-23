import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn()
  cartId: number;

  @Column()
  albumId: number;

  @Column()
  count: number;

  @Column()
  dateCreated: Date;

  @Column()
  cartSessionId: string;
}
