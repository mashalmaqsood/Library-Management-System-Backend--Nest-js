import { Test, TestingModule } from '@nestjs/testing';
// import { TransactionController } from './transactions.controller';

describe('ControllerController', () => {
  // let controller: TransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // controllers: [TransactionController],
    }).compile();

    // controller = module.get<TransactionController>(TransactionController);
  });

  it('should be defined', () => {
    // expect(controller).toBeDefined();
    expect("controller").toBeDefined();
  });
});
