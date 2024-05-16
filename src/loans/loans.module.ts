import { Module } from '@nestjs/common';

import { LoanService } from './service/loans.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from 'src/typeorm/entties/loan.entity';
import { loansController } from './controller/loans.controller';

@Module({
  imports : [TypeOrmModule.forFeature([
    Loan
   ])],
  controllers: [loansController],
  providers: [LoanService]
})
export class LoansModule {}
