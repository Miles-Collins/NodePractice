import { Schema } from "mongoose";

export const HeroTeamSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 3, maxlength: 50 },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 500,
    },
    coverImage: { type: String, required: true, minlength: 3, maxlength: 555 },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
    teamCount: { type: Schema.Types.ObjectId, ref: "Hero" },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

HeroTeamSchema.virtual("creator", {
  localField: "creatorId",
  foreignField: "_id",
  justOne: true,
  ref: "Account",
});

HeroTeamSchema.virtual("heroCount", {
  localField: "_id",
  foreignField: "teamId",
  ref: "Hero",
  count: true,
});

HeroTeamSchema.virtual("heroes", {
  localField: "_id",
  foreignField: "teamId",
  ref: "Hero",
});
