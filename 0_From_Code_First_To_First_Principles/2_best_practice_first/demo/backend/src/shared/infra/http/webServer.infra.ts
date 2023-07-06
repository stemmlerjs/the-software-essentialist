import { CompositionRoot } from "../composition/compositionRoot"

describe('webServer', () => {
  let composition = new CompositionRoot();
  let server = composition.getWebServer();

  it('can start', async () => {
    await server.start();
    expect(server.isStarted()).toBeTruthy();
  })

  it('can stop', async () => {
    await server.stop();
    expect(server.isStarted()).toBeFalsy();
  })
})