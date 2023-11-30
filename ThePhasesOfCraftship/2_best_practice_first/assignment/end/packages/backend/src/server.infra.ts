
import { Server } from "./server";

describe('server', () => {
  const server = new Server();

  it('can start', async () => {
    await server.start();
    expect(server.isStarted()).toBeTruthy();
  });

  it('can stop', async () => {
    await server.stop();
    expect(server.isStarted()).toBeFalsy();
  });
});