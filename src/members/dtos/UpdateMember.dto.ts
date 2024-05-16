import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateMemberDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  phone: number;

  @IsOptional()
  @IsString()
  address: string;
}
