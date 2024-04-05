

export interface SendMailInput {
  to: string;
  subject: string;
  text: string;
}

export interface EmailService {
  sendMail (input: SendMailInput) : Promise<boolean>
}
