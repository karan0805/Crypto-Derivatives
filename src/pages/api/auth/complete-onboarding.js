import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './[...nextauth]';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    const inputdata = {
      role: req.body?.role,
      bio: req.body?.bio,
      dateOfBirth: req.body?.dob,
      country: req.body?.country,
      // frontPagePassport: req.body?.frontPagePassport,
      // backPagePassport: req.body?.backPagePassport,
      pricing: req.body?.pricing,
      isOnboardingCompleted: true,
    };
    await prisma.user.update({
      where: { id: session.user.id },
      data: inputdata,
    });

    return res.status(200).json({ message: 'Onboarding successful' });
  } catch (error) {
    console.error('Error during processing:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
