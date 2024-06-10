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
import { TransactionService } from '../service/transactions.service';
import { CreateTransactionDto } from '../dtos/CreateTransaction.dto';
import { UpdateTransactionDto } from '../dtos/UpdateTransaction.dto';
import { Request } from 'express';

@Controller('api/transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post('create')
 async create(@Body() transactionPayload: CreateTransactionDto) {
    try {
      const transaction = await this.transactionService.create(transactionPayload);
      return {
        message: 'Transaction created successfully.',
        transaction
      };
    } catch (error) {
      return new HttpException(
        'Failed to create a transaction',
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
      return this.transactionService.get();
    }
  }

  async getById(id) {
    const book = await this.transactionService.getById(id);
    if (!book) {
      throw new HttpException(
        'No records found. The provided ID might not exist.',
        HttpStatus.NOT_FOUND,
      );
    }
    return book;
  }

  @Put('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTransactionDetails: UpdateTransactionDto,
  ) {
      const transaction = await this.transactionService.update(
        id,
        updateTransactionDetails
      );
      if (transaction.affected > 0) {
        return { message: 'Transaction details are updated successfully!' };
      } else {
        throw new HttpException(
          'No records updated. The provided ID might not exist.',
          HttpStatus.NOT_FOUND,
        );
      }
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      const transaction = await this.transactionService.delete(id);
      if (transaction.affected > 0) {
        return { message: 'Transaction details are deleted successfully!' };
      } else {
        throw new HttpException(
          'No records deleted. The provided ID might not exist.',
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      if(error.status === 404){
        throw error
      }
    }
  }
}
