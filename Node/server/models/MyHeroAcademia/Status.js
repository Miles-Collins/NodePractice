import { Schema } from "mongoose";

export const StatusSchema = new Schema(
  {
    status: { type: Boolean, required: true, default: true },
    birthplace: { type: String, default: "Unknown" },
    family: { type: String, default: "Unknown" },
    occupation: { type: String, required: true, maxlength: 100 },
    affiliation: { type: String, default: "Unknown", maxlength: 255 },
    creatorId: { type: Schema.Types.ObjectId, required: true },
    heroId: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);
