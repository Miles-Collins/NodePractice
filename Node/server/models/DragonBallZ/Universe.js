import { Schema } from "mongoose";

export const UniverseSchema = new Schema({
  name: { type: String, required: true },
});
