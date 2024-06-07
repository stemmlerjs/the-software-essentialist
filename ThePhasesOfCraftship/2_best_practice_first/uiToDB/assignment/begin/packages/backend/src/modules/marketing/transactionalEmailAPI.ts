export class TransactionalEmailAPI {
  async sendMail(input: { to: string; subject: string; text: string }) {
    console.log(
      `Sending email to ${input.to} with subject ${input.subject} and text ${input.text}`,
    );
  }
}
