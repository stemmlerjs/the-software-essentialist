import { CompositionRoot } from "../composition/compositionRoot";
import { config } from "../config";

const composition = new CompositionRoot(config.context.env);
const webServer = composition.getWebServer();

export async function bootstrap () {
  await webServer.start();
}