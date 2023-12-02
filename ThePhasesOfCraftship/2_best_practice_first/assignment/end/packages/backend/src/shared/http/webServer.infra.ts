
import { CompositionRoot } from "../composition/compositionRoot";

describe('server', () => {
  const compositionRoot = new CompositionRoot();
  const server = compositionRoot.getWebServer();

  it('can start', async () => {
    await server.start();
    expect(server.isStarted()).toBeTruthy();
  });

  it('can stop', async () => {
    await server.stop();
    expect(server.isStarted()).toBeFalsy();
  });
});