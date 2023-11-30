
import nodemailer from 'nodemailer'

const mailSettings = {
  service: process.env.MAIL_SENDER_SERVICE || 'gmail',
  user: process.env.MAIL_SENDER_EMAIL_ADDRESS,
  pass: process.env.MAIL_SENDER_PASSWORD
}

// Create a transporter object using SMTP
const transporter = nodemailer.createTransport({
  service: mailSettings.service,
  auth: {
    user: mailSettings.user,
    pass: mailSettings.pass
  },
  authMethod: 'PLAIN'
});

interface SendMailInput {
  to: string;
  subject: string;
  text: string;
}

export function sendMail (input: SendMailInput) {
  // Email content
  let mailOptions = {
    from: mailSettings.user,
    ...input
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return reject(error);
      return resolve(info);
    });
  })
}

