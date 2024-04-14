import { env } from '@/env/server.mjs';
import { prisma } from '@/lib/prisma';
import sha256 from 'crypto-js/sha256';
import jwt from 'jsonwebtoken';

const hashPassword = (password) => {
  return sha256(password).toString();
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { token, newPassword } = req.body;

  try {
    // Verify the JWT token and extract the email
    const decodedToken = jwt.verify(token, env.NEXTJWT_SECRET);
    const { email } = decodedToken;

    // Check if the provided email exists in the database
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashPassword(newPassword) },
    });

    return res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error during password reset:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
