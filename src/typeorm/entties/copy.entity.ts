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
import { Book } from './book.entitty';
import { Loan } from './loan.entity';
import { Transaction } from './transaction.entity';

@Entity({ name: 'copies' })
export class Copy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Book, (book) => book.copies)
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @OneToMany(() => Loan, (loan) => loan.copy)
  loans: Loan[];

  @OneToMany(() => Transaction, (transaction) => transaction.copy)
  transactions: Transaction[];
}
