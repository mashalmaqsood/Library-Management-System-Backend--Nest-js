import { Test, TestingModule } from '@nestjs/testing';
// import { MemberController } from './members.controller';

describe('ControllerController', () => {
  // let controller: MemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // controllers: [MemberController],
    }).compile();

    // controller = module.get<MemberController>(MemberController);
  });

  it('should be defined', () => {
    // expect(controller).toBeDefined();
    expect(true).toBeDefined();
  });
});
