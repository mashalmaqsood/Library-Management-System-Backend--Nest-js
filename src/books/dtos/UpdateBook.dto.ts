import { IsInt, IsNotEmpty, IsOptional, IsString, isNotEmpty, isString } from "class-validator";

export class UpdateBookDto {

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  author: string;

  @IsOptional()
  @IsString()
  ISBN: string;

  @IsOptional()
  @IsString()
  genre: string;

  @IsOptional()
  @IsInt()
  publishedYear: number;

  @IsOptional()
  @IsString()
  publisher: string;
  
}
