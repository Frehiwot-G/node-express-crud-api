const mongoose = require("mongoose");

const BookSchema = mongoose.Schema(
  {
    author: {
      type: String,
      required: [true, "Please enter book author"],
    },

    title: {
      type: String,
      required: [true, "Please enter book author"],
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
