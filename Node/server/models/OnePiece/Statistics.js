import { Schema } from "mongoose";

export const StatisticsSchema = new Schema(
  {
    affiliations: { type: String, maxLength: 500, default: "Unknown" },
    occupations: { type: String, maxLength: 500, default: "Unknown" },
    origin: { type: String, default: "Unknown" },
    residence: { type: String, default: "Unknown" },
    alias: { type: String, maxLength: 500 },
    epithet: { type: String, maxLength: 500 },
    age: { type: Number, default: "Unknown" },
    birthday: { type: String, default: "Unknown" },
    bounty: { type: Number },
    pirateId: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);
