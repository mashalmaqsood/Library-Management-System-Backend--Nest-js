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

  it('Should return array of books.', async () => {
    let res = await request(app.getHttpServer()).get('/api/books/get').expect(200);
    expect(res.body.length).toBeGreaterThanOrEqual(0);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it("Should return the object of book of the given id.", async () => {
    let res = await request(app.getHttpServer()).get('/api/books/get?id=4').expect(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.id).toBe(4);
    expect(Object.keys(res.body).length).toBe(9);
  });

  it("Should return error if id is missing.", async () => {
    let res = await request(app.getHttpServer()).get('/api/books/get?id=').expect(400)
    expect(res.error).toEqual(expect.any(Error));
  });

  it("Should return error if id doesn't exist.", async () => {
    let res = await request(app.getHttpServer()).get('/api/books/get?id=900').expect(404)
    expect(res.status).toBe(404);
    expect(res.error).toEqual(expect.any(Error));
  });

  it("should return a success message when a book record is created", async () => {
    let res = await request(app.getHttpServer()).post("/api/books/create").send({
      title: "new book",
      author: "Robert C. Martin",
      ISBN: "978-0132350884",
      genre: "Software Engineering",
      publishedYear: 2008,
      publisher: "Prentice Hall",
    });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Book created successfully.");
});

  it("should return an error if required field is missing", async () => {
    let res = await request(app.getHttpServer()).post("/api/books/create").send({
      title: "no",
      author: "Robert C. Martin",
      ISBN: "978-0132350884",
      genre: "Software Engineering",
      // publishedYear: 2008,
      publisher: "Prentice Hall",
    });
    expect(res.status).toBe(400);
    expect(res.error).toEqual(expect.any(Error));
  });

  it("Should return error if any field's type is not correct.", async () => {
    let res = await request(app.getHttpServer()).post("/api/books/create").send({
      title: 123,
      author: "Robert C. Martin",
      ISBN: "978-0132350884",
      genre: "Software Engineering",
      publishedYear: 2008,
      publisher: "Prentice Hall",
    });
    expect(res.status).toBe(400);
    expect(res.error).toEqual(expect.any(Error));
  });

  it("should return a success message when a record is updated", async () => {
    let res = await request(app.getHttpServer()).put("/api/books/update/4").send({
      title: "Clean code guide",
    }).expect(200);
    expect(res.body.message).toEqual("Book details are updated successfully!");
  });

  it("Should return error if the given id is not integer.", async () => {
    let res = await request(app.getHttpServer()).put("/api/books/update/hss").send({
      title: "Clean code guide",
    }).expect(400);
    expect(res.status).toBe(400);
    expect(res.error).toEqual(expect.any(Error));
    expect(res.body.message).toBe('Validation failed (numeric string is expected)');
  });

  it("Should return error if id doesn't exist in records.", async () => {
    let res = await request(app.getHttpServer()).put("/api/books/update/100").send({
      title: "Clean code guide",
    });
    expect(res.status).toBe(404);
    expect(res.error).toEqual(expect.any(Error));
    expect(res.body.message).toBe('No records updated. The provided ID might not exist.');
  });

  // it("should return a success message when a record is deleted", async () => {
  //   let res = await request(app.getHttpServer()).delete("/api/books/delete/16");
  //   console.log("Res",res);
  //   expect(res.status).toBe(200);
  //   expect(res.body.message).toBe('Book details are deleted successfully!');
  // }); 

  it("Should return error if the given id is not integer.", async () => {
    let res = await request(app.getHttpServer()).delete("/api/books/delete/uyt");
    expect(res.status).toBe(400);
    expect(res.error).toEqual(expect.any(Error));
    expect(res.body.message).toBe('Validation failed (numeric string is expected)');
  }); 

 it("Should return error as copy table has bookId as foreign key '.", async () => {
      let res = await request(app.getHttpServer()).delete("/api/books/delete/1");
      expect(res.status).toBe(400);
      expect(res.error).toEqual(expect.any(Error));
  });

})

