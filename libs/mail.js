const nodemailer = require('nodemailer')
const config = require('../config')

const transporter = nodemailer.createTransport({
  host: 'smtp.mailgun.org',
  port: 587,
  secure: false,
  auth: {
    user: config.mailgun_username,
    pass: config.mailgun_token
  }
})

async function sendMail (options) {
  const mailOptions = {
    from: options.from,
    to: options.to.join(','),
    subject: options.subject,
    text: options.text,
    html: options.html
  }
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) reject(error)
      resolve(info)
    })
  })
}

module.exports = sendMail