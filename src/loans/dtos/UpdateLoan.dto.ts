import { IsDate, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateLoanDto {
  @IsOptional()
  loanDate: Date;

  @IsOptional()
  returnDate: Date;

}
