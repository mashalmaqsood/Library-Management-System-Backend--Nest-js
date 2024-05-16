import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateTransactionDto {
    
  @IsOptional()
  @IsString()
  transactionDate: Date;

  @IsOptional()
  @IsString()
  transactionType: string;

  @IsOptional()
  @IsInt()
  amount: number;

}
