const express = require("express");

const router = express.Router();

const authorController = require("../controllers/authorController");
const bookController = require('../controllers/bookController')
const validator = require("../middleware/validator");
const mid = require('../middleware/mid')

router.post("/signup", validator.signUpValidation, authorController.signUp);

router.post("/signin", authorController.signIn);

router.post("/book", validator.bookValidations,mid.mw, bookController.createBooks);

router.get("/book",bookController.getBooks)

router.get("/book/:bookId",bookController.getBookById)

router.delete("/book/:bookId",bookController.deleteBook)





module.exports = router;
