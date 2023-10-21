import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import User from "../models/User.js";
export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const email = req.body.email;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Если пользователь с таким email уже существует, возвращаем ошибку
      return res.status(400).json({
        message: "This email already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new User({
      email: email,
      fullName: req.body.fullName,
      passwordHash: hash,
    });
    const user = await doc.save();
    //create new user,after getting all fields
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );
    // //here we creating token using the jwt.sign, our token gonna store user._id,
    // becouse in our token exist id, after when i goonna uncipher token , after i can use this info to check
    // if user Auth , to understand who is user
    const { passwordHash, ...userData } = user._doc;
    //here we using disctracture to take out passwordHash from user._doc, so to make respond with out passwordHash
    res.json({ ...userData, token, message: "Register successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Could not register",
    });
  }
};

export const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        message: "Wrong email or password",
      });
    }
    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );
    if (!isValidPass) {
      return res.status(403).json({
        message: "Wrong email or password",
      });
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );
    //generation token
    const { passwordHash, ...userData } = user._doc;
    //here we using disctracture to take out passwordHash from user._doc, so to make respond with out passwordHash4
    res.json({ ...userData, token, message: "Login successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Could not login",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const id = req.query.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User is not found",
      });
    }
    const { passwordHash, ...userData } = user._doc;
    //here we using disctracture to take out passwordHash from user._doc, so to make respond with out passwordHash
    res.json({ ...userData });
  } catch (err) {
    res.status(500).json({
      message: "No access",
    });
  }
};
