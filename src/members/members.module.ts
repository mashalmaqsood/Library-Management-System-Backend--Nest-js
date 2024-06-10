import { Module } from '@nestjs/common';
import { MemberController } from './controller/members.controller';
import { MemberService } from './service/members.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../typeorm/entties/member.entity';

@Module({
  imports : [TypeOrmModule.forFeature([
    Member
   ])],
  controllers: [MemberController],
  providers: [MemberService]
})
export class MembersModule {}
