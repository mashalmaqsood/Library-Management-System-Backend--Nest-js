import { IsDate, IsDateString, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateLoanDto {

  @IsOptional()
  @IsDateString()
  loanDate: Date;

  @IsOptional()
  @IsDateString()
  returnDate: Date;

}
