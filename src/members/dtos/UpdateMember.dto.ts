import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateMemberDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsOptional()
  @IsString()
  address: string;
}
