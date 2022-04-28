const authorModel = require("../models/authorModel");
const validator = require("../middleware/validator");
const jwt = require('jsonwebtoken')


//------------------------------------------------------------------------------------------------------------------------//

const signUp = async function (req, res) {
  try {
    const requestBody = req.body;
    const { name, age, dateOfBirth } = requestBody;

    const authorData = { name, age, dateOfBirth };

    const data = await authorModel.create(authorData);
    res
      .status(201)
      .send({ status: true, msg: "Author created sucessfully", data: data });

  } catch (err) {
    console.log(err)
    res.status(500).send({ status: false, data: err.message });
  }
};

//---------------------------------------------------------------------------------------------------------------------------//

const signIn = async function (req, res) {
  try {
    const requestBody = req.body;
    if (!validator.isValidRequestBody(requestBody)) {
      return res
        .status(400)
        .send({ status: true, msg: "please provide data to signIn" });
    }
    const { name, dateOfBirth } = requestBody;

    if (!validator.isValid(name)) {
      return res.status(400).send({ status: true, msg: "please provide name" });
    }

    if (!validator.isValid(dateOfBirth)) {
      return res
        .status(400)
        .send({ status: true, msg: "please provide dateOfBirth" });
    }

    const findName = await authorModel.findOne({ name });
    if (!findName) {
      res
        .status(400)
        .send({ status: false, msg: "User does'nt exist with this name" });
    }
    const findDob = await authorModel.findOne({ dateOfBirth });
    if (!findDob) {
      res
        .status(400)
        .send({ status: false, msg: "Please fill correct date of birth" });
    }
    
    const data = { name, dateOfBirth };
    if (data) {
      let payload = { name: name, dateOfBirth: dateOfBirth };
      const generateToken = jwt.sign(payload, "psiBorg");
      res
        .status(200)
        .send({ msg: "author login sucessfully", token: generateToken });
    }
  } catch (err) {
    console.log(err)
    res.status(500).send({ status: false, data: err.message });
  }
};

//------------------------------------------------------------------------------------------------------------------------//

module.exports = { signUp, signIn };
