import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Copy } from './copy.entity';
import { Member } from './member.entity';

@Entity({ name: 'transactions' })
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  transactionDate: Date;

  @Column()
  transactionType: string;

  @Column()
  amount: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Copy, (copy) => copy.transactions)
  @JoinColumn({ name: 'copy_id' })
  copy: Copy;

  @ManyToOne(() => Member, (member) => member.transactions)
  @JoinColumn({ name: 'member_id' })
  member: Member;
}
