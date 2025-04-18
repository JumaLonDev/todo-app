export default async () => {
  if (globalThis.__APP__?.server) {
    await new Promise((resolve) => globalThis.__APP__.server.close(resolve));
  }
};
