import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateMemberDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @IsString()
  address: string;

}
