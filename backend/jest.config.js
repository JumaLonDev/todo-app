export default {
  testEnvironment: "node",
  setupFiles: ["dotenv/config"],
  testEnvironmentOptions: {
    NODE_ENV: "test",
    DB_PATH: ":memory:",
  },
  transform: {},
  globalTeardown: "./jest.teardown.js",
  detectOpenHandles: true,
  forceExit: true,
};
