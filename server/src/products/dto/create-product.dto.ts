import {
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  IsOptional,
  IsNumber,
} from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber({ allowNaN: false, maxDecimalPlaces: 2 })
  @Min(0)
  price!: number;

  @IsInt()
  @Min(1)
  inventory!: number;

  @IsOptional()
  @IsString()
  category?: string;
}
