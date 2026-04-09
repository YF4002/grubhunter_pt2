// code/grubhunter-application/custom.d.ts
import type mongoose from "mongoose";
import { DefaultSession } from "next-auth";

declare global {
  // Your existing Mongoose global cache
  var __mongoose__: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

// Extend the next-auth module types
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The hashed internal user ID used for wishlist mapping. */
      fdlst_private_userId: string;
    } & DefaultSession["user"];
  }
}

export {};