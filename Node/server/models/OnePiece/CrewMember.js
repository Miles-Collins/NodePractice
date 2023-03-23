import { Schema } from "mongoose";

export const CrewMemberSchema = new Schema(
  {
    pirateId: { type: Schema.Types.ObjectId, required: true, ref: "Pirate" },
    crewId: { type: Schema.Types.ObjectId, required: true, ref: "PirateCrew" },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

CrewMemberSchema.virtual("creator", {
  localField: "pirateId",
  foreignField: "_id",
  justOne: true,
  ref: "Account",
});
CrewMemberSchema.virtual("pirate", {
  localField: "pirateId",
  foreignField: "_id",
  justOne: true,
  ref: "Pirate",
});
CrewMemberSchema.virtual("crew", {
  localField: "crewId",
  foreignField: "_id",
  justOne: true,
  ref: "PirateCrew",
});
CrewMemberSchema.virtual("devilFruit", {
  localField: "pirateId",
  foreignField: "pirateId",
  justOne: true,
  ref: "DevilFruit",
});
CrewMemberSchema.virtual("stats", {
  localField: "pirateId",
  foreignField: "pirateId",
  justOne: true,
  ref: "Statistics",
});
