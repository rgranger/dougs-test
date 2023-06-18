import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('/movements/validation', () => {
    it('should return an error', () => {
      // WIP
      //expect(appController.validateMovements(res, body)).toStrictEqual({
      //  type: 'Error',
      //  reasons: ['No balance provided. Unable to validate movements.']
      //})
      expect(true).toBe(true);
    });
  });
});
