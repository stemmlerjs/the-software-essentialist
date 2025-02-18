export interface SendMailInput {
  to: string;
  subject: string;
  text: string;
}

export interface TransactionalEmailAPI {
  sendMail(input: SendMailInput): Promise<boolean>;
}
