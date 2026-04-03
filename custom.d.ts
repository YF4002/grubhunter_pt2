// code/grubhunter-application/custom.d.ts
import type mongoose from "mongoose";

declare global {
  var __mongoose__: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

export {};