// code/grubhunter-application/app/api/test-middleware/route.ts
import dbConnect from "@/middleware/mongoose";
import Location from "@/mongoose/locations/model";

export async function GET() {
  await dbConnect();
  const locations = await Location.find({});
  return new Response(JSON.stringify(locations), { status: 200 });
}