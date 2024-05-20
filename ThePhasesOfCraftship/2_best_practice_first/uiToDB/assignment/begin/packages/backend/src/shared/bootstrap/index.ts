import { CompositionRoot } from "../composition/compositionRoot";
import { config } from "../config";

const composition = CompositionRoot.createCompositionRoot(config.context.env);
const webServer = composition.getWebServer();
const dbConnection = composition.getDatabase();

export async function bootstrap () {
  await webServer.start();
}

export const database = dbConnection;
