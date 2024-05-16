import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateCopyDto {

  @IsOptional()
  @IsString()
  status: string;

  @IsInt()
  @IsOptional()
  book_id: number;
}
