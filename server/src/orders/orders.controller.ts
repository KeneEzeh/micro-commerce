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
  getOrders(@Req() req: Request) {
    const res = this.svc.getOrders(req.user.id);
    return res;
  }
}
