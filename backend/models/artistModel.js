import mongoose from "mongoose"

const artistSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    biography: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    birthYear: {
      type: Number,
      required: true,
    },
    deathYear: {
      type: Number,
      default: null,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

const Artist = mongoose.model("Artist", artistSchema)

export default Artist
