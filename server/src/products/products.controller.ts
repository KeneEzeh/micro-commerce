import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Put,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";

@Controller("products")
export class ProductsController {
  constructor(private svc: ProductsService) {}

  @Get()
  async list(
    @Query("page") page = "1",
    @Query("limit") limit = "10",
    @Query("search") search?: string,
    @Query("category") category?: string
  ) {
    const res = await this.svc.findAll(
      Number(page),
      Number(limit),
      search,
      category
    );
    return res;
  }

  @Get(":id")
  get(@Param("id") id: string) {
    return this.svc.findOne(id);
  }

  // Admin endpoints
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Post()
  create(@Body() body: CreateProductDto) {
    console.log(body);
    return this.svc.create(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Put(":id")
  update(@Param("id") id: string, @Body() body: CreateProductDto) {
    return this.svc.update(id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.svc.remove(id);
  }
}
