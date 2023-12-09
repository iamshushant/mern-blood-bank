import { comparePassword, hashPassword } from "../helpers/authHelpers.js";
import userModels from "../models/userModels.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const existingUser = await userModels.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "User already exits! Please Login",
      });
    }
    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;
    // console.log(req.body);
    const user = new userModels(req.body);
    await user.save();

    res.status(201).send({
      success: true,
      message: "Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

//login
export const loginController = async (req, res) => {
  try {
    const user = await userModels.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    if (user.role !== req.body.role) {
      return res.status(400).send({
        success: false,
        message: "Role does not match",
      });
    }
    const valid = await comparePassword(req.body.password, user.password);
    if (!valid) {
      return res.status(400).send({
        success: false,
        message: "Password is wrong",
      });
    }
    const token = JWT.sign({ userID: user._id }, process.env.SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Log In seccussesfully",
      user,
      token,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error in logging you",
      error,
    });
  }
};

export const currentUserController = async (req, res) => {
  try {
    const user = await userModels.findOne({ _id: req.body.userID });
    res.status(200).send({
      success: true,
      message: "Seuccessfully get the user",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error",
      error,
    });
  }
};
