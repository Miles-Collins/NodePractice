import { Schema } from "mongoose";

export const PirateSchema = new Schema(
  {
    name: { type: String, required: true, maxLength: 50 },
    bio: { type: String, required: true, minlength: 10, maxLength: 1000 },
    creatorId: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

PirateSchema.virtual("devilFruit", {
  localField: "_id",
  foreignField: "pirateId",
  justOne: true,
  ref: "DevilFruit",
});
PirateSchema.virtual("stats", {
  localField: "_id",
  foreignField: "pirateId",
  justOne: true,
  ref: "Statistics",
});
PirateSchema.virtual("creator", {
  localField: "creatorId",
  foreignField: "_id",
  justOne: true,
  ref: "Account",
});
