const bookModel = require("../models/bookModel");
const authorModel = require("../models/authorModel");
const validator = require("../middleware/validator");

//------------------------------------------------------------------------------------------------------------------------//

const createBooks = async function (req, res) {
  try {
    const requestBody = req.body;
    const { name, publishedOn, price, authorId } = requestBody;

    const bookData = { name, publishedOn, price, authorId };

    const book = await bookModel.create(bookData);
    res
      .status(201)
      .send({ status: true, msg: "book created sucessfully", data: book });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: false, data: err.message });
  }
};

//------------------------------------------------------------------------------------------------------//

const getBooks = async function (req, res) {
  try {
    let book = await bookModel.find();
    res.status(200).send({ status: true, message: "Book list", data: book });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, error: error.message });
  }
};

//-------------------------------------------------------------------------------------------------------//

const getBookById = async function (req, res) {
  try {
    let bookId = req.params.bookId;

    if (!validator.isValidObjectId(bookId)) {
      res.status(400).send({ status: false, msg: `${bookId} is not valid id` });
    }

    const bookDetail = await bookModel
      .findOne({ _id: bookId })
      .populate("authorId", { name: 1, age: 1, dateOfBirth: 1 });

    if (!bookDetail) {
      return res.status(400).send({ status: false, msg: "book not found" });
    }

    return res.status(400).send({ status: true, data: bookDetail });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, error: error.message });
  }
};

//----------------------------------------------------------------------------------------------------------------------//

const deleteBook = async function (req, res) {
  try {
    let bookId = req.params.bookId;
    let checkid = validator.isValidObjectId(bookId);
    if (!checkid) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide a valid bookId " });
    }
    let checkbook = await bookModel.findOne({ _id: bookId });
    if (!checkbook) {
      return res
        .status(404)
        .send({ status: false, message: "Book not found or already deleted" });
    }
    let updatedBook = await bookModel.findOneAndUpdate(
      { _id: bookId },
      { $set: { isDeleted: true, deletedAt: new Date() } },
      { new: true }
    );
    res.status(200).send({
      status: true,
      message: "sucessfully deleted",
      data: updatedBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, error: error.message });
  }
};

module.exports = { createBooks, getBooks, getBookById, deleteBook };
