import { env } from '@/env/server.mjs';
import nodemailer from 'nodemailer';

const smtpConfig = {
  host: 'smtp.zoho.in',
  port: 465,
  auth: {
    user: env.MAIL_USERNAME,
    pass: env.MAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(smtpConfig);

export async function sendResetEmail(email: string, resetToken: string) {
  try {
    const mailOptions = {
      from: 'Support <karan0805@zohomail.in>',
      to: email,
      subject: 'Password Reset Link',
      html: `<p>Click the following link to reset your password:</p>
             <p><a href="${env.FRONTEND_URL}/auth/reset-password?token=${resetToken}">Reset Password</a></p>`,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send the reset email');
  }
}

export async function sendWelcomeEmail(email: string) {
  try {
    const mailOptions = {
      from: 'Support <karan0805@zohomail.in>',
      to: email,
      subject: 'Welcome to Platform',
      html: `<p>This will be the email with welcome message and introduction to platform</p>`,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send the reset email');
  }
}
