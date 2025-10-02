import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./users/user.entity";
import { Product } from "./products/product.entity";

const AppDataSource = new DataSource({
  type: "sqlite",
  database: process.env.DB_PATH || "db.sqlite",
  entities: [User, Product],
  synchronize: true,
});

async function seed() {
  await AppDataSource.initialize();
  const userRepo = AppDataSource.getRepository(User);
  const prodRepo = AppDataSource.getRepository(Product);

  const adminExists = await userRepo.findOne({
    where: { email: "admin@example.com" },
  });
  console.log(adminExists);
  if (!adminExists) {
    const admin = userRepo.create({
      email: "admin@example.com",
      password: "Admin123!",
      isAdmin: true,
    });
    await userRepo.save(admin);
    console.log("Created admin admin@example.com / Admin123!");
  }

  const demo = [
    {
      title: "T-shirt",
      description: "Comfortable cotton t-shirt",
      price: 1999,
      inventory: 50,
      category: "clothing",
    },
    {
      title: "Mug",
      description: "Ceramic coffee mug",
      price: 999,
      inventory: 120,
      category: "home",
    },
    {
      title: "Headphones",
      description: "On-ear wireless",
      price: 4999,
      inventory: 10,
      category: "electronics",
    },
  ];

  for (const d of demo) {
    const exists = await prodRepo.findOne({ where: { title: d.title } });
    if (!exists) {
      const p = prodRepo.create(d as any);
      await prodRepo.save(p);
      console.log("Seeded", d.title);
    }
  }

  await AppDataSource.destroy();
  console.log("Seed complete");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
