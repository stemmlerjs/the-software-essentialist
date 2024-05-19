
import { Spy } from "../../../../shared/testDoubles/spy";
import { TransactionEmailAPI, SendMailInput } from "../../ports/transactionalEmailAPI";

export class TransactionalEmailAPISpy extends Spy<TransactionEmailAPI> implements TransactionEmailAPI {

  constructor () {
    super();
  }

  async sendMail(input: SendMailInput): Promise<boolean> {
    this.addCall('sendMail', [input]);
    return true;
  }
}