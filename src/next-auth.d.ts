import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  educationalLevel: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
