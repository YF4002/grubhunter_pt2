// code/grubhunter-application/mongoose/locations/model.ts
import mongoose from "mongoose";
import locationSchema from "./schema";

const Location = mongoose.models.Location || mongoose.model("Location", locationSchema);

export default Location;