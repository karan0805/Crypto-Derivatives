import { prisma } from '@/lib/prisma';
import { sendWelcomeEmail } from '@/utils/emailHelpers';
import sha256 from 'crypto-js/sha256';

const hashPassword = (password) => {
  return sha256(password).toString();
};

export default async function handle(req, res) {
  if (req.method === 'POST') {
    await handlePOST(req, res);
  } else {
    res
      .status(400)
      .json(`The HTTP ${req.method} method is not supported at this route.`);
  }
}

async function handlePOST(req, res) {
  try {
    const { email } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    } else {
      const newUser = {
        ...req.body,
        password: hashPassword(req.body.password),
      };

      const user = await prisma.user.create({
        data: newUser,
      });
      if (user) {
        await sendWelcomeEmail(email);
      }
      return res.status(200).json(user);
    }
  } catch (error) {
    console.error('Error during user creation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
