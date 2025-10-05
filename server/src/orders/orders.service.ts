import {
  Injectable,
  BadRequestException,
  Inject,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DataSource } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "../products/product.entity";
import { CreateOrderDto } from "./dto/create-order.dto";
import { CartItem } from "../cart/cart-item.entity";
import { OrderItem } from "./order-item.entity";

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private repo: Repository<Order>,
    private dataSource: DataSource
  ) {}

  async create(userId: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const carts = await queryRunner.manager.find(CartItem, {
        where: { user: { id: userId } },
        relations: ["product"],
      });

      console.log("Orders...", carts);
      if (!carts || carts.length === 0) {
        throw new NotFoundException("Cart is empty");
      }

      const productRepo = queryRunner.manager.getRepository(Product);
      const orderRepo = queryRunner.manager.getRepository(Order);
      const orderItemRepo = queryRunner.manager.getRepository(OrderItem);

      let total = 0;
      const orderItems: OrderItem[] = [];

      for (const cart of carts) {
        const product = await productRepo.findOne({
          where: { id: cart.product.id },
        });

        if (!product) {
          throw new BadRequestException(
            `Product not found: ${cart.product.id}`
          );
        }
        if (product.inventory < cart.quantity) {
          throw new BadRequestException(
            `Insufficient inventory for ${product.title}`
          );
        }

        product.inventory -= cart.quantity;
        await productRepo.save(product);

        total += product.price * cart.quantity;

        const orderItem = orderItemRepo.create({
          product,
          quantity: cart.quantity,
          price: product.price,
        });

        orderItems.push(orderItem);
      }

      const order = orderRepo.create({
        user: { id: userId } as any,
        total,
        items: orderItems,
      });

      const savedOrder = await queryRunner.manager.save(order);

      await queryRunner.manager.delete(
        CartItem,
        carts.map((c) => c.id)
      );

      await queryRunner.commitTransaction();
      return savedOrder;
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async getOrders(userId: string) {
    return await this.repo.find({
      where: { user: { id: userId } },
      relations: ["items"],
    });
  }

  async getAllOrders() {
    return await this.repo.find({
      relations: ["items"],
    });
  }
}
