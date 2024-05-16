import { Test, TestingModule } from '@nestjs/testing';
import { loansController } from './loans.controller';

describe('loansController', () => {
  let controller: loansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [loansController],
    }).compile();

    controller = module.get<loansController>(loansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
