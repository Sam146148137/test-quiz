// NPM Modules
import nodemailer from 'nodemailer';

// Local Modules
import config from '../config/variables.config';

const { EMAIL } = config;
const {
  EMAIL_HOST, EMAIL_PORT, SERVICE, USERNAME, PASSWORD
} = EMAIL;

const mailer = nodemailer.createTransport({
  host: EMAIL_HOST, port: EMAIL_PORT, service: SERVICE, auth: { user: USERNAME, pass: PASSWORD }
});

export default class EmailUtil {
  static async sendHtml(from, to, subject, html) {
    const mailOptions = {
      to,
      from,
      subject,
      html,
      attachments: [{
        filename: 'logo.png',
        path: `${__dirname}/imageForMessage/logo.png`,
        cid: 'logo'
      }]
    };
    await mailer.sendMail(mailOptions);
  }

  static sendSuccessSignup(email, password) {
    const html = `
<div>
      <style>
      </style>
      <div style="background-color: #263849; max-width: 600px; margin: 0 auto; padding: 10px 20px 0;">
        <div style="padding: 10px; border-bottom: 1px solid #4c5b6f;">
          <img src="cid:logo" alt="logo" width="120" />
        </div>
        <div style="padding: 10px;
          margin-bottom: 40px;">
          <p style="color: #f6f6f6;
          font-family: sans-serif;
          font-size: 14px;
          line-height: 16px;">Դուք հաջողությամբ գրանցվել եք</p>
          <p style="color: #f6f6f6;
          font-family: sans-serif;
          font-size: 14px;
          line-height: 16px;">Կայք մուտք գործելու համար մուտքագրեք հետևյալը</p>
        </div>
        <div style="padding: 5px 10px;
          width: fit-content;
          border: 1px solid #4c5b6f;
          margin: 0 auto;">
          <p style="color: #f6f6f6;
          font-family: sans-serif;
          font-size: 14px;
          font-weight: bold;">Username - ${email}</p>
          <p style="color: #f6f6f6;
          font-family: sans-serif;
          font-size: 14px;
          font-weight: bold;">Password - ${password}</p>
        </div>
        <div style="margin-top: 60px; padding: 10px; border-top: 1px solid #4c5b6f;">
            <p style="font-family: sans-serif;
            color: #94A3BA;
            font-size: 12px;
            line-height: 20px;
            font-weight: 400;">Հայաստանի Հանրապետության Ազգային Ժողով ©1996 - 2022</p>
        </div>
      </div>
    </div>
      
      `;
    EmailUtil.sendHtml(USERNAME, email, 'Email Sucsess', html);
  }

  static sendActivationCode(email, activationCode) {
    const html = `
      <h1> 
         <br>
         Գաղտնաբառը փոխելու համար մուտքագրեք <br>
         հետևյալ կոդը մուտքագրման դաշտում <br>
         Ակտիվացման կոդ - ${activationCode}
      </h1>
      `;
    EmailUtil.sendHtml(USERNAME, email, '', html);
  }
}
