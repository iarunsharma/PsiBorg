const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requires: true,
      trim: true,
    },

    publishedOn: {
      type: Date,
      requires: true,
      trin: true,
    },

    price: {
      type: Number,
      requires: true,
      trim: true,
    },

    authorId:{
        type:ObjectId,
        ref:'Author'
    },

    isDeleted:{
      type :Boolean,
      default:false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
