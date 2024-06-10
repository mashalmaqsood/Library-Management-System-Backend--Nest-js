import { IsDate, IsDateString, IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateLoanDto {
  @IsNotEmpty()
  @IsDateString()
  loanDate: Date;

  @IsNotEmpty()
  @IsDateString()
  returnDate: Date;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  member_id : number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  copy_id : number;
}
