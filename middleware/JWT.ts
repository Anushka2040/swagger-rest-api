import { Request, Response, NextFunction } from "express";
import { db } from "../models/db";
import { BasicUser } from "../types/user";
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
var tokenList;

const loginUser = (user: BasicUser) => {
  const accessToken = jwt.sign(
    { username: user.username, id: user.id },
    config.secret,
    { expiresIn: "14m" }
  );
  const refreshToken = jwt.sign(
    { username: user.username, id: user.id },
    config.refresh_secret,
    { expiresIn: "10d" }
  );
  tokenList = {
    token: accessToken,
    refreshToken: refreshToken,
  };
  return { accessToken, refreshToken };
};

const verifyToken = (req: Request, res: Response) => {
  const accessToken = req.headers["access-token"];
  if (!accessToken) {
    return false;
  } else {
    db.query(
      "SELECT * FROM blacklisted WHERE token= ? ",
      accessToken,
      (err: any, result: string) => {
        if (Object.keys(result).length === 0) {
          try {
            const validToken = jwt.verify(accessToken, config.secret);
            if (validToken) {
              return true;
            }
            return false;
          } catch (err) {
            return false;
          }
        } else {
          return true;
        }
      }
    );
    return res.status(400);
  }
};

const logoutUser = (req: Request, res: Response, accessToken: any) => {
  db.query("INSERT INTO blacklisted (token) VALUES ( ? )", accessToken, () => {
    res.status(200).send({ message: "USER LOGGED OUT!" });
  });
};

export { loginUser, verifyToken, logoutUser };
