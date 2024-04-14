import { env } from '@/env/server.mjs';
import { prisma } from '@/lib/prisma';
import { sendResetEmail } from '@/utils/emailHelpers';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  try {
    // Check if the provided email exists in the database
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a JWT token with the user's email and expiration time (e.g., 1 hour)
    const resetToken = jwt.sign({ email }, env.NEXTJWT_SECRET, {
      expiresIn: '1h',
    });

    // Send the reset email to the user with the reset token link
    await sendResetEmail(email, resetToken);

    return res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Error during forgot password request:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
