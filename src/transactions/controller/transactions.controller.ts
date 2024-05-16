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
  Put
} from '@nestjs/common';
import { TransactionService } from '../service/transactions.service';
import { CreateTransactionDto } from '../dtos/CreateTransaction.dto';
import { UpdateTransactionDto } from '../dtos/UpdateTransaction.dto';

@Controller('api/transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post('createTransaction')
  createTransaction(@Body() transactionPayload: CreateTransactionDto) {
    return this.transactionService.createTransaction(transactionPayload);
  }

  @Get('getTransactions')
  getTransactions() {
    return this.transactionService.getTransactions();
  }

  @Get('getTransactionById/:id')
  getTransactionById(@Param('id', ParseIntPipe) id: number) {
    return this.transactionService.getTransactionById(id);
  }

  @Put('updateTransaction/:id')
  async updateTransaction(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDetails: UpdateTransactionDto,
  ) {
    const transaction = await this.transactionService.updateTransaction(
      id,
      updateBookDetails,
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

  @Delete('deleteTransaction/:id')
  async deleteBook(@Param('id', ParseIntPipe) id: number) {
    const transaction = await this.transactionService.deleteTransaction(id);
    if (transaction.affected > 0) {
      return { message: 'Transaction details are deleted successfully!' };
    } else {
      throw new HttpException(
        'No records deleted. The provided ID might not exist.',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
