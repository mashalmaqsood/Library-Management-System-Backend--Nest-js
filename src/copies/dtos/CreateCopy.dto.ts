import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateCopyDto {
  @IsNotEmpty()
  @IsString()
  status: string;

  @IsInt()
  @IsNotEmpty()
  book_id: number;

}
