import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Param,
  Get,
} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { GetUser } from "../utils/decorators/get-user.decorator";
import { CreateOrderDto } from "./dto/create-order.dto";
import { Request } from "express";
import { RolesGuard } from "../auth/roles.guard";

@Controller("orders")
export class OrdersController {
  constructor(private svc: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: Request) {
    return this.svc.create(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getOrders(@Req() req: Request) {
    const res = await this.svc.getOrders(req.user.id);
    console.log(res);
    return res;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("admin")
  getAllOrders() {
    return this.svc.getAllOrders();
  }
}
