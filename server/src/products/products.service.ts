import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { CreateProductDto } from "./dto/create-product.dto";

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  async create(data: CreateProductDto) {
    try {
      const ep = await this.repo.findOne({ where: { title: data.title } });
      if (ep) {
        if (ep.inventory == 0) ep.inventory += data.inventory;
        return await this.repo.save(ep);
      }
      const p = this.repo.create(data as Product);
      return this.repo.save(p);
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: string, data: Partial<Product>) {
    const p = await this.repo.findOne({ where: { id } });
    if (!p) throw new NotFoundException("Product not found");
    Object.assign(p, data);
    return this.repo.save(p);
  }

  async remove(id: string) {
    const p = await this.repo.findOne({ where: { id } });
    if (!p) throw new NotFoundException("Product not found");
    await this.repo.remove(p);
    return { ok: true };
  }

  findAll(page = 1, limit = 10, search?: string, category?: string) {
    const qb = this.repo.createQueryBuilder("p");
    if (search)
      qb.where("p.title LIKE :s OR p.description LIKE :s", {
        s: `%${search}%`,
      });
    if (category) qb.andWhere("p.category = :c", { c: category });
    qb.skip((page - 1) * limit).take(limit);
    return Promise.all([qb.getMany(), qb.getCount()]).then(([data, total]) => ({
      data,
      total,
      page,
      limit,
    }));
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  async deductInventory(productId: string, qty: number) {
    const p = await this.findOne(productId);
    if (!p) throw new Error("Product not found");
    if (p.inventory < qty) throw new Error("Insufficient inventory");
    p.inventory -= qty;
    return this.repo.save(p);
  }
}
