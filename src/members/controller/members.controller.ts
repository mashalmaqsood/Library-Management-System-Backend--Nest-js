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
import { MemberService } from '../service/members.service';
import { CreateMemberDto } from '../dtos/CreateMember.dto';
import { UpdateMemberDto } from '../dtos/UpdateMember.dto';
import { Request } from 'express';

@Controller('api/members')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Post('create')
  async create(@Body() memberPayload: CreateMemberDto) {
    try {

      const member = await this.memberService.create(memberPayload);
      return {
        message : "Member created successfully",
        member
      }
    } catch (error) {
      return new HttpException(
        'Failed to create member',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // @Get('get')
  // get(@Query('id') id: number) {
  //   try {
  //     if (id) {
  //       return this.getById(id);
  //     }
  //     return this.memberService.get();
  //   } catch (error) {
  //     return new HttpException(
  //       'Failed to fetch members',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  // async getById(id: number) {
  //   try {
  //     const member = await this.memberService.getById(id);
  //     if (!member) {
  //       return new HttpException(
  //         'No records found. The provided ID might not exist.',
  //         HttpStatus.NOT_FOUND,
  //       );
  //     }
  //     return member;
  //   } catch (error) {
  //     return new HttpException(
  //       'Failed to retrieve member',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

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
      return this.memberService.get();
    }
  }

  async getById(id) {
    const member = await this.memberService.getById(id);
    if (!member){
      throw new HttpException(
        'No records found. The provided ID might not exist.',
        HttpStatus.NOT_FOUND
      );
    }
    return member;
  }

  @Put('update/:id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMemberDetails: UpdateMemberDto,
  ) {
    try {
      const member = await this.memberService.update(id, updateMemberDetails);
      if (member.affected > 0) {
        return { message: 'Member details are updated successfully!' };
      } else {
        throw new HttpException(
          'No records updated. The provided ID might not exist.',
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      if(error.status == 404){
        throw error;
      }
      throw new HttpException(
        'Failed to update member details',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      const member = await this.memberService.delete(id);
      if (member.affected > 0) {
        return { message: 'Member details are deleted successfully!' };
      } else {
        throw new HttpException(
          'No records deleted. The provided ID might not exist.',
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      if(error.status === 404){
        throw error
      }
      throw new HttpException(
        'Failed to delete member record',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
