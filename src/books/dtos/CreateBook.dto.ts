import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateBookDto {

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsString()
  ISBN: string;

  @IsString()
  genre: string;

  @IsInt()
  publishedYear: number;

  @IsString()
  publisher: string;

}
