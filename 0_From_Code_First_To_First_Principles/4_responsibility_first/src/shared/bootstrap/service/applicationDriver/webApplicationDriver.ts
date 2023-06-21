
import { ExpressRESTAPI } from '../../../infra/api/expressRestAPI'
import { ApplicationDriver } from './applicationDriver';
import { DatabaseConnection } from '../../../infra/database/ports/databaseConnection';

export class WebApplicationDriver extends ApplicationDriver {
  
  constructor (protected api: ExpressRESTAPI, protected db: DatabaseConnection) {
    super(api, db)
  }
}