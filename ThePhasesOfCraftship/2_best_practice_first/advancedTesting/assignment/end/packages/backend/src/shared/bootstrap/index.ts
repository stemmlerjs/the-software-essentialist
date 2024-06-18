import { CompositionRoot } from "../compositionRoot";
import { Config } from "../config";

const config = new Config("start:dev");

const composition = CompositionRoot.createCompositionRoot(config);
const webServer = composition.getWebServer();
const dbConnection = composition.getDatabase();

export async function bootstrap() {
  await dbConnection.connect();
  await webServer.start();
}

export const app = webServer.getApplication();
export const database = dbConnection;
