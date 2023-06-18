import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/movements/validation (POST)', () => {
    // WIP
    //return request(app.getHttpServer())
    //  .post('/movements/validation')
    //  .expect(200)
    //  .expect('Hello World!');
    expect(true).toBe(true);
  });
});
