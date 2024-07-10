const express = require("express");
const Book = require("../models/books.model.js");
// const upload = require("../models/books.model.js");
const router = express.Router();
const {
  getBooks,
  getBook,
  upload,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/book.controller.js");

router.get("/", getBooks);
router.get("/:id", getBook);

// router.post("/",createBook);
router.post("/", upload.single('image'),createBook);

// update a product
router.put("/:id", upload.single('image'), updateBook);

// delete a product
router.delete("/:id", deleteBook);

module.exports = router;
