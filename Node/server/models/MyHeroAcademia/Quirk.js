import { Schema } from "mongoose";

export const QuirkSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 5, maxlength: 500 },
    description: {
      type: String,
      required: true,
      minlength: 25,
      maxlength: 1000,
    },
    type: {
      type: String,
      enum: ["Emitter", "Transformation", "Mutant", "Accumulation"],
      required: true,
    },
    quirkRange: {
      type: String,
      enum: [
        "Close",
        "Short",
        "Medium",
        "Medium-Long",
        "Long",
        "Very Long",
        "Global",
      ],
    },
    heroId: { type: Schema.Types.ObjectId, required: true },
    creatorId: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

QuirkSchema.virtual("creator", {
  localField: "creatorId",
  foreignField: "_id",
  justOne: true,
  ref: "Account",
});

QuirkSchema.virtual("hero", {
  localField: "heroId",
  foreignField: "_id",
  justOne: true,
  ref: "Hero",
});
