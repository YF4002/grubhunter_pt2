import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { NextApiRequest, NextApiResponse } from "next";
import { createHash } from "crypto";

// 3. Helper function to generate a stable, private user ID
const createUserId = (email: string): string => {
  return createHash("sha256").update(email).digest("hex");
};

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      }),
    ],
    callbacks: {
      // Logic for the JSON Web Token
      async jwt({ token }) {
        if (token.email && !token.fdlst_private_userId) {
          token.fdlst_private_userId = createUserId(token.email);
        }
        return token;
      },
      // Logic for the Session object available in the UI
      async session({ session, token }) {
        if (session.user && token.fdlst_private_userId) {
          session.user.fdlst_private_userId = token.fdlst_private_userId as string;
        }
        return session;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
  });
}