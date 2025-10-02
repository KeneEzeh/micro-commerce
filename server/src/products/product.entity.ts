import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column("text")
  description: string;

  @Column("real")
  price: number;

  @Column("int")
  inventory: number;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  image: string;
}
