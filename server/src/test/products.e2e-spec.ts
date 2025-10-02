import request from "supertest";
import { createTestApp, loginAsAdmin } from "./utils";

describe("Products E2E", () => {
  let app, token;

  beforeAll(async () => {
    app = await createTestApp();
    token = await loginAsAdmin(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it("should allow admin to create a product", async () => {
    const res = await request(app.getHttpServer())
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Laptop",
        description: "Slim portable laptop ",
        price: 2000,
        inventory: 5,
        category: "electronics",
      })
      .expect(201);

    expect(res.body).toHaveProperty("id");
  });

  it("should validate DTO (missing fields)", async () => {
    await request(app.getHttpServer())
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send({ price: 2000 })
      .expect(400);
  });

  it("should list products", async () => {
    const res = await request(app.getHttpServer()).get("/products").expect(200);

    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
