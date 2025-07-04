import mongoose from "mongoose";

const timeSheetSchema = new mongoose.Schema(
  {
    developer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Developer",
      required: true,
    },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    startTime: {
      type: Date,
    },

    endTime: {
      type: Date,
    },

    remarks: {
      type: String,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const TimeSheet = mongoose.model("TimeSheet", timeSheetSchema);
