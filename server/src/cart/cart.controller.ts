import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Delete,
  NotFoundException,
  Req,
  UseGuards,
  Param,
  BadRequestException,
} from "@nestjs/common";
import { Request } from "express";
import { CartService } from "./cart.service";
import { ProductsService } from "../products/products.service";
import { CreateCartDto } from "./dto/create-cart.dto";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { RolesGuard } from "../auth/roles.guard";

@Controller("cart")
export class CartController {
  constructor(
    private svc: CartService,
    private products: ProductsService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post("add")
  async add(@Body() body: CreateCartDto, @Req() req: Request) {
    const p = await this.products.findOne(body.productId);
    if (!p) return new NotFoundException("product not found");
    console.log("Result", p.inventory, body.quantity);
    // if (p.inventory < body.quantity)
    //   return new BadRequestException("Not enough stock");
    const res = await this.svc.add(req.user.id, p, body.quantity);
    return res;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  get(@Req() req: Request) {
    return this.svc.get(req.user.id);
  }

  @Delete(":cartId")
  remove(@Param("cartId") id: string) {
    return this.svc.remove(id);
  }
}
