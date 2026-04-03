import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  address: String,
  street: String,
  zipcode: String,
  borough: String,
  cuisine: String,
  grade: String,
  name: { type: String, required: true },
  on_wishlist: [String], // Array of User IDs
  location_id: { type: String, required: true, unique: true }
});

export type LocationType = mongoose.InferSchemaType<typeof locationSchema>;
export default locationSchema;