import { Module } from '@nestjs/common';
import { CopiesController } from './controller/copies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Copy } from '../typeorm/entties/copy.entity';
import { Book } from '../typeorm/entties/book.entitty';
import { CopyService } from './service/copies.service';

@Module({
  imports : [TypeOrmModule.forFeature([
    Copy, Book
   ])],
  controllers: [CopiesController],
  providers: [CopyService],
})
export class CopiesModule {}
