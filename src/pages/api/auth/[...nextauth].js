import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import { compare, hash } from 'bcryptjs';

const prisma = new PrismaClient();

console.log('Prisma Client:', prisma.user);
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });

        if (!user) {
          throw new Error('Нет пользователя с таким email');
        }

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error('Неверный пароль');
        }

        return { id: user.id, email: user.email };
      }
    })
  ],
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        domain: process.env.NODE_ENV === 'production' ? '.next-app-eight-bice.vercel.app' : 'localhost',
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',  // Страница логина
    signUp: '/register' // Страница регистрации
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        console.log(456, profile.email_verified, profile.email.endsWith("@gmail.com"));
        
        return profile.email_verified && profile.email.endsWith("@gmail.com");
      }
      return true;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    }
  }
});
