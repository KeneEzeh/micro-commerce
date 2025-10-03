import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { ProductsModule } from "./products/products.module";
import { CartModule } from "./cart/cart.module";
import { OrdersModule } from "./orders/orders.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes env variables available everywhere
    }),
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "db.sqlite",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    CartModule,
    OrdersModule,
  ],
})
export class AppModule {}
