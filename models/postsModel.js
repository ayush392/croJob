const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "please provide title"],
    },
    body: {
      type: String,
      required: [true, "please provide body"],
    },
    imageUrl: {
      type: String,
      required: [true, "please provide body"],
    },
    status: {
      type: String,
      enum: ["published", "pending"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
