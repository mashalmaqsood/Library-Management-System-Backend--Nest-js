import { IsDate, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateLoanDto {
  @IsNotEmpty()
  loanDate: Date;

  @IsNotEmpty()
  returnDate: Date;
}
