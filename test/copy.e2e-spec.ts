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

  it('Should return array of copies.', async () => {
    let res = await request(app.getHttpServer())
      .get('/api/copies/get')
      .expect(200);
    // console.log('res', res);
    expect(res.body.length).toBeGreaterThanOrEqual(0);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('Should return the object of copy of the given id.', async () => {
    let res = await request(app.getHttpServer())
      .get('/api/copies/get?id=1')
      .expect(200);
    expect(typeof res.body).toBe('object');
    expect(res.body.id).toBe(1);
    expect(Object.keys(res.body).length).toBe(4);
  });

  it('Should return error if id is missing.', async () => {
    let res = await request(app.getHttpServer())
      .get('/api/copies/get?id=')
      .expect(400);
    expect(res.error).toEqual(expect.any(Error));
  });

  it("Should return error if id doesn't exist.", async () => {
    let res = await request(app.getHttpServer())
      .get('/api/copies/get?id=900')
      .expect(404);
    expect(res.status).toBe(404);
    expect(res.error).toEqual(expect.any(Error));
  });

  it('should return a success message when a copy record is created', async () => {
    let res = await request(app.getHttpServer()).post('/api/copies/create').send({
      status: 'Available',
      book_id: 13,
    });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Copy created successfully.');
  });

    it("should return an error if required field is missing", async () => {
      let res = await request(app.getHttpServer()).post("/api/copies/create").send({
        status: 'Available',
        // book_id: 13,
      });
      expect(res.status).toBe(400);
      expect(res.error).toEqual(expect.any(Error));
    });

    it("Should return error if any field's type is not correct.", async () => {
      let res = await request(app.getHttpServer()).post("/api/copies/create").send({
        status: 123,
        book_id: 13,
      });
      expect(res.status).toBe(400);
      expect(res.error).toEqual(expect.any(Error));
    });

  it("should return a success message when a record is updated", async () => {
    let res = await request(app.getHttpServer()).put("/api/copies/update/1").send({
        status: "Available"
    }).expect(200);
    expect(res.body.message).toEqual("Copy details are updated successfully!");
  });

  it("Should return error if the given id is not integer.", async () => {
    let res = await request(app.getHttpServer()).put("/api/copies/update/tegh").send({
        status: "Available"
    });
    expect(res.status).toBe(400);
    expect(res.error).toEqual(expect.any(Error));
    expect(res.body.message).toBe('Validation failed (numeric string is expected)');
  });

  it("Should return error if id doesn't exist in records.", async () => {
    let res = await request(app.getHttpServer()).put("/api/copies/update/100").send({
      status: "Available"
    });
    expect(res.status).toBe(404);
    expect(res.error).toEqual(expect.any(Error));
    expect(res.body.message).toBe('No records updated. The provided ID might not exist.');
  });

  // it("should return a success message when a record is deleted", async () => {
  //   let res = await request(app.getHttpServer()).delete("/api/copies/delete/8");
  //   console.log("Res",res);
  //   expect(res.status).toBe(200);
  //   expect(res.body.message).toBe('Copy details are deleted successfully!');
  // }); 

  it("Should return error if the given id is not integer.", async () => {
    let res = await request(app.getHttpServer()).delete("/api/copies/delete/uyt");
    expect(res.status).toBe(400);
    expect(res.error).toEqual(expect.any(Error));
    expect(res.body.message).toBe('Validation failed (numeric string is expected)');
  }); 

 it("Should return error as loan table has copyId as foreign key '.", async () => {
      let res = await request(app.getHttpServer()).delete("/api/copies/delete/1");
      expect(res.status).toBe(400);
      expect(res.error).toEqual(expect.any(Error));
   });

  afterAll(async () => {
    await app.close();
  });
});
