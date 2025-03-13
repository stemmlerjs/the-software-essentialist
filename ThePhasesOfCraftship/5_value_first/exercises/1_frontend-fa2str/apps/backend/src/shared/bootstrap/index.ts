
import { Config } from "@dddforum/config";
import { CompositionRoot } from "../compositionRoot";

// import { AppConfig } from "../config";
// const config = new AppConfig("start");

const config = Config();

export async function bootstrap() {
  const composition = CompositionRoot.createCompositionRoot(config);
  return composition.start();
}



// const webServer = composition.getWebServer();
// const dbConnection = composition.getDatabase();
// export const app = webServer.getApplication();
// export const database = dbConnection;
