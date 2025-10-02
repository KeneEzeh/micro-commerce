module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testTimeout: 20000,
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "src",
  testMatch: ["**/?(*.)+(spec|e2e-spec).[jt]s?(x)"],
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverage",
};
