import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CartItem } from "./cart-item.entity";
import { Product } from "../products/product.entity";
import { User } from "../users/user.entity";

@Injectable()
export class CartService {
  constructor(@InjectRepository(CartItem) private repo: Repository<CartItem>) {}

  async add(userId: string, product: Product, quantity: number) {
    const existing = await this.repo.findOne({
      where: { user: { id: userId }, product: { id: product.id } },
    });
    if (existing) {
      existing.quantity += quantity;
      return this.repo.save(existing);
    }
    const ci = this.repo.create({
      user: { id: userId } as User,
      product: product as Product,
      quantity: quantity,
    });
    return await this.repo.save(ci);
  }

  async get(userId: string) {
    return this.repo.find({
      where: { user: { id: userId } },
      relations: ["product"],
    });
  }

  async remove(itemId: string) {
    return this.repo.delete(itemId);
  }
}
