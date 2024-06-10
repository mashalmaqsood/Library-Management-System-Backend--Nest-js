import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Copy } from '../../typeorm/entties/copy.entity';
import { Book } from '../../typeorm/entties/book.entitty';
import { Repository } from 'typeorm';
import { CreateCopyDto } from '../dtos/CreateCopy.dto';
import { UpdateCopyDto } from '../dtos/UpdateCopy.dto';

@Injectable()
export class CopyService {
  constructor(
    @InjectRepository(Copy) private copyRepository: Repository<Copy>,
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}

  async create(copyPayload: CreateCopyDto) {
    try {
      const bookId = copyPayload.book_id;
      const book = await this.bookRepository.findOne({ where: { id: bookId } });
      if (!book) {
        return new NotFoundException("The book doesn't exist.");
      }
      const newCopy = this.copyRepository.create(copyPayload);
      newCopy.book = book;
      return this.copyRepository.save(newCopy);
    } catch (error) {
      return Error('Internal server error');
    }
  }

  get() {
    return this.copyRepository.find({relations : ['book']});
  }

  update(id: number, updateCopyDetails: UpdateCopyDto) {
    return this.copyRepository.update({ id }, { ...updateCopyDetails });
  }

  getById(id: number) {
    return this.copyRepository.findOneBy({ id });
  }

  delete(id: number) {
    return this.copyRepository.delete({ id });
  }
}
