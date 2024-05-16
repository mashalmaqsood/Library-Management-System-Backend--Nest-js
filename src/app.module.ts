import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CopiesModule } from './copies/copies.module';
import { LoansModule } from './loans/loans.module';
import { MembersModule } from './members/members.module';
import { TransactionsModule } from './transactions/transactions.module';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './config/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      // load: [databaseConfig]
    }),
    // TypeOrmModule.forRoot({
    //   type : 'mysql',
    //   host: '127.0.0.1',
    //   port : 3306,
    //   username : "root",
    //   password : "password",
    //   database : 'LMS Nest js',
    //   entities : [Book,Copy,Loan,Member,Transaction],
    //   // synchronize : true
    // }),
    TypeOrmModule.forRoot(databaseConfig()),
    BooksModule,
    CopiesModule,
    LoansModule,
    MembersModule,
    TransactionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
