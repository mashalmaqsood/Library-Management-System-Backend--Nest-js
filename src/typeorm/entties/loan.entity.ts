import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Copy } from './copy.entity';
import { Member } from './member.entity';

@Entity({ name: 'loans' })
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  loanDate: Date;

  @Column()
  returnDate: Date;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Copy, (copy) => copy.loans)
  @JoinColumn({ name: 'copy_id' })
  copy: Copy;

  @ManyToOne(() => Member, (member) => member.loans)
  @JoinColumn({ name: 'member_id' })
  member: Member;
}
