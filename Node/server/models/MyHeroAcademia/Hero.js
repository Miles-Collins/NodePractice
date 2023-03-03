import { Schema } from "mongoose";

export const HeroSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 3, maxlength: 50 },
    heroName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
      default: "Undecided",
    },
    image: { type: String, required: true, minlength: 5, maxlength: 1555 },
    bio: { type: String, required: true, minlength: 10, maxlength: 5000 },
    teamId: { type: Schema.Types.ObjectId, required: true, ref: "HeroTeam" },
    quirkId: { type: Schema.Types.ObjectId, ref: "Quirk" },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

HeroSchema.virtual("team", {
  localField: "teamId",
  foreignField: "_id",
  justOne: true,
  ref: "HeroTeam",
});

HeroSchema.virtual("creator", {
  localField: "creatorId",
  foreignField: "_id",
  ref: "Account",
  justOne: true,
});

HeroSchema.virtual("quirk", {
  localField: "_id",
  foreignField: "heroId",
  justOne: true,
  ref: "Quirk",
});

HeroSchema.virtual("status", {
  localField: "_id",
  foreignField: "heroId",
  justOne: true,
  ref: "Status",
});

HeroSchema.virtual("personals", {
  localField: "_id",
  foreignField: "heroId",
  justOne: true,
  ref: "Personals",
});
