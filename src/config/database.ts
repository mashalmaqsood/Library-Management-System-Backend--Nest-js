import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { Loan } from '../typeorm/entties/loan.entity';
import { Member } from '../typeorm/entties/member.entity';
import { Transaction } from '../typeorm/entties/transaction.entity';
import { Copy } from '../typeorm/entties/copy.entity';
import { Book } from '../typeorm/entties/book.entitty';
export const databaseConfig = (): MysqlConnectionOptions => ({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT) || 3306,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [Loan,Member, Transaction,Copy,Book],
    synchronize: false,
});
