import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    let emailTypeHTML = '';

    if (emailType === 'VERIFY') {
      emailTypeHTML = 'verifyEmail';
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === 'RESET') {
      emailTypeHTML = 'resetPassword';
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600,
        },
      });
    }

    var transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    const mailOptions = {
      from: 'philkhanasidharth14@gmail.com',
      to: email,
      subject: emailType === 'VERIFY' ? 'Email Verification' : 'Password Reset',
      text: 'Verification Email',
      html: `<p> Click <a href="${
        process.env.DOMAIN
      }/${emailTypeHTML}?token=${hashedToken}">Here</a> to ${
        emailType === 'VERIFY' ? 'Email Verification' : 'Password Reset'
      } or copy and paste the link below in your browser
      <br>
      ${process.env.DOMAIN}/${emailTypeHTML}?token=${hashedToken}
      </p>
      `,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error);
  }
};
