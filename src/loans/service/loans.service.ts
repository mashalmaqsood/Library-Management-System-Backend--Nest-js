import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Loan } from 'src/typeorm/entties/loan.entity';
import { Repository } from 'typeorm';
import { CreateLoanDto } from '../dtos/CreateLoan.dto';
import { UpdateLoanDto } from '../dtos/UpdateLoan.dto';

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(Loan) private loanRepository: Repository<Loan>,
  ) {}

  createLoan(loanPayload: CreateLoanDto) {
    const newCopy = this.loanRepository.create(loanPayload);
    return this.loanRepository.save(newCopy);
  }

  getLoans() {
    return this.loanRepository.find();
  }

  updateLoan(id: number, updateLoanDetails: UpdateLoanDto) {
    return this.loanRepository.update({ id }, { ...updateLoanDetails });
  }

  getLoanById(id: number) {
    return this.loanRepository.findOneBy({ id });
  }

  deleteLoan(id: number) {
    return this.loanRepository.delete({ id });
  }
}
