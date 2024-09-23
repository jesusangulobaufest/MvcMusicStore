import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('shopping_carts')
export class ShoppingCart {
  @PrimaryGeneratedColumn()
  shoppingCartId: number;

  @Column()
  albumId: number;

  @Column()
  count: number;

  @Column()
  dateCreated: Date;

  @Column()
  cartSessionId: string;
}
