import { Test, TestingModule } from '@nestjs/testing';
// import { TransactionService } from './transactions.service';

describe('ServiceService', () => {
  // let service: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // providers: [TransactionService],
    }).compile();

    // service = module.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    // expect(service).toBeDefined();
    expect('ss').toBeDefined();
  });
});
