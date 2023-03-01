import { Schema } from "mongoose";

export const FighterSchema = new Schema(
  {
    name: { type: String, required: true },
    bio: { type: String, required: true, minlength: 25, maxlength: 500 },
    creatorId: { type: Schema.Types.ObjectId, required: true },
    universeId: { type: Schema.Types.ObjectId },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

FighterSchema.virtual("creator", {
  localField: "creatorId",
  foreignField: "_id",
  ref: "Account",
  justOne: true,
});

FighterSchema.virtual("universe", {
  localField: "universeId",
  foreignField: "_id",
  ref: "Universe",
  justOne: true,
});
