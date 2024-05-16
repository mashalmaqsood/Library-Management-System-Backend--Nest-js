import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { LoanService } from '../service/loans.service';
import { CreateLoanDto } from '../dtos/CreateLoan.dto';
import { UpdateLoanDto } from '../dtos/UpdateLoan.dto';

@Controller('api/loans')
export class loansController {
  constructor(private loanService: LoanService) {}

  @Post('createLoan')
  createLoan(@Body() loanPayload: CreateLoanDto) {
    return this.loanService.createLoan(loanPayload);
  }

  @Get('getLoans')
  getLoans() {
    return this.loanService.getLoans();
  }

  @Get('getLoanById/:id')
  getLoanById(@Param('id', ParseIntPipe) id: number) {
    return this.loanService.getLoanById(id);
  }

  @Put('updateLoan/:id')
  async updateCopyById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLoanDetails: UpdateLoanDto,
  ) {
    const result = await this.loanService.updateLoan(id, updateLoanDetails);
    if (result.affected > 0) {
      return { message: 'Loan details are updated successfully!' };
    } else {
      throw new HttpException(
        'No records updated. The provided ID might not exist.',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Delete('deleteLoan/:id')
  async deleteLoan(@Param('id', ParseIntPipe) id: number) {
    const result = await this.loanService.deleteLoan(id);
    if (result.affected > 0) {
      return { message: 'Loan details are deleted successfully!' };
    } else {
      throw new HttpException(
        'No records deleted. The provided ID might not exist.',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
