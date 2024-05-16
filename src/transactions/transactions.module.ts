import { Module } from '@nestjs/common';
import { TransactionController } from './controller/transactions.controller';
import { TransactionService } from './service/transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'src/typeorm/entties/transaction.entity';

@Module({
  imports : [TypeOrmModule.forFeature([
    Transaction
   ])],
  controllers: [TransactionController],
  providers: [TransactionService]
})
export class TransactionsModule {}
