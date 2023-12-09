import JWT from "jsonwebtoken";
import userModels from "../models/userModels.js";

export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(token, process.env.SECRET, (err, decode) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: "Auth failed",
          err,
        });
      } else {
        // console.log(req.body.userID);  undefined
        // console.log(decode);
        //         //{
        //   userID: '64bed5b3784c2e9baf1a1781',
        //   iat: 1690308896,
        //   exp: 1690913696
        // }
        req.body.userID = decode.userID;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Auth failed",
      error,
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModels.findById(req.body.userID);
    if (user?.role === "admin") next();
    else {
      return res.status(401).send({
        success: false,
        message: "Authorised Access",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting roles",
      error,
    });
  }
};
