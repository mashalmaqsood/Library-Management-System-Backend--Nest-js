import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateCopyDto {

  @IsOptional()
  @IsString()
  status: string;

}
