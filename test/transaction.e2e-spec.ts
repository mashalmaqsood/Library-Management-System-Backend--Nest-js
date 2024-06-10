import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should return array of transactions.', async () => {
    let res = await request(app.getHttpServer()).get('/api/transactions/get').expect(200);
    expect(res.body.length).toBeGreaterThanOrEqual(0);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it("Should return the object of transaction of the given id.", async () => {
    let res = await request(app.getHttpServer()).get('/api/transactions/get?id=2').expect(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.id).toBe(2);
    expect(Object.keys(res.body).length).toBe(6);
  });

  it("Should return error if id is missing.", async () => {
    let res = await request(app.getHttpServer()).get('/api/transactions/get?id=').expect(400)
    expect(res.error).toEqual(expect.any(Error));
  });

  it("Should return error if id doesn't exist.", async () => {
    let res = await request(app.getHttpServer()).get('/api/transactions/get?id=900').expect(404)
    expect(res.status).toBe(404);
    expect(res.error).toEqual(expect.any(Error));
  });

  it("should return an error if required field is missing", async () => {
    let res = await request(app.getHttpServer()).post("/api/transactions/create").send({
        transactionDate : "2024-06-01",
        transactionType :"fine", 
        //  amount : 2000,
         copy_id : 1,
         member_id : 1
    });
    expect(res.status).toBe(400);
    expect(res.error).toEqual(expect.any(Error));
  });

  it("Should return error if any field's type is not correct.", async () => {
    let res = await request(app.getHttpServer()).post("/api/transactions/create").send({
        transactionDate : "2024-06-01",
        transactionType :"fine", 
         amount : "2000",
         copy_id : 1,
         member_id : 1
    });
    expect(res.status).toBe(400);
    expect(res.error).toEqual(expect.any(Error));
  });

  it("should return a success message when a record is updated", async () => {
    let res = await request(app.getHttpServer()).put("/api/transactions/update/3").send({
        transactionType :"Renewal"
    }).expect(200);
    expect(res.body.message).toEqual("Transaction details are updated successfully!");
  });

  it("Should return error if the given id is not integer.", async () => {
    let res = await request(app.getHttpServer()).put("/api/transactions/update/hss").send({
        transactionType :"Renewal"
    }).expect(400);
    expect(res.status).toBe(400);
    expect(res.error).toEqual(expect.any(Error));
    expect(res.body.message).toBe('Validation failed (numeric string is expected)');
  });

  it("Should return error if id doesn't exist in records.", async () => {
    let res = await request(app.getHttpServer()).put("/api/transactions/update/100").send({
        transactionType :"Renewal"
    });
    expect(res.status).toBe(404);
    expect(res.error).toEqual(expect.any(Error));
    expect(res.body.message).toBe('No records updated. The provided ID might not exist.');
  });

  it("Should return error if the given id is not integer.", async () => {
    let res = await request(app.getHttpServer()).delete("/api/transactions/delete/uyt");
    expect(res.status).toBe(400);
    expect(res.error).toEqual(expect.any(Error));
    expect(res.body.message).toBe('Validation failed (numeric string is expected)');
  }); 
})

