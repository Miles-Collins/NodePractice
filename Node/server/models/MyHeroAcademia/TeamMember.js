import { Schema } from "mongoose";

export const TeamMemberSchema = new Schema(
  {
    heroId: { type: Schema.Types.ObjectId, required: true },
    teamId: { type: Schema.Types.ObjectId, required: true },
    creatorId: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

TeamMemberSchema.virtual("hero", {
  localField: "heroId",
  foreignField: "_id",
  justOne: true,
  ref: "Hero",
});

TeamMemberSchema.virtual("team", {
  localField: "teamId",
  foreignField: "_id",
  ref: "HeroTeam",
});

TeamMemberSchema.virtual("creator", {
  localField: "creatorId",
  foreignField: "_id",
  justOne: true,
  ref: "Account",
});
