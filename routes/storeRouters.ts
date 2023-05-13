import express from "express";
const router = express.Router();
import {
  getOrderbystatus,
  createOrder,
  getOrderbyid,
  deleteOrderbyid,
} from "../controllers/storeControllers";

router.route("/inventory").get(getOrderbystatus);
router.route("/order").post(createOrder);
router.route("/order/:id").get(getOrderbyid).delete(deleteOrderbyid);

module.exports = router;
