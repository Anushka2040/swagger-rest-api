import express from "express";
const router = express.Router();

import {
  getPetbyid,
  getPetbystatus,
  getPetbytags,
  createPet,
  updatePetbyid,
  createPetbyimage,
  createPetbyid,
  deletePet,
} from "../controllers/petController";

router.route("/findByStatus").get(getPetbystatus);
router.route("/findByTags").get(getPetbytags);
router.route("/:id").get(getPetbyid).post(createPetbyid).delete(deletePet);
router.route("/").post(createPet).put(updatePetbyid);
router.route("/:id/uploadImage").post(createPetbyimage);

module.exports = router;
