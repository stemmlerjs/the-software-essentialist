import { CompositionRoot } from "../composition/compositionRoot";

const composition = new CompositionRoot();
const webServer = composition.getWebServer();

export async function bootstrap () {
  await webServer.start();
}