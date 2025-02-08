const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const twilio = require('twilio');
require('dotenv').config();


const createTransporter = async () => {
    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );
  
    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN
    });
  
    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject();
        }
        resolve(token);
      });
    });
  
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        accessToken,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
      }
    });
  
    return transporter;
  };
  
//Setup Nodemailer for email notifications
// const transporter = nodemailer.createTransport({
//   service: "Gmail",
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     }
    
// });

//Setup Twilio for SMS notifications
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

//Function to send email notification
const sendEmail = async (email, subject, message) => {

    console.log(`📧 Attempting to send email to: ${email}`); 
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: message
    };

    try {
        let emailTransporter = await createTransporter();
        let info = await emailTransporter.sendMail(mailOptions);
        console.log(`✅ Email sent: ${info.response}`); 
    } catch (error) {
        console.error(`❌ Email error: ${error.message}`);
    }
};

//Function to send SMS notification
const sendSMS = async (phone, message) => {
    console.log(`📱 Attempting to send SMS to: ${phone}`);

    try {
        let messageResponse = await twilioClient.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE,
            to: phone
        });
        console.log(`✅ SMS sent: ${messageResponse.sid}`);
    } catch (error) {
        console.error(`❌ SMS error: ${error.message}`);
    }
};

module.exports = { sendEmail, sendSMS };
