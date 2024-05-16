import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from 'src/typeorm/entties/transaction.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from '../dtos/CreateTransaction.dto';
import { UpdateTransactionDto } from '../dtos/UpdateTransaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>
  ) {}

  createTransaction(memberPayload: CreateTransactionDto) {
    const newMember = this.transactionRepository.create(memberPayload);
    return this.transactionRepository.save(newMember);
  }

  getTransactions() {
    return this.transactionRepository.find();
  }

  updateTransaction(id: number, updateMemberDetails: UpdateTransactionDto) {
    return this.transactionRepository.update(
      { id },
      { ...updateMemberDetails },
    );
  }

  getTransactionById(id: number) {
    return this.transactionRepository.findOneBy({ id });
  }

  deleteTransaction(id: number) {
    return this.transactionRepository.delete({ id });
  }
}
