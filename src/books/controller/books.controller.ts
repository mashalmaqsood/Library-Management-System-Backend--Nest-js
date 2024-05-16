import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BookService } from '../service/books.service';
import { CreateBookDto } from '../dtos/CreateBook.dto';
import { UpdateBookDto } from '../dtos/UpdateBook.dto';

@Controller('api/books')
export class BooksController {
  constructor(private bookService: BookService) {}

  @Post('create')
  createBook(@Body() bookPayload: CreateBookDto) {
    console.log('bookpaayload', bookPayload);
    return this.bookService.createBook(bookPayload);
  }

  @Get('get')
  getBooks(@Query('id') id: number) {
    if (id) {
      return this.getBookById(id);
    } else {
      return this.bookService.getBooks();
    }
  }
  
  async getBookById(id: number) {
    const book = await this.bookService.getBookById(id);
    if (!book) {
      throw new HttpException(
        'No records found. The provided ID might not exist.',
        HttpStatus.NOT_FOUND,
      );
    }
    return book;
  }

  @Put('update/:id')
  async updateBookById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDetails: UpdateBookDto,
  ) {
    const book = await this.bookService.updateBook(id, updateBookDetails);
    if (book.affected > 0) {
      return { message: 'Book details are updated successfully!' };
    } else {
      throw new HttpException(
        'No records updated. The provided ID might not exist.',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Delete('delete/:id')
  async deleteBook(@Param('id', ParseIntPipe) id: number) {
    const book = await this.bookService.deleteBook(id);
    if (book.affected > 0) {
      return { message: 'Book details are deleted successfully!' };
    } else {
      throw new HttpException(
        'No records deleted. The provided ID might not exist.',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
