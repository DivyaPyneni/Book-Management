const UserModel=require("../models/Usermodel");
//const BookModel=require("./model.Book");
const mongoose=require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs=require("fs");

//const nodemailer = require("nodemailer");

const {
  isValid,
  isValidString,
  isValidObject,
  isValidEmail,
  SALT,JWT_SECRET
} = require("../validators");


const createUser = async (req, res) => {
    const user = req.body;
    const response = {
      success: true,
      code: 201,
      message: "user created successfully",
      data: null,
      error: null,
      resource: req.originalUrl,
    };
    if (!isValid(user) && !isValidObject(user)) {
      response.success = false;
      response.code = 400;
      response.message = "Invalid request data";
      response.error = "Invalid request data";
      return res.status(400).json(response);
    }
    let c=0;
    const titleArray=["Mr","Ms","Miss"];
    for(let i=0;i<titleArray.length;i++){
        if(user.title===titleArray[i])
        {
            ++c;
            break;
        }
    }
    if(c!==1)
    {
        response.success=false;
        response.code = 400;
      response.message = "Invalid Title";
      response.error = "Invalid Title..";
      return res.send(response);
    }

    if (
      !isValid(user.username) ||
      (isValid(user.username) && !isValidString(user.username))
    ) {
      response.success = false;
      response.code = 400;
      response.message = "Invalid request data. Name is required";
      response.error = "Invalid request data. Name is required";
      return res.status(400).json(response);
    }
    if (
      !isValid(user.email) ||
      (isValid(user.email) && !isValidEmail(user.email))
    ) {
      response.success = false;
      response.code = 400;
      response.message = "Invalid request data. Email is required";
      response.error = "Invalid request data. Email is required";
      return res.status(400).json(response);
    }
    if (
      !isValid(user.password) ||
      (isValid(user.password) && !isValidString(user.password))
    ) {
      response.success = false;
      response.code = 400;
      response.message = "Invalid request data. Password is required";
      response.error = "Invalid request data. Password is required";
      return res.status(400).json(response);
    }
    
    try {
      const isEmailExist = await UserModel.findOne({
        email: user.email});
      console.log(isEmailExist);
      if (isEmailExist)
        return res.send(`This email ${user.email} id is already registered.`);
    } catch (error) {
      return res.status(400).json({
        success: false,
        code: 400,
        message: error.message,
        error: error,
        data: null,
        resource: req.originalUrl,
      });
    }
    const hashPassword = await bcrypt.hash(user.password.trim(), SALT);
    const cleanedUserData = {
        title:user.title.trim(),
      username: user.username.trim(),
      email: user.email.trim(),
      password: hashPassword,
    };
    console.log(cleanedUserData);
    try {
      const newUser = new  UserModel(cleanedUserData);
      await newUser.save();
      response.data = { user: newUser };
      response.code=200;
      return res.send(response);
    }
    catch (error) {
        response.error = error;
        response.message = "Created User Successfully"
        response.code = 200
        return res.status(200).json(response);
      }

}



   

//============================================================================


const login = async (req, res) => {
  const data = req.body;
  if (!isValid(data) || (isValid(data) && !isValidObject(data))) {
    return res.status(400).json({
      success: false,
      code: 400,
      data: null,
      error: null,
      message: "Invalid request body",
      resource: req.originalUrl,
    });
  }
  if (
    !isValid(data.email) ||
    (isValid(data.email) && !isValidEmail(data.email))
  ) {
    return res.status(400).json({
      success: false,
      code: 400,
      data: null,
      error: null,
      message: "Invalid email id",
      resource: req.originalUrl,
    });
  }
  if (
    !isValid(data.password) ||
    (isValid(data.password) && !isValidString(data.password))
  ) {
    return res.status(400).json({
      success: false,
      code: 400,
      data: null,
      error: null,
      message: "Invalid password",
      resource: req.originalUrl,
    });
  }
  try {
    const user = await UserModel.findOne({ email: data.email });
    if (!user) {
      return res.status(404).json({
        success: false,
        code: 404,
        data: null,
        error: null,
        message: "Invalid email id, no user found.",
        resource: req.originalUrl,
      });
    }

    const isPasswordMatch = await bcrypt.compare(data.password, user.password);
    if (!isPasswordMatch) {
      return res.status(404).json({
        success: false,
        code: 404,
        data: null,
        error: null,
        message: "Invalid password.",
        resource: req.originalUrl,
      });
    }

    const token = await jwt.sign({ userid: user._id }, JWT_SECRET);

    return res.status(200).json({
      success: true,
      code: 200,
      data: { user, token },
      error: null,
      message: "Login successful",
      resource: req.originalUrl,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      code: 500,
      data: null,
      error: error,
      message: error.message,
      resource: req.originalUrl,
    });
  }
};





module.exports={createUser,login};