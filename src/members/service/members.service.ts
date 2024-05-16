import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from 'src/typeorm/entties/member.entity';
import { Repository } from 'typeorm';
import { CreateMemberDto } from '../dtos/CreateMember.dto';
import { UpdateMemberDto } from '../dtos/UpdateMember.dto';

@Injectable()
export class MemberService {
    @InjectRepository(Member) private memberRepository: Repository<Member> 
    constructor(){}
  
    createMember(memberPayload : CreateMemberDto) {
      const newMember = this.memberRepository.create(memberPayload);
      return this.memberRepository.save(newMember);
    }

    getMembers() {
      return this.memberRepository.find();
    }
  
    updateMember(id : number, updateMemberDetails : UpdateMemberDto) {
      return this.memberRepository.update({ id }, { ...updateMemberDetails });
    }
  
    getMemberById(id: number) {
      return this.memberRepository.findOneBy({ id });
    }
  
    deleteMember(id: number) {
      return this.memberRepository.delete({ id });
    }
}
