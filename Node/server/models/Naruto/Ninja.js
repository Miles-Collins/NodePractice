import { Schema } from "mongoose";

export const NinjaSchema = new Schema(
  {
    name: { type: String, required: true },
    bio: { type: String, required: true },
    image: { type: String, required: true },
    isKage: { type: Boolean, required: true },
    villageId: { type: Schema.Types.ObjectId, ref: "Village" },
    creatorId: { type: Schema.Types.ObjectId, ref: "Account" },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

NinjaSchema.virtual("creator", {
  localField: "creatorId",
  foreignField: "_id",
  ref: "Account",
  justOne: true,
});

NinjaSchema.virtual("village", {
  localField: "villageId",
  foreignField: "_id",
  justOne: true,
  ref: "Village",
});
