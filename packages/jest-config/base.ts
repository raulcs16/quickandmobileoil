import type { Config } from "@jest/types";

const workingDir = ".";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  collectCoverage: false,
  collectCoverageFrom: [`<rootDir>/src/${workingDir}/**/*.ts`],
  // Changed from /**.test/*.ts to look for any .test.ts or .spec.ts files inside src
  testMatch: [`<rootDir>/src/${workingDir}/**/*.test.ts`, `<rootDir>/src/${workingDir}/**/*.spec.ts`],
};

export default config;