import express from "express";
const router = express.Router();

import {
  createUser,
  createUserWithList,
  getUserLogin,
  getUserLogout,
  getUserbyUsername,
  updateUserbyUsername,
  deleteUserbyUsername,
} from "../controllers/userControllers";

router.route("/").post(createUser);
router.route("/createWithList").post(createUserWithList);
router.route("/login").get(getUserLogin);
router.route("/logout").get(getUserLogout);
router
  .route("/:username")
  .get(getUserbyUsername)
  .put(updateUserbyUsername)
  .delete(deleteUserbyUsername);

module.exports = router;
