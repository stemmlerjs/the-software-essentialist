import nodemailer from "nodemailer";
import { SendMailInput, TransactionalEmailAPI } from "../../ports/transactionalEmailAPI";


const mailSettings = {
  service: process.env.MAIL_SENDER_SERVICE || "gmail",
  user: process.env.MAIL_SENDER_EMAIL_ADDRESS,
  pass: process.env.MAIL_SENDER_PASSWORD,
};

// Create a transporter object using SMTP
const transporter = nodemailer.createTransport({
  service: mailSettings.service,
  auth: {
    user: mailSettings.user,
    pass: mailSettings.pass,
  },
  authMethod: "PLAIN",
});

export class MailjetTransactionalEmail implements TransactionalEmailAPI {
  async sendMail(input: SendMailInput) {
    // Email content
    const mailOptions = {
      from: mailSettings.user,
      ...input,
    };

    try {
      new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) return reject(error);
          return resolve(info);
        });
      });

      return true;
    } catch (err) {
      return false;
    }
  }
}
