const nodemailer = require('nodemailer');
const emailConfig = require('../utility/emailConfig');
const smtpTransport = require('nodemailer-smtp-transport')

module.exports = class EmailService{
    constructor(){

    }

    sendEmail(recieverEmailId,body,res){
        var transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: emailConfig.senderEmailId,
                pass: emailConfig.senderPassword
            }
        }));

        var mailOptions = {
            from: emailConfig.senderEmailId,
            to: recieverEmailId,
            subject: 'Order Invoice',
            text: 'order placed successfully'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.send(error)
            } else {
                console.log('email sent', +info.response);
                res.send("email sent")
            }
        });
    }
}