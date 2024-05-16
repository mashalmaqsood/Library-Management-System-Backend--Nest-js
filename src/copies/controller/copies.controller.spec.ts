import { Test, TestingModule } from '@nestjs/testing';
import { CopiesController } from './copies.controller';

describe('ControllerController', () => {
  let controller: CopiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CopiesController],
    }).compile();

    controller = module.get<CopiesController>(CopiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
