import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { DataSource } from "typeorm";
import request from "supertest";

export async function createTestApp(): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.init();

  // if (process.env.NODE_ENV === "test") {
  //   const dataSource = app.get(DataSource);
  //   await dataSource.synchronize(true); // drop & recreate schema
  // }

  return app;
}

export async function loginAsAdmin(app: INestApplication): Promise<string> {
  // await request(app.getHttpServer())
  //   .post("/auth/register")
  //   .send({ email: "admin@test.com", password: "adminpass", isAdmin: true });

  const res = await request(app.getHttpServer())
    .post("/auth/login")
    .send({ email: "admin@example.com", password: "Admin123!" });

  return res.body.accessToken;
}

export async function loginAsUser(app: INestApplication): Promise<string> {
  const email = `user${Date.now()}@test.com`;
  const password = "password123";

  // register normal user
  await request(app.getHttpServer())
    .post("/auth/register")
    .send({ email, password, isAdmin: false })
    .expect(201);

  // login
  const res = await request(app.getHttpServer())
    .post("/auth/login")
    .send({ email, password })
    .expect(200);

  return res.body.accessToken;
}

export function uniqueEmail(prefix: string) {
  return `${prefix}_${Math.random().toString(36).substring(2, 8)}@test.com`;
}
