import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Loan } from '../../typeorm/entties/loan.entity';
import { Member } from '../../typeorm/entties/member.entity';
import { Copy } from '../../typeorm/entties/copy.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateLoanDto } from '../dtos/CreateLoan.dto';
import { UpdateLoanDto } from '../dtos/UpdateLoan.dto';

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(Loan) private loanRepository: Repository<Loan>,
    @InjectRepository(Member) private memberRepository: Repository<Member>,
    @InjectRepository(Copy) private copyRepository: Repository<Copy>,
  ) {}
  async create(loanPayload: CreateLoanDto) {
    const memberId = loanPayload.member_id;
    const copyId = loanPayload.copy_id;
    const member = await this.memberRepository.findOne({
      where: { id: memberId },
    });
    const copy = await this.copyRepository.findOne({ where: { id: copyId } });
    if (!member) {
      throw new NotFoundException("The member doesn't exist.");
    }
    if (!copy) {
      throw new NotFoundException("The copy doesn't exist.");
    }
    const newLoan = this.loanRepository.create(loanPayload);
    newLoan.member = member;
    newLoan.copy = copy;
    return this.loanRepository.save(newLoan);
  }

  get() {
    return this.loanRepository.find({ relations: ['copy', 'member'] });
  }

  update(id: number, updateLoanDetails: UpdateLoanDto): Promise<UpdateResult> {
    return this.loanRepository.update({ id }, { ...updateLoanDetails });
  }

  async getById(id: number) {
    return await this.loanRepository.findOneBy({ id });
  }

  delete(id: number): Promise<DeleteResult> {
    return this.loanRepository.delete({ id });
  }
}
