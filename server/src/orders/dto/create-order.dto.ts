import { IsNotEmpty, IsString, IsInt, Min, IsOptional } from "class-validator";

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  cartId!: string;
}
