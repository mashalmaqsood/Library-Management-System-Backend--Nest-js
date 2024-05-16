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
  Put
} from '@nestjs/common';
import { MemberService } from '../service/members.service';
import { CreateMemberDto } from '../dtos/CreateMember.dto';
import { UpdateMemberDto } from '../dtos/UpdateMember.dto';

@Controller('api/members')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Post('createMember')
  async createMember(@Body() memberPayload: CreateMemberDto) {
    return this.memberService.createMember(memberPayload);
  }

  @Get('getMembers')
  getMembers() {
    return this.memberService.getMembers();
  }

  @Get('getMemberById/:id')
  async getMemberById(@Param('id', ParseIntPipe) id: number) {
    const member = await this.memberService.getMemberById(id);
    if (!member) {
      throw new HttpException(
        'No records found. The provided ID might not exist.',
        HttpStatus.NOT_FOUND,
      );
    }
    return member;
  }

  @Put('updateMember/:id')
  async updateMemberById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMemberDetails: UpdateMemberDto,
  ) {
    const member = await this.memberService.updateMember(
      id,
      updateMemberDetails,
    );
    if (member.affected > 0) {
      return { message: 'Member details are updated successfully!' };
    } else {
      throw new HttpException(
        'No records updated. The provided ID might not exist.',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Delete('deleteMember/:id')
  async deleteMember(@Param('id', ParseIntPipe) id: number) {
    const member = await this.memberService.deleteMember(id);
    if (member.affected > 0) {
      return { message: 'Member details are deleted successfully!' };
    } else {
      throw new HttpException(
        'No records deleted. The provided ID might not exist.',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
