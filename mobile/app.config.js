import "dotenv/config";

export default {
  expo: {
    name: "micro-commerce",
    slug: "micro-commerce",
    version: "1.0.0",
    orientation: "portrait",
    extra: {
      backendUrl: process.env.BACKEND_URL,
    },
  },
};
