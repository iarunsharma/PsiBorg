const { decode } = require("jsonwebtoken");
const mongoose = require("mongoose");
const authorModel = require("../models/authorModel");

const isValid = function (value) {
  if (typeof value === "undefined" ||  value === "null") return false;
  if (typeof value === "string" && value.length === 0) return false;
  return true;
};

const isValidRequestBody = function (requestbody) {
  return Object.keys(requestbody).length > 0;
};

const isValidObjectId = function (ObjectId) {
  return mongoose.Types.ObjectId, isValid(ObjectId);
};

//----------------------------------------------------------------------------------------------------------------------//

const signUpValidation = async function (req, res, next) {
  try {
    const requestBody = req.body;
    if (!isValidRequestBody(requestBody)) {
      return res
        .status(400)
        .send({ status: false, msg: "please provide data to signUp" });
    }

    const { name, age, dateOfBirth } = requestBody;

    if (!isValid(name)) {
      return res.status(400).send({ status: false, msg: "please provide name" });
    }

    if (!isValid(age)) {
      return res.status(400).send({ status: false, msg: "please provide age" });
    }

    if (!isValid(dateOfBirth)) {
      return res
        .status(400)
        .send({ status: false, msg: "please provide dateOfBirth" });
    }

    next();
    
  } catch (err) {
    console.log(err)
    return res.status(500).send(err.message);
  }
};

//----------------------------------------------------------------------------------------------------------------//

const bookValidations = async function (req, res, next) {
  try {
    const requestBody = req.body;
    if (!isValidRequestBody(requestBody)) {
      return res
        .status(400)
        .send({ status: false, msg: "please provide data to create the book" });
    }

    const { name, publishedOn, price,authorId } = requestBody;

    if (!isValid(name)) {
      return res.status(400).send({ status: false, msg: "please provide name" });
    }

    if (!isValid(publishedOn)) {
      return res.status(400).send({ status: false, msg: "please provide publishedOn" });
    }

    if (!isValid(price)) {
      return res
        .status(400)
        .send({ status: false, msg: "please provide price" });
    }

    if (!isValid(authorId)) {
      return res
        .status(400)
        .send({ status: false, msg: "please provide authorId" });
    }

    if (!isValidObjectId(authorId)) {
      return res
        .status(400)
        .send({ status: false, msg: "please provide ObjectId" });
    }


    next();
    
  } catch (err) {
    console.log(err)
    return res.status(500).send(err.message);
  }
};







module.exports = {
  isValid,
  isValidRequestBody,
  isValidObjectId,
  signUpValidation,
  bookValidations
};
