
import { ExpressRESTAPI } from "../../../infra/api/expressRestAPI";
import { DatabaseConnection } from "../../../infra/database/ports/databaseConnection";

export abstract class ApplicationDriver {

  protected api: ExpressRESTAPI;
  protected databaseConnection: DatabaseConnection;

  constructor (api: ExpressRESTAPI, databaseConnection: DatabaseConnection) {
    this.api = api;
    this.databaseConnection = databaseConnection;
  }

  async start (): Promise<void> {
    await this.databaseConnection.connect();
    // Runs the migrations
    // Runs any seeders
    await this.api.start();
  }

  async stop (): Promise<void> {
    await this.api.stop();
    await this.databaseConnection.disconnect();
  }
}