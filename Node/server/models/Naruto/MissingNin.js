import { Schema } from "mongoose";

export const MissingNinSchema = new Schema(
  {
    ninjaId: { type: Schema.Types.ObjectId, required: true },
    villageId: { type: Schema.Types.ObjectId, required: true },
    creatorId: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

MissingNinSchema.virtual("ninja", {
  localField: "ninjaId",
  foreignField: "_id",
  ref: "Ninja",
  justOne: true,
});

MissingNinSchema.virtual("village", {
  localField: "villageId",
  foreignField: "_id",
  justOne: true,
  ref: "Village",
});

MissingNinSchema.virtual("creator", {
  localField: "creatorId",
  foreignField: "_id",
  justOne: true,
  ref: "Account",
});
