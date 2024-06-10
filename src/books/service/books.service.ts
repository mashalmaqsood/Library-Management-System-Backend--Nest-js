import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Book} from "../../typeorm/entties/book.entitty"
// import { Book } from '@src/typeorm/entties/book.entitty';
import { Repository } from 'typeorm';
import { CreateBookDto } from '../dtos/CreateBook.dto';
import { UpdateBookDto } from '../dtos/UpdateBook.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}

  async create(bookPayload : CreateBookDto) {
    const {title} = bookPayload;
    const existingBook = await this.bookRepository.findOne({
      where : {title}
    })
    if(existingBook){
      return { message: 'Book with the same title already exists!' };
    }
    const newBook = this.bookRepository.create(bookPayload);
    return this.bookRepository.save(newBook);
  }

  async get() {
    return this.bookRepository.find();
  }

  update(id : number, updateBookDetails : UpdateBookDto) {
    return this.bookRepository.update({ id }, { ...updateBookDetails });
  }

  getById(id: number) {
    return this.bookRepository.findOneBy({ id });
  }

  delete(id: number) {
    return this.bookRepository.delete({ id });
  }
}
