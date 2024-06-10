import { Module } from '@nestjs/common';
import { TransactionController } from './controller/transactions.controller';
import { TransactionService } from './service/transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '../typeorm/entties/transaction.entity';
import { Member } from '../typeorm/entties/member.entity';
import { Copy } from '../typeorm/entties/copy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Member, Copy])],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionsModule {}
