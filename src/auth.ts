import NextAuth, { User } from "next-auth";

import authConfig from "@/auth.config";
import { ExtendedUser } from "./next-auth";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    async signIn({ user, account }) {
      return true;
    },

    async jwt({ token, user }) {
      const validUser = user as ExtendedUser;
      if (user) {
        token.id = validUser.id as string;
        token.email = validUser.email as string;
        token.name = validUser?.name as string;
        token.firstName = validUser?.firstName as string;
        token.lastName = validUser?.lastName as string;
        token.role = validUser?.role as string;
        token.educationalLevel = validUser.educationalLevel as string;
      }

      return token;
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.role = token.role as string;
        session.user.educationalLevel = token.educationalLevel as string;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
