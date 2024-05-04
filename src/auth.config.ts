import Credentials from "next-auth/providers/credentials";
import { NextAuthConfig } from "next-auth";
import { UseLogin } from "./hooks/common/use_login";

type CredentailsType = {
  email: string;
  password: string;
};

export default {
  providers: [
    Credentials({
      async authorize(credentials: any, req: any) {
        const baseUrl = new URL(req.url).origin;
        const { email, password } = credentials as CredentailsType;
        const { data, success } = await UseLogin({ email, password }, baseUrl);
        if (success) {
          const user = {
            id: data.data.id,
            email: data.data.email,
            name: data.data.name,
            firstName: data.data.firstName,
            lastName: data.data.lastName,
            role: data.data.role,
            educationalLevel: data.data.educationalLevel,
          };
          return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
