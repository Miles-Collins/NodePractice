import { Schema } from "mongoose";

export const DevilFruitSchema = new Schema(
  {
    name: { type: String, required: true },
    meaning: { type: String, required: true },
    Type: {
      type: String,
      enum: ["Paramecia", "Zoan", "Logia"],
      required: true,
    },
    ability: { type: String, required: true, maxLength: 600 },
    pirateId: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);
