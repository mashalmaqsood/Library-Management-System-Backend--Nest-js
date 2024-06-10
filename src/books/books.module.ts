import { Module } from '@nestjs/common';
import { BooksController } from './controller/books.controller';
import { BookService } from './service/books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../typeorm/entties/book.entitty';

@Module({
  imports : [TypeOrmModule.forFeature([
   Book
  ])],
  controllers: [BooksController],
  providers: [BookService]
})
export class BooksModule {}
