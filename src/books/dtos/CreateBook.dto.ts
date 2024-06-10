import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsString()
  ISBN: string;

  @IsString()
  @IsNotEmpty()
  genre: string;

  @IsInt()
  @IsNotEmpty()
  publishedYear: number;

  @IsString()
  publisher: string;

}
