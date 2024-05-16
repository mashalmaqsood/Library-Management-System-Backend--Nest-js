import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/typeorm/entties/book.entitty';
import { Repository } from 'typeorm';
import { CreateBookDto } from '../dtos/CreateBook.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}

  createBook(bookPayload : CreateBookDto) {
    console.log(typeof bookPayload.title)
    console.log('book payloadd', bookPayload);
    const newBook = this.bookRepository.create(bookPayload);
    return this.bookRepository.save(newBook);
  }

  async getBooks() {
    return this.bookRepository.find();
  }

  updateBook(id, updateBookDetails) {
    return this.bookRepository.update({ id }, { ...updateBookDetails });
  }

  getBookById(id: number) {
    return this.bookRepository.findOneBy({ id });
  }

  deleteBook(id: number) {
    return this.bookRepository.delete({ id });
  }
}
