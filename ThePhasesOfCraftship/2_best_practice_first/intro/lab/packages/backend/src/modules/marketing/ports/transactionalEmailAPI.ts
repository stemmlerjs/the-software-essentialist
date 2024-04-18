

export interface SendMailInput {
  to: string;
  subject: string;
  text: string;
}

export interface TransactionEmailAPI {
  sendMail (input: SendMailInput) : Promise<boolean>
}
