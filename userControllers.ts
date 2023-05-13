import { db } from "../models/db";
import { BasicUser } from "../types/user";
import { Request, Response } from "express";
import { loginUser, logoutUser, verifyToken } from "../middleware/JWT";

const createUser = (req: Request, res: Response) => {
  if (verifyToken(req, res)) {
    let user = req.body;
    db.query(
      "INSERT INTO user (username, firstName, lastName, email, password, phone, userStatus) VALUES ( ? , ? , ? , ? , ? , ? , ? )",
      [
        user.username,
        user.firstname,
        user.lastname,
        user.email,
        user.password,
        user.phone,
        user.userStatus,
      ],
      (err: any, result: BasicUser) => {
        console.log(result);
        if (result === undefined) {
          res.status(400).send({ error: "USER NOT CREATED!" });
        } else {
          res.status(201).send({ message: result });
        }
      }
    );
  } else {
    res.status(400).send({ error: "USER NOT LOGGED IN!" });
  }
};

const createUserWithList = (req: Request, res: Response) => {
  let user = req.body;
  for (var i = 0; i < user.length; i++) {
    db.query(
      "INSERT INTO user (username, firstname, lastname, email, password, phone, userStatus) VALUES ( ? , ? , ? , ? , ? , ? , ? )",
      [
        user[i].username,
        user[i].firstName,
        user[i].lastName,
        user[i].email,
        user[i].password,
        user[i].phone,
        user[i].userStatus,
      ],
      (err: any, result: BasicUser) => {
        if (i === user.length - 1) {
          if (result === null) {
            res.status(400).send({ error: "USER NOT CREATED!" });
          } else {
            res.status(200).send({ result });
          }
        }
      }
    );
  }
};

const getUserLogin = (req: Request, res: Response) => {
  const { username, password } = req.body;
  db.query(
    "SELECT * FROM user WHERE username= ?",
    [username],
    (err: any, result: BasicUser) => {
      if (err) {
        res.status(400).send({ error: "USER DOESN'T EXISTS!" });
      } else {
        if (password == result.password) {
          res
            .status(400)
            .send({ message: "WRONG USERNAME AND PASSWORD COMBINATION!" });
        } else {
          const tokenList = loginUser(result);
          res.cookie("access-token", tokenList.accessToken);
          res.status(200).send({ message: "LOGGED IN!" });
        }
      }
    }
  );
};

const getUserLogout = (req: Request, res: Response) => {
  const accessToken = req.headers["access-token"];
  logoutUser(req, res, accessToken);
};

const getUserbyUsername = (req: Request, res: Response) => {
  if (verifyToken(req, res)) {
    const username = req.params.username;
    db.query(
      "SELECT * FROM user WHERE username= ?",
      [username],
      (err: any, result: BasicUser) => {
        if (Object.keys(result).length === 0) {
          res.status(400).send({ error: "USER DOESN'T EXISTS!" });
        } else {
          res.status(200).send({ message: result });
        }
      }
    );
  } else {
    res.status(400).send({ error: "USER NOT LOGGED IN!" });
  }
};

const updateUserbyUsername = (req: Request, res: Response) => {
  if (verifyToken(req, res)) {
    const username = req.params.username;
    const body = req.body;
    db.query(
      "UPDATE user SET id= ? ,username= ? ,firstName= ? ,lastName= ? ,email= ? ,password= ? ,phone= ? ,userStatus= ? WHERE username= ?",
      [
        body.id,
        body.username,
        body.firstName,
        body.lastName,
        body.email,
        body.password,
        body.phone,
        body.userStatus,
        username,
      ],
      (err: any, result: BasicUser) => {
        if (err) {
          res.status(400).send({ error: "USER DOESN'T EXISTS!" });
        } else {
          res.status(200).send({ message: "USER FOUND!" });
        }
      }
    );
  } else {
    res.status(400).send({ error: "USER NOT LOGGED IN!" });
  }
};

const deleteUserbyUsername = (req: Request, res: Response) => {
  if (verifyToken(req, res)) {
    const username = req.params.username;
    db.query(
      "DELETE FROM user WHERE username= ?",
      [username],
      (err: any, result: BasicUser) => {
        if (err) {
          res.status(400).send({ error: "USER DOESN'T EXISTS!" });
        } else {
          res.status(200).send({ message: "USER DELETED!" });
        }
      }
    );
  } else {
    res.status(400).send({ error: "USER NOT LOGGED IN!" });
  }
};

export {
  createUser,
  createUserWithList,
  getUserLogin,
  getUserLogout,
  getUserbyUsername,
  updateUserbyUsername,
  deleteUserbyUsername,
};
