const {v4: uuidv4} = require('uuid');
const nodemailer = require("nodemailer");

const getRandomUUID = () => {
  return uuidv4();
}

let sendEmail;
(async () => {
  sendEmail = await (async () => {
    const senderAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: senderAccount.user,
        pass: senderAccount.pass,
      },
    });
    
    return async ({receiver, subject, message}) => {
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: `<${senderAccount.user}>`, 
        to: `${receiver}`, 
        subject: `${subject}`,
        text: `${message}`, 
        html: `${message}`, 
      });
  
      console.log("Email sent: %s", info.messageId);
  
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
  })();

})();

module.exports = {
  getRandomUUID,
  sendEmail: async (emailInfo) => {return await sendEmail(emailInfo)},
}