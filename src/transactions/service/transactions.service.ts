import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../../typeorm/entties/transaction.entity';
import { Copy } from '../../typeorm/entties/copy.entity';
import { Member } from '../../typeorm/entties/member.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from '../dtos/CreateTransaction.dto';
import { UpdateTransactionDto } from '../dtos/UpdateTransaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(Member) private memberRepository: Repository<Member>,
    @InjectRepository(Copy) private copyRepository: Repository<Copy>,
  ) {}

  async create(transactionPayload: CreateTransactionDto) {
    const { copy_id, member_id } = transactionPayload;
    const member = await this.memberRepository.findOne({
      where: { id: member_id },
    });
    const copy = await this.copyRepository.findOne({ where: { id: copy_id } });
    if (!member) {
      return new NotFoundException("The member doesn't exist.");
    }
    if (!copy) {
      return new NotFoundException("The copy doesn't exist.");
    }
    const newTransaction =
      this.transactionRepository.create(transactionPayload);
    newTransaction.member = member;
    newTransaction.copy = copy;
    return this.transactionRepository.save(newTransaction);
  }

  get() {
    return this.transactionRepository.find();
  }

  update(id: number, updateMemberDetails: UpdateTransactionDto) {
    return this.transactionRepository.update(
      { id },
      { ...updateMemberDetails },
    );
  }

  getById(id: number) {
    return this.transactionRepository.findOneBy({ id });
  }

  delete(id: number) {
    return this.transactionRepository.delete({ id });
  }
}
