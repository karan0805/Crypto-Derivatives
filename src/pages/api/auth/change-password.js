// pages/api/auth/change-password.ts
import { env } from '@/env/server.mjs';
import { prisma } from '@/lib/prisma';
import sha256 from 'crypto-js/sha256';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { token, currentPassword, newPassword } = req.body;

  try {
    // Verify the JWT token and extract the email
    const decodedToken = jwt.verify(token, env.NEXTJWT_SECRET);
    const { email } = decodedToken;

    // Check if the provided email exists in the database
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the current password with the password in the database
    const currentPasswordHash = sha256(currentPassword).toString();
    if (currentPasswordHash !== user.password) {
      return res.status(401).json({ message: 'Invalid current password' });
    }

    // Hash the new password
    const newPasswordHash = sha256(newPassword).toString();

    // Update the user's password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: newPasswordHash },
    });

    return res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error during password change:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
