import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateCopyDto {

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  book_id: number;

}
