
import { CompositionRoot } from "../composition/compositionRoot";
import { Config } from "../config";

describe('server', () => {
  const compositionRoot = CompositionRoot.createCompositionRoot(new Config('test:infra'))
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

