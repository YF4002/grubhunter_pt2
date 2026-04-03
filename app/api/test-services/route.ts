// app/api/test-services/route.ts
import dbConnect from "@/middleware/mongoose";
import { findAllLocations } from "@/mongoose/locations/services";

export async function GET() {
  await dbConnect();
  const locations = await findAllLocations();
  return new Response(JSON.stringify(locations), { status: 200 });
}