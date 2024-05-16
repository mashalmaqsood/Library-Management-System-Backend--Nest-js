import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateMemberDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  phone: number;

  @IsNotEmpty()
  @IsString()
  address: string;

}
