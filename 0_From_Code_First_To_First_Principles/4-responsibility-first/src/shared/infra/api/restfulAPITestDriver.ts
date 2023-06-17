
import { killProcessOnPort } from '../process/killOnPort';
import { ExpressRESTAPI } from './expressRestAPI'

export class RESTfulAPITestDriver {
  
  constructor (private api: ExpressRESTAPI) {

  }

  registerUser () {

  }


  stop () {

  }

  start () {
    
  }

  async setup () {
    killProcessOnPort(3000);
    await this.api.start();
  }
}