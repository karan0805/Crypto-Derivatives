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

// Create a Nodemailer transporter using the SMTP configuration
const transporter = nodemailer.createTransport(smtpConfig);

// Function to send the password reset email
export async function sendResetEmail(email: string, resetToken: string) {
  try {
    // Compose the email
    const mailOptions = {
      from: 'GreeX <karan0805@zohomail.in>',
      to: email,
      subject: 'Password Reset Link',
      html: `<p>Click the following link to reset your password:</p>
             <p><a href="${env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}">Reset Password</a></p>`,
    };
    // Send the email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send the reset email');
  }
}

export async function sendWelcomeEmail(email: string) {
  try {
    // Compose the email
    const mailOptions = {
      from: 'GreeX <karan0805@zohomail.in>',
      to: email,
      subject: 'Welcome to GreeX',
      html: `<p>This will be the email with welcome message and introduction to platform</p>`,
    };
    // Send the email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send the reset email');
  }
}
