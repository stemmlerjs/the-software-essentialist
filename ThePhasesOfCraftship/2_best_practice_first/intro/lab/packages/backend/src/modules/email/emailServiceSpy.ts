
import { EmailService, SendMailInput } from "./emailService";
import { Spy } from '@dddforum/shared/tests/support/testDoubles/spy'

export class EmailServiceSpy extends Spy<EmailService> implements EmailService {

  constructor () {
    super();
  }

  async sendMail(input: SendMailInput): Promise<boolean> {
    this.addCall('sendMail', [input]);
    return true;
  }
}