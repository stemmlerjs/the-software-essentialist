import { CompositionRoot } from "../composition/compositionRoot";
import { config } from "../config";

const composition = CompositionRoot.createCompositionRoot(config.context.env);
const webServer = composition.getWebServer();
const dbConnection = composition.getDBConnection();

export async function bootstrap () {
  await dbConnection.connect();
  await webServer.start();
}