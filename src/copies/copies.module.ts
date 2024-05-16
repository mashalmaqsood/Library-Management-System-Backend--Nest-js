import { Module } from '@nestjs/common';
import { CopiesController } from './controller/copies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Copy } from 'src/typeorm/entties/copy.entity';
import { CopyService } from './service/copies.service';

@Module({
  imports : [TypeOrmModule.forFeature([
    Copy
   ])],
  controllers: [CopiesController],
  providers: [CopyService]
})
export class CopiesModule {}
