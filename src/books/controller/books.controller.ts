import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { BookService } from '../service/books.service';
import { CreateBookDto } from '../dtos/CreateBook.dto';
import { UpdateBookDto } from '../dtos/UpdateBook.dto';
import { Request } from 'express';

@Controller('api/books')
export class BooksController {
  constructor(private bookService: BookService) {}

  @Post('create')
  async create(@Body() bookPayload: CreateBookDto) {
    const book = await this.bookService.create(bookPayload);
    return {
      message: 'Book created successfully.',
      book,
    };
  }

  @Get('get')
  get(@Req() request: Request) {
    const { id } = request.query;
    if (id !== undefined && id !== '') {
      return this.getById(id);
    } else if (
      Object.keys(request.query).includes('id') &&
      (id === undefined || id === '')
    ) {
      throw new HttpException(
        'ID is not specified. Please provide a valid ID.',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return this.bookService.get();
    }
  }

  async getById(id) {
    const book = await this.bookService.getById(id);
    if (!book) {
      throw new HttpException(
        'No records found. The provided ID might not exist.',
        HttpStatus.NOT_FOUND,
      );
    }
    return book;
  }

  @Put('update/:id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDetails: UpdateBookDto,
  ) {
    const book = await this.bookService.update(id, updateBookDetails);
    if (book.affected > 0) {
      return { message: 'Book details are updated successfully!'};
    } else {
      throw new HttpException(
        'No records updated. The provided ID might not exist.',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      const book = await this.bookService.delete(id);
      if (book.affected > 0) {
        return { message: 'Book details are deleted successfully!' };
      } else {
        throw new HttpException(
          'No records deleted. The provided ID might not exist.',
          HttpStatus.NOT_FOUND
        );
      }
    } catch (error) {
      if(error.code === 'ER_ROW_IS_REFERENCED_2'){
        throw new HttpException("Cannot delete the book because there are copies assoiciated with it",
        HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(
        'Failed to delete the book details',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
