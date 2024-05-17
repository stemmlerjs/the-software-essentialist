import { CompositionRoot } from "../composition/compositionRoot";
import { config } from "../config";
import { errorHandler } from "../errors";

const composition = CompositionRoot.createCompositionRoot(
  config.context.env,
  errorHandler,
);
const webServer = composition.getWebServer();
const dbConnection = composition.getDBConnection();

export async function bootstrap() {
  await dbConnection.connect();
  await webServer.start();
}

export const app = webServer.getApplication();
export const database = dbConnection;
