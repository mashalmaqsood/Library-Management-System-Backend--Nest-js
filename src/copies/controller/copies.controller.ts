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
  Req,
} from '@nestjs/common';
import { CopyService } from '../service/copies.service';
import { CreateCopyDto } from '../dtos/CreateCopy.dto';
import { UpdateCopyDto } from '../dtos/UpdateCopy.dto';
import { Request } from 'express';

@Controller('api/copies')
export class CopiesController {
  constructor(private copyService: CopyService) {}

  @Post('create')
  async create(@Body() copyPayload: CreateCopyDto) {
    try {
      const copy = await this.copyService.create(copyPayload);
      return {
        message: 'Copy created successfully.',
        copy
      }
    } catch (error) {
      return new HttpException(
        'Failed to create a copy',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
      return this.copyService.get();
    }
  }

  async getById(id) {
      const copy = await this.copyService.getById(id);
      if (!copy) {
        throw new HttpException(
          'No records found. The provided ID might not exist.',
          HttpStatus.NOT_FOUND,
        );
      }
      return copy;
  }

  @Put('update/:id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCopyDetails: UpdateCopyDto,
  ) {
      const result = await this.copyService.update(id, updateCopyDetails);
      if (result.affected > 0) {
        return { message: 'Copy details are updated successfully!' };
      } else {
        throw new HttpException(
          'No records updated. The provided ID might not exist.',
          HttpStatus.NOT_FOUND,
        );
      }
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    try{
      const result = await this.copyService.delete(id);
      if (result.affected > 0) {
        return { message: 'Copy details are deleted successfully!' };
      } else {
        throw new HttpException(
          'No records deleted. The provided ID might not exist.',
          HttpStatus.NOT_FOUND,
        );
      }
  }catch(error){
    if(error.code === 'ER_ROW_IS_REFERENCED_2'){
      throw new HttpException("Cannot delete the copy because there are loans assoiciated with it",
      HttpStatus.BAD_REQUEST)
    }
    if(error.status===404){
      throw error
    }
    throw new HttpException(
      'Failed to delete the copy details',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
 }
}
