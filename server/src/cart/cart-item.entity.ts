import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../users/user.entity";
import { Product } from "../products/product.entity";
import { Order } from "../orders/order.entity";

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Product, { onDelete: "CASCADE" })
  @JoinColumn()
  product: Product;

  @Column("int")
  quantity: number;

  @ManyToOne(() => Order)
  @JoinColumn()
  order: Order;
}
