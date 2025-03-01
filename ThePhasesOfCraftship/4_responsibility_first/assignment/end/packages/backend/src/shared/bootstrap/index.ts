
import { CompositionRoot } from "../compositionRoot";
import { Config } from "../config";
const config = new Config("start");

export async function bootstrap() {
  const composition = CompositionRoot.createCompositionRoot(config);
  return composition.start();
}



// const webServer = composition.getWebServer();
// const dbConnection = composition.getDatabase();
// export const app = webServer.getApplication();
// export const database = dbConnection;
