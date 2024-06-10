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

  it('Should return array of members.', async () => {
    let res = await request(app.getHttpServer()).get('/api/members/get').expect(200);
    expect(res.body.length).toBeGreaterThanOrEqual(0);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it("Should return the object of member of the given id.", async () => {
    let res = await request(app.getHttpServer()).get('/api/members/get?id=1').expect(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.id).toBe(1);
    expect(Object.keys(res.body).length).toBe(7);
  });

  it("Should return error if id is missing.", async () => {
    let res = await request(app.getHttpServer()).get('/api/members/get?id=').expect(400)
    expect(res.error).toEqual(expect.any(Error));
  });

  it("Should return error if id doesn't exist.", async () => {
    let res = await request(app.getHttpServer()).get('/api/members/get?id=900').expect(404)
    expect(res.status).toBe(404);
    expect(res.error).toEqual(expect.any(Error));
  });

//   it("should return a success message when a member record is created", async () => {
//     let res = await request(app.getHttpServer()).post("/api/members/create").send({
//             name : "sania",
//             email : "sania@gmail.com",
//             phone : "0321-5263489",
//             address : "Dha Lahore"
//     });
//     expect(res.status).toBe(201);
//     expect(res.body.message).toBe("Member created successfully");
// });

  it("should return an error if required field is missing", async () => {
    let res = await request(app.getHttpServer()).post("/api/members/create").send({
        name : "sania",
        email : "sania@gmail.com",
        // phone : "0321-5263489",
        address : "Dha Lahore"
    });
    expect(res.status).toBe(400);
    expect(res.error).toEqual(expect.any(Error));
  });

  it("Should return error if any field's type is not correct.", async () => {
    let res = await request(app.getHttpServer()).post("/api/members/create").send({
        name : 765,
        email : "sania@gmail.com",
        phone : "0321-5263489",
        address : "Dha Lahore"
    });
    expect(res.status).toBe(400);
    expect(res.error).toEqual(expect.any(Error));
  });

  it("should return a success message when a record is updated", async () => {
    let res = await request(app.getHttpServer()).put("/api/members/update/1").send({
        name : "Mashal Maqsood"
    }).expect(200);
    expect(res.body.message).toEqual("Member details are updated successfully!");
  });

  it("Should return error if the given id is not integer.", async () => {
    let res = await request(app.getHttpServer()).put("/api/members/update/hss").send({
        name : "Mashal Maqsood"
    }).expect(400);
    expect(res.status).toBe(400);
    expect(res.error).toEqual(expect.any(Error));
    expect(res.body.message).toBe('Validation failed (numeric string is expected)');
  });

  it("Should return error if id doesn't exist in records.", async () => {
    let res = await request(app.getHttpServer()).put("/api/members/update/100").send({
        name : "Mashal Maqsood"
    });
    expect(res.status).toBe(404);
    expect(res.error).toEqual(expect.any(Error));
    expect(res.body.message).toBe('No records updated. The provided ID might not exist.');
  });

//   it("should return a success message when a record is deleted", async () => {
//     let res = await request(app.getHttpServer()).delete("/api/members/delete/3");
//     console.log("Res",res);
//     expect(res.status).toBe(200);
//     expect(res.body.message).toBe('Member details are deleted successfully!');
//   }); 

  it("Should return error if the given id is not integer.", async () => {
    let res = await request(app.getHttpServer()).delete("/api/members/delete/uyt");
    expect(res.status).toBe(400);
    expect(res.error).toEqual(expect.any(Error));
    expect(res.body.message).toBe('Validation failed (numeric string is expected)');
  }); 

//  it("Should return error as copy table has bookId as foreign key '.", async () => {
//       let res = await request(app.getHttpServer()).delete("/api/books/delete/1");
//       expect(res.status).toBe(400);
//       expect(res.error).toEqual(expect.any(Error));
//   });
  
})

