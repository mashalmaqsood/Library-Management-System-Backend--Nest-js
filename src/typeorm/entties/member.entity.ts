import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Copy } from './copy.entity';
import { Loan } from './loan.entity';
import { Transaction } from './transaction.entity';

@Entity({ name: 'members' })
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;
  
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
  
  @OneToMany(() => Loan, (loan) => loan.member)
  loans: Loan[];

  @OneToMany(() => Transaction, (transaction) => transaction.member)
  transactions: Transaction[];
}
