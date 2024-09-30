const nodemailer = require('nodemailer');

async function sendVerificationEmail(toEmail, verificationLink) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER, // Your email address
            pass: process.env.EMAIL_PASS, // Your email password
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: 'Verify your email address',
        html: `<p>Please click the link below to verify your email address:</p>
               <a href="${verificationLink}">Verify Email</a>`,
    };

    return transporter.sendMail(mailOptions);
}

module.exports = sendVerificationEmail;
