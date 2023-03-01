import { Schema } from "mongoose";

export const VillageSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 1, maxlength: 50 },
    description: { type: String, required: true, minlength: 1, maxlength: 500 },
    coverImg: { type: String, required: true, minlength: 1, maxlength: 500 },
    kageId: { type: Schema.Types.ObjectId, ref: "Ninja" },
    creatorId: { type: Schema.Types.ObjectId, ref: "Account", required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

VillageSchema.virtual("creator", {
  localField: "creatorId",
  foreignField: "_id",
  justOne: true,
  ref: "Account",
});

VillageSchema.virtual("kage", {
  localField: "kageId",
  foreignField: "_id",
  ref: "Ninja",
  justOne: true,
});
