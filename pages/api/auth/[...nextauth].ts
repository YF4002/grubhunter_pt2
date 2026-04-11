import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { NextApiRequest, NextApiResponse } from "next";
import { createHash } from "crypto";

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
    // Ensure the secret is at this level
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async jwt({ token }) {
        if (token.email && !token.fdlst_private_userId) {
          token.fdlst_private_userId = createUserId(token.email);
        }
        return token;
      },
      async session({ session, token }) {
        if (session.user && token.fdlst_private_userId) {
          session.user.fdlst_private_userId = token.fdlst_private_userId as string;
        }
        return session;
      },
    },
  });
}