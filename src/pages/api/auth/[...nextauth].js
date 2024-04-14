import { env } from '@/env/server.mjs';
import { prisma } from '@/lib/prisma';
import { sendWelcomeEmail } from '@/utils/emailHelpers';
import { PrismaAdapter } from '@auth/prisma-adapter';
import sha256 from 'crypto-js/sha256';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

const compare = (password, dbpassword) => {
  return sha256(password).toString() == dbpassword;
};

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};
        if (!email || !password) {
          throw new Error('Missing email or password');
        }
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          throw new Error('User not found');
        }
        if (!user || !(await compare(password, user.password))) {
          throw new Error('Invalid password');
        }
        return user;
      },
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    error: '/signin',
  },
  callbacks: {
    jwt: async ({ user, token, trigger }) => {
      if (user) {
        token.user = user;
      }

      if (trigger === 'update') {
        const refreshedUser = await prisma.user.findUnique({
          where: { id: token.sub },
        });
        if (refreshedUser) {
          token.user = refreshedUser;
        } else {
          return {};
        }
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.user.id;
        session.user.role = token.user.role;
        session.user.isOnboardingCompleted = token.user.isOnboardingCompleted;
      }
      return session;
    },
  },
  events: {
    async signIn(message) {
      if (message.isNewUser) {
        const email = message.user.email;
        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            name: true,
            createdAt: true,
          },
        });
        if (
          user?.createdAt &&
          new Date(user.createdAt).getTime() > Date.now() - 10000
        ) {
          console.log('Sending Welcome email to ', email);
          sendWelcomeEmail(email);
        }
      }
    },
  },
};

export default NextAuth(authOptions);
