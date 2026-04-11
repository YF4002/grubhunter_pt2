import Location from "./model";
import { LocationById, LocationWishlistFilter } from "./custom";
import dbConnect from "@/middleware/mongoose";
import type { LocationType } from "./schema";

const starterLocations: LocationType[] = [
  {
    address: "1600 Broadway",
    street: "Broadway",
    zipcode: "10019",
    borough: "Manhattan",
    cuisine: "Italian",
    grade: "A",
    name: "Pasta Palace",
    on_wishlist: [],
    location_id: "demo-1001",
  },
  {
    address: "245 Park Ave",
    street: "Park Ave",
    zipcode: "10167",
    borough: "Manhattan",
    cuisine: "Japanese",
    grade: "A",
    name: "Sushi Skyline",
    on_wishlist: [],
    location_id: "demo-1002",
  },
  {
    address: "88 Bedford Ave",
    street: "Bedford Ave",
    zipcode: "11211",
    borough: "Brooklyn",
    cuisine: "Mexican",
    grade: "B",
    name: "Taco Terrace",
    on_wishlist: [],
    location_id: "demo-1003",
  },
];

async function seedStarterLocationsIfNeeded() {
  const count = await Location.countDocuments();

  if (count === 0) {
    await Location.insertMany(starterLocations);
  }
}

export async function findAllLocations() {
  await dbConnect();
  await seedStarterLocationsIfNeeded();
  return Location.find({}).sort({ name: 1 });
}

export async function findLocationById({ id }: LocationById) {
  await dbConnect();
  return Location.findOne({ location_id: id });
}

export async function findLocationsByIds(ids: string[]) {
  await dbConnect();
  const cleanedIds = Array.from(
    new Set(ids.map((id) => id.trim()).filter(Boolean))
  );

  if (cleanedIds.length === 0) {
    return [];
  }

  return Location.find({ location_id: { $in: cleanedIds } });
}

export async function findWishlistForUser({ userId }: LocationWishlistFilter) {
  await dbConnect();
  return Location.find({ on_wishlist: userId });
}

/**
 * Update wishlist: add or remove user ID
 * @param userId - ID of the user
 * @param locationId - ID of the location
 * @param add - true to add, false to remove
 */

export async function updateWishlist(
  userId: string,
  locationId: string,
  add: boolean
) {
  await dbConnect();
  if (add) {
    return Location.findOneAndUpdate(
      { location_id: locationId },
      { $addToSet: { on_wishlist: userId } },
      { new: true }
    );
  } else {
    return Location.findOneAndUpdate(
      { location_id: locationId },
      { $pull: { on_wishlist: userId } },
      { new: true }
    );
  }
}