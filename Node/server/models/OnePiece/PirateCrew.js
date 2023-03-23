import { Schema } from "mongoose";

export const PirateCrewSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 2, maxlength: 25 },
    description: { type: String, required: true, minlength: 5, maxlength: 500 },
    hasBoat: { type: Boolean, required: true },
    crewMembers: { type: Number, required: true, default: 0 },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

PirateCrewSchema.virtual("creator", {
  foreignField: "_id",
  localField: "creatorId",
  justOne: true,
  ref: "Account",
});
PirateCrewSchema.virtual("pirates", {
  foreignField: "crewId",
  localField: "_id",
  ref: "CrewMember",
});
