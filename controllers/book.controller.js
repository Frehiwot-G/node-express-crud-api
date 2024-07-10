const Book = require("../models/books.model");

const multer = require("multer");
// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });



const getBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const createBook = async (req, res) => {
//   try {
//     const book = await Book.create(req.body);
//     res.status(200).json(book);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const createBook = async (req, res) => {
  try {
    const { author, title, price } = req.body;
    const image = req.file.filename;

    const newBook = new Book({
      title,
      author,
      price,
      image,
    });

    const book = await newBook.save();
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// const updateBook = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const book = await Book.findByIdAndUpdate(id, req.body);

//     if (!book) {
//       return res.status(404).json({ message: "Book not found" });
//     }

//     const updateBook = await Book.findById(id);
//     res.status(200).json(updateBook);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const book = await Book.findByIdAndUpdate(id, updateData, { new: true });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBooks,
  getBook,
  upload,
  createBook,
  updateBook,
  deleteBook,
};
