import { IsDateString, IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsDateString()
  transactionDate: Date;

  @IsNotEmpty()
  @IsString()
  transactionType: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  amount: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  member_id : number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  copy_id : number;

}
