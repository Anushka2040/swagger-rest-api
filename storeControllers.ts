import { db } from "../models/db";
import { BasicStore } from "../types/store";
import { Request, Response } from "express";

const getOrderbystatus = (req: Request, res: Response) => {
  let order_status = req.query.status;
  db.query(
    "SELECT * FROM store WHERE status= ?",
    order_status,
    (error: any, result: BasicStore) => {
      if (error) {
        console.log(result);
        res.status(404);
        res.json({ status: "NOT FOUND!" });
      } else {
        res.status(200);
        res.json(result);
      }
    }
  );
};

const createOrder = (req: Request, res: Response) => {
  let order = req.body;
  console.log(order.id);
  db.query(
    "INSERT INTO store (id, petId, quantity, shipDate, status, complete) VALUES ( ? , ? , ? , ? , ? , ? )",
    [
      order.id,
      order.petId,
      order.quantity,
      order.shipDate,
      order.status,
      order.complete,
    ],
    (error: any, result: BasicStore) => {
      if (error) {
        res.status(404);
        res.json({ status: "NOT CREATED!", message: error });
      } else {
        res.status(201);
        res.json(result);
      }
    }
  );
};

const getOrderbyid = (req: Request, res: Response) => {
  let order_id = req.params.id;
  db.query(
    "SELECT * FROM store WHERE id= ?",
    order_id,
    (error: any, result: BasicStore) => {
      if (error) {
        console.log(result);
        res.status(404);
        res.json({ status: "NOT FOUND!" });
      } else {
        res.status(200);
        res.json(result);
      }
    }
  );
};

const deleteOrderbyid = (req: Request, res: Response) => {
  let order_id = req.params.id;
  db.query(
    "DELETE FROM store WHERE id= ?",
    order_id,
    (error: any, result: BasicStore) => {
      if (error) {
        res.status(404);
        res.json({ status: "NOT CREATED!", message: error });
      } else {
        res.status(201);
        res.json(result);
      }
    }
  );
};

export { getOrderbystatus, createOrder, getOrderbyid, deleteOrderbyid };
