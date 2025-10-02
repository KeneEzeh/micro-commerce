import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { AppModule } from "../app.module";
import { createTestApp, loginAsAdmin, uniqueEmail } from "./utils";

describe("Cart E2E", () => {
  let app: INestApplication;
  let token: string;
  let productId: number;

  beforeAll(async () => {
    // const moduleFixture = await Test.createTestingModule({
    //   imports: [AppModule],
    // }).compile();
    app = await createTestApp();

    // app = moduleFixture.createNestApplication();
    await app.init();

    const email = uniqueEmail("cart");
    const password = "password123";

    await request(app.getHttpServer())
      .post("/auth/register")
      .send({ email, password })
      .expect(201);

    const res = await request(app.getHttpServer())
      .post("/auth/login")
      .send({ email, password })
      .expect(200);

    token = await loginAsAdmin(app);
    const newProduct = await request(app.getHttpServer())
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Cart Test Product",
        price: 200,
        inventory: 10,
        description: "Product created for testing",
      })
      .expect(201);

    productId = newProduct.body.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it("should add item to cart", async () => {
    return request(app.getHttpServer())
      .post("/cart/add")
      .set("Authorization", `Bearer ${token}`)
      .send({ productId, quantity: 2 })
      .expect(201);
  });
});
