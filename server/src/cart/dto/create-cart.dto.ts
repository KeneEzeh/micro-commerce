import { IsNotEmpty, IsString, IsInt, Min, IsOptional } from "class-validator";

export class CreateCartDto {
  @IsNotEmpty()
  @IsString()
  productId!: string;

  @IsInt()
  @Min(1)
  quantity!: number;
}
