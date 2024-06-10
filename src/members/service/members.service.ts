import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from '../../typeorm/entties/member.entity';
import { Repository } from 'typeorm';
import { CreateMemberDto } from '../dtos/CreateMember.dto';
import { UpdateMemberDto } from '../dtos/UpdateMember.dto';

@Injectable()
export class MemberService {
  @InjectRepository(Member) private memberRepository: Repository<Member>;
  constructor() {}

  async create(memberPayload: CreateMemberDto) {
    const { email } = memberPayload;
    const existingMember = await this.memberRepository.findOne({
      where: { email },
    });
    if (existingMember) {
      return { message: 'The member already exists.' };
    }
    const newMember = this.memberRepository.create(memberPayload);
    return this.memberRepository.save(newMember);
  }

  get() {
    return this.memberRepository.find();
  }

  update(id: number, updateMemberDetails: UpdateMemberDto) {
    return this.memberRepository.update({ id }, { ...updateMemberDetails });
  }

  getById(id: number) {
    return this.memberRepository.findOneBy({ id });
  }

  delete(id: number) {
    return this.memberRepository.delete({ id });
  }
}
