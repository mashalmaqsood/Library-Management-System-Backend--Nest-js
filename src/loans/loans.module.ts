import { Module } from '@nestjs/common';
import { LoanService } from './service/loans.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { loansController } from './controller/loans.controller';
import { Loan } from '../typeorm/entties/loan.entity';
import { Member } from '../typeorm/entties/member.entity';
import { Copy } from '../typeorm/entties/copy.entity';

@Module({
  imports : [TypeOrmModule.forFeature([
    Loan, Member,Copy
   ])],
  controllers: [loansController],
  providers: [LoanService]
})
export class LoansModule {}
