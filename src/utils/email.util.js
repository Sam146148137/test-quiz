// NPM Modules
import nodemailer from 'nodemailer';

// Local Modules
import config from '../config/variables.config';

const { EMAIL } = config;
const {
  HOST, PORT, SERVICE, USERNAME, PASSWORD
} = EMAIL;

const mailer = nodemailer.createTransport({
  host: HOST,
  port: PORT,
  service: SERVICE,
  auth: { user: USERNAME, pass: PASSWORD }
});

export default class EmailUtil {
  static async sendHtml(from, to, subject, html) {
    const mailOptions = {
      to, from, subject, html
    };
    await mailer.sendMail(mailOptions);
  }

  static async sendSuccessSignup(email) {
    try {
      const html = '<h1> You are success signup </h1>';
      await EmailUtil.sendHtml(USERNAME, email, 'Email Sucsess', html);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
