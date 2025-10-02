import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { AppModule } from "../app.module";
import { uniqueEmail } from "./utils";

describe("Auth E2E", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should register a new user", async () => {
    const email = uniqueEmail("register");
    const password = "password123";

    return request(app.getHttpServer())
      .post("/auth/register")
      .send({ email, password })
      .expect(201);
  });

  it("should login an existing user", async () => {
    const email = uniqueEmail("login");
    const password = "password123";

    await request(app.getHttpServer())
      .post("/auth/register")
      .send({ email, password })
      .expect(201);

    return request(app.getHttpServer())
      .post("/auth/login")
      .send({ email, password })
      .expect(200)
      .expect((res) => {
        expect(res.body.accessToken).toBeDefined();
      });
  });
});
