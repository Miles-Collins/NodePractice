import { Schema } from "mongoose";

export const PersonalsSchema = new Schema(
  {
    birthday: { type: String, default: Date.now },
    age: { type: Number, required: true, default: null },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    height: { type: Number, required: true, default: null },
    hairColor: { type: String, required: true, default: "Unknown" },
    eyeColor: { type: String, required: true, default: "Unknown" },
    bloodType: {
      type: String,
      enum: ["O", "A", "B", "AB"],
      required: true,
      default: "Unknown",
    },
    creatorId: { type: Schema.Types.ObjectId, required: true },
    heroId: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

PersonalsSchema.virtual("creator", {
  localField: "creatorId",
  foreignField: "_id",
  justOne: true,
  ref: "Account",
});
