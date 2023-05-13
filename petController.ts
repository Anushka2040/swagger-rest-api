import { db } from "../models/db";
import { BasicPet } from "../types/pet";
import { Request, Response } from "express";

const updatePetbyid = (req: Request, res: Response) => {
  let pet = req.body;
  let pet_id = req.body.id;
  db.query(
    "UPDATE pets SET name= ? , category_id= ? , category_name= ? , photoUrls= ? , tags_id= ? , tags_name= ? , status= ? WHERE id = ?",
    [
      pet.name,
      pet.category.id,
      pet.category.name,
      pet.photoUrls,
      pet.tags.id,
      pet.tags.name,
      pet.status,
      pet_id,
    ],
    (error: any, result: BasicPet) => {
      if (Object.keys(result).length === 0) {
        res.status(404);
        res.json({ status: "NOT CREATED!", message: error });
      } else {
        res.status(201);
        res.json(result);
      }
    }
  );
};

const createPet = (req: Request, res: Response) => {
  let pet = req.body;
  console.log(pet.category.id);
  console.log(
    pet.id,
    pet.name,
    pet.category.id,
    pet.category.name,
    pet.photoUrls,
    pet.tags.id,
    pet.tags.name,
    pet.status
  );
  db.query(
    "INSERT INTO pets (id, name, category_id, category_name, photoUrls, tags_id, tags_name, status) VALUES ( ? , ? , ? , ? , ? , ? , ? , ? )",
    [
      pet.id,
      pet.name,
      pet.category.id,
      pet.category.name,
      pet.photoUrls,
      pet.tags.id,
      pet.tags.name,
      pet.status,
    ],
    (error: any, result: BasicPet) => {
      if (Object.keys(result).length === 0) {
        res.status(404);
        res.json({ status: "PET NOT CREATED!", message: error });
      } else {
        res.status(201);
        res.json(result);
      }
    }
  );
};

const getPetbystatus = (req: Request, res: Response) => {
  const pet_status = req.query.status;
  console.log(req.query.status);
  console.log(pet_status);
  db.query(
    "SELECT * FROM pets WHERE status= ?",
    pet_status,
    (error: any, result: BasicPet) => {
      if (Object.keys(result).length === 0) {
        console.log(result);
        res.status(404);
        res.json({ status: "NO PET FOUND BY STATUS!" });
      } else {
        res.status(200);
        res.json(result);
      }
    }
  );
};

const getPetbytags = (req: Request, res: Response) => {
  const pet_tags = req.query.tags;
  console.log(pet_tags);
  db.query(
    "SELECT * FROM pets WHERE tags_name= ?",
    pet_tags,
    (error: any, result: BasicPet) => {
      if (Object.keys(result).length === 0) {
        res.status(404);
        res.json({ status: "NO PET FOUND BY TAG!" });
      } else {
        res.status(200);
        res.json(result);
      }
    }
  );
};

const getPetbyid = (req: Request, res: Response) => {
  let user_id = req.params.id;
  db.query(
    "SELECT * FROM pets WHERE id= ?",
    user_id,
    (error: any, result: BasicPet) => {
      if (Object.keys(result).length === 0) {
        console.log(result);
        res.status(404);
        res.json({ status: "PET NOT FOUND!" });
      } else {
        res.status(200);
        res.json(result);
      }
    }
  );
};

const createPetbyid = (req: Request, res: Response) => {
  let pet = req.body;
  let pet_id = req.body.id;
  db.query(
    "UPDATE pets SET name= ? , category_id= ? , category_name= ? , photoUrls= ? , tags_id= ? , tags_name= ? , status= ? WHERE id = ?",
    [
      pet.name,
      pet.category.id,
      pet.category.name,
      pet.photoUrls,
      pet.tags.id,
      pet.tags.name,
      pet.status,
      pet_id,
    ],
    (error: any, result: BasicPet) => {
      if (Object.keys(result).length === 0) {
        res.status(404);
        res.json({ status: "PET NOT CREATED BY ID!", message: error });
      } else {
        res.status(201);
        res.json(result);
      }
    }
  );
};

const deletePet = (req: Request, res: Response) => {
  let pet_id = req.params.id;
  db.query(
    "DELETE FROM pets WHERE id= ?",
    pet_id,
    (error: any, result: BasicPet) => {
      if (Object.keys(result).length === 0) {
        res.status(404);
        res.json({ status: "PET NOT DELETED!", message: error });
      } else {
        res.status(201);
        res.json(result);
      }
    }
  );
};

const createPetbyimage = (req: Request, res: Response) => {
  let pet = req.body;
  let pet_id = req.params.id;
  console.log(pet.photoUrls);
  db.query(
    "UPDATE pets SET photoUrls= ? WHERE id= ?",
    [pet.photoUrls, pet_id],
    (error: any, result: BasicPet) => {
      if (Object.keys(result).length === 0) {
        res.status(404);
        res.json({ status: "PET NOT CREATED BY IMAGE!", message: error });
      } else {
        res.status(201);
        res.json(result);
      }
    }
  );
};

export {
  getPetbyid,
  getPetbystatus,
  getPetbytags,
  createPet,
  updatePetbyid,
  createPetbyimage,
  createPetbyid,
  deletePet,
};
