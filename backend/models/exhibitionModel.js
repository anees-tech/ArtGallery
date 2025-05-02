import mongoose from "mongoose"

const exhibitionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    artists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist",
      },
    ],
    paintings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Painting",
      },
    ],
  },
  {
    timestamps: true,
  },
)

const Exhibition = mongoose.model("Exhibition", exhibitionSchema)

export default Exhibition
