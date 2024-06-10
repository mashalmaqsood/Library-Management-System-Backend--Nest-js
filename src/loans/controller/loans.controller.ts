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
  Query,
  Req,
} from '@nestjs/common';
import { LoanService } from '../service/loans.service';
import { CreateLoanDto } from '../dtos/CreateLoan.dto';
import { UpdateLoanDto } from '../dtos/UpdateLoan.dto';
import { Request } from 'express';

@Controller('api/loans')
export class loansController {
  constructor(private loanService: LoanService) {}

  @Post('create')
  async create(@Body() loanPayload: CreateLoanDto) {
    try {
      const loan = await this.loanService.create(loanPayload);
      return {
        message: 'Loan created successfully.',
        loan,
      };
    } catch (error) {
      return new HttpException(
        'Failed to create a loan',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('get')
  get(@Req() request: Request) {
    const { id } = request.query;
    if (id !== undefined && id !== '') {
      return this.getById(id);
    } else if (
      Object.keys(request.query).includes('id') &&
      (id === undefined || id === '')
    ) {
      throw new HttpException(
        'ID is not specified. Please provide a valid ID.',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return this.loanService.get();
    }
  }

  async getById(id) {
    const loan = await this.loanService.getById(id);
    if (!loan) {
      throw new HttpException(
        'No records found. The provided ID might not exist.',
        HttpStatus.NOT_FOUND,
      );
    }
    return loan;
  }

  @Put('update/:id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLoanDetails: UpdateLoanDto,
  ) {
      const result = await this.loanService.update(id, updateLoanDetails);
      if (result.affected > 0) {
        return { message: 'Loan details are updated successfully!' };
      } else {
        throw new HttpException(
          'No records updated. The provided ID might not exist.',
          HttpStatus.NOT_FOUND,
        );
      }
    }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    try{
      const result = await this.loanService.delete(id);
      if (result.affected > 0) {
        return { message: 'Loan details are deleted successfully!' };
      }
      else {
        throw new HttpException(
          'No records deleted. The provided ID might not exist.',
          HttpStatus.NOT_FOUND
        );
      }
  }catch(error){
    if(error.status===404){
      throw error
    }
  }
 }
}
