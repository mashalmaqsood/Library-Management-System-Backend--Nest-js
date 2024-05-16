import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Copy } from 'src/typeorm/entties/copy.entity';
import { Repository } from 'typeorm';
import { CreateCopyDto } from '../dtos/CreateCopy.dto';
import { UpdateCopyDto } from '../dtos/UpdateCopy.dto';

@Injectable()
export class CopyService {
  constructor(
    @InjectRepository(Copy) private copyRepository: Repository<Copy>,
  ) {}

  createCopy(copyPayload: CreateCopyDto) {
    const newCopy = this.copyRepository.create(copyPayload);
    return this.copyRepository.save(newCopy);
  }

  getCopies() {
    return this.copyRepository.find();
  }

  updateCopy(id, updateCopyDetails: UpdateCopyDto) {
    return this.copyRepository.update({ id }, { ...updateCopyDetails });
  }

  getCopyById(id: number) {
    return this.copyRepository.findOneBy({ id });
  }

  deleteCopy(id: number) {
    return this.copyRepository.delete({ id });
  }
}
