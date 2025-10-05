import request from "supertest";
import { createTestApp, loginAsAdmin, loginAsUser } from "./utils";

describe("Orders E2E", () => {
  let app, adminToken, userToken, productId;

  beforeAll(async () => {
    app = await createTestApp();

    adminToken = await loginAsAdmin(app);

    const productRes = await request(app.getHttpServer())
      .post("/products")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        title: "Order Test Product",
        price: 500,
        inventory: 5,
        description: "Order made during testing",
        category: "Test",
      })
      .expect(201);

    productId = productRes.body.id;
    console.log("User...", productRes.body);

    userToken = await loginAsUser(app);

    // const newCart = await request(app.getHttpServer())
    //   .post("/cart/add")
    //   .set("Authorization", `Bearer ${userToken}`)
    //   .send({ productId, quantity: 1 })
    //   .expect(201);
  });

  // beforeEach(async () => {
  //   await request(app.getHttpServer())
  //     .post("/cart/add")
  //     .set("Authorization", `Bearer ${userToken}`)
  //     .send({ productId, quantity: 1 })
  //     .expect(201);

  //   // await new Promise((r) => setTimeout(r, 50));
  // });

  afterAll(async () => {
    await app.close();
  });

  it("should place an order", async () => {
    await request(app.getHttpServer())
      .post("/cart/add")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ productId, quantity: 1 })
      .expect(201);

    const res = await request(app.getHttpServer())
      .post("/orders")
      .set("Authorization", `Bearer ${userToken}`)
      .send({})
      .expect(201);

    console.log("User Order...", res.body);
    expect(res.body).toHaveProperty("id");
    expect(res.body.items[0].product.id).toBe(productId);
  });

  it("should fail when product is out of stock", async () => {
    await request(app.getHttpServer())
      .post("/cart/add")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ productId, quantity: 999 })
      .expect(201);

    await request(app.getHttpServer())
      .post("/orders")
      .set("Authorization", `Bearer ${userToken}`)
      .send({})
      .expect(400);
  });
});
