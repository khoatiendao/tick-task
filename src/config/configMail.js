const mailer = require('nodemailer');
require('dotenv').config();
const hbs = require('handlebars');
const fs = require('fs');
const path = require('path');
const jwtToken = require('../config/configJwt');
// const mail_template = require('../../resource/hbs/mail_template.hbs')
const transporter = mailer.createTransport({
  host: 'smtp.gmail.com', // SMTP server của gmail
  port: '465', // port của SMTP server
  secure: 'true', // sử dụng SSL/TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // bỏ qua lỗi self-signed certificate
  },
});

const readFileHtml = (path, callback) => {
  fs.readFile(path, { encoding: 'utf-8' }, (err, html) => {
    if (err) {
      callback(err);
      throw err;
    } else {
      callback(null, html);
    }
  });
};

const createMail = {
  send(email, name) {
    return new Promise((resolve, reject) => {
      try {
        readFileHtml(
          path.join(__dirname, '../../resource/hbs/mail_template.hbs'),
          (err, html) => {
            if (err) {
              reject('Error loading templates');
            } else {
              const tokenEmail = jwtToken.generatedTokenMail(email);
              const url = `http://localhost:8443/api/v1/user/confirmation/${tokenEmail}`;
              const template = hbs.compile(html);
              const htmlToSend = template({ url, name });
              const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Confirm Email',
                html: htmlToSend,
                attachments: [
                  {
                    filename: 'logo.png',
                    path: path.join(
                      __dirname,
                      '../../resource/assets/img/logo.png'
                    ),
                    contentDisposition: 'inline', // hình ảnh sẽ hiển thị ở bên trong mail chứ không là tệp đính kèm
                    cid: 'logo@png.cid', // Content-ID cho ảnh
                  },
                  // {
                  //   filename: 'banner.svg',
                  //   path: path.join(__dirname, '../../resource/assets/img/banner.svg'),
                  //   contentDisposition: 'inline', // hình ảnh sẽ hiển thị ở bên trong mail chứ không là tệp đính kèm
                  //   cid: 'banner@svg.cid', // Content-ID cho ảnh
                  // }
                ],
              };

              transporter.sendMail(mailOptions, (err, info) => {
                if (err) reject(err);
                resolve(true);
              });
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
    });
  },

  sendMailTask(emailUser, taskDetail) {
    return new Promise((resolve, reject) => {
      try {
        readFileHtml(
          path.join(__dirname, '../../resource/hbs/mailDeadline_template.hbs'),
          (err, html) => {
            if (err) {
              reject('Error loading templates');
            } else {
              const template = hbs.compile(html);
              const htmlToSend = template({ emailUser, taskDetail });
              const mailOptions = {
                from: process.env.EMAIL_USER,
                to: emailUser,
                subject: 'Task Deadline',
                html: htmlToSend,
                attachments: [
                  {
                    filename: 'logo.png',
                    path: path.join(
                      __dirname,
                      '../../resource/assets/img/logo.png'
                    ),
                    cid: 'logo@image.cid', // Content-ID cho ảnh
                  }
                ],
              };

              transporter.sendMail(mailOptions, (err, info) => {
                if (err) reject(err);
                resolve(true);
              });
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
    });
  },
};

module.exports = createMail
