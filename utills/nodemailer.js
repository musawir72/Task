import nodemailer from 'nodemailer'
var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "41cb3cb9d7d7fe",
      pass: "0af3d5ca547c16"
    }
  });

  export {transport}