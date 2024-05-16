import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  transactionDate: Date;

  @IsNotEmpty()
  @IsString()
  transactionType: string;

  @IsNotEmpty()
  @IsInt()
  amount: number;

}
