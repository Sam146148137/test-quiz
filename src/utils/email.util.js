// NPM Modules
import nodemailer from 'nodemailer';

// Local Modules
import config from '../config/variables.config';

const { EMAIL } = config;
const {
  EMAIL_HOST, EMAIL_PORT, SERVICE, USERNAME, PASSWORD
} = EMAIL;

const mailer = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
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

  static async sendSuccessSignup(email, password) {
    try {
      const html = `
      <h1> 
        Դուք հաջողությամբ գրանցվել եք <br>
        Կայք մուտք գործելու համար մուտքագրեք հետևյալը<br>
        Username - ${email} <br>
        Password - ${password}
      </h1>
      `;
      await EmailUtil.sendHtml(USERNAME, email, 'Email Sucsess', html);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
