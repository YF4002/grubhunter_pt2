import mongoose from "mongoose";
import fs from "node:fs";

function resolveMongoUri(rawMongoUri: string): string {
  const isRunningInDocker = fs.existsSync("/.dockerenv");

  if (!isRunningInDocker) {
    return rawMongoUri;
  }

  return rawMongoUri.replace(
    /^(mongodb(?:\+srv)?:\/\/)(localhost|127\.0\.0\.1)/,
    "$1backend"
  );
}

async function dbConnect(): Promise<typeof mongoose> {
  const rawMongoUri = process.env.MONGO_URI;
  const mongoUri = rawMongoUri ? resolveMongoUri(rawMongoUri) : undefined;

  if (!mongoUri) {
    throw new Error("Please define the MONGO_URI environment variable inside .env.local");
  }

  let cached = global.__mongoose__;
  if (!cached) {
    cached = global.__mongoose__ = { conn: null, promise: null };
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongoUri).then((mongooseInstance) => mongooseInstance);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;