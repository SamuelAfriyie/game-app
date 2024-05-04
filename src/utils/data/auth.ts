// import { use } from "react";
// import { UseLogin } from "@/hooks/common/use_login";
// // import { NextAuthOptions, User } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// type CredentailsType = {
//   email: string;
//   password: string;
// };

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {},
//       authorize: async (credentials: any, req: any) => {
//         const baseUrl = req.headers.host;
//         const protocol = req.headers["x-forwarded-proto"] || "http";
//         const siteUrl = `${protocol}://${baseUrl}`;

//         const { email, password } = credentials as CredentailsType;
//         const { data, success } = await UseLogin({ email, password }, siteUrl);
//         if (success) {
//           return { email: data.data.email, name: data.data.username } as User;
//         }
//         throw new Error("Invalid credentials");
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/",
//     // signOut: "/",
//     error: "/",
//     // verifyRequest: "/auth/verify-request",
//   },
//   secret: process.env.JWT_SECRET,
//   session: {
//     strategy: "jwt",
//   },
// } satisfies NextAuthOptions;
