import { Schema } from "mongoose";

export const HoloSchema = new Schema({
  url: { type: String, required: true, maxlength: 1000 },
});
