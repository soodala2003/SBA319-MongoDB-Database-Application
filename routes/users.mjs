import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get all users entries
router.get("/", async (req, res) => {
    let collection = await db.collection("users");
    let results = await collection.find({}).toArray();
    //res.send(results).status(200);
    res.render("users", { results });
}); 

// Get a single user
router.get("/:id", async (req, res) => {
    let collection = await db.collection("users");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

// Add a new user to the collection
router.post("/", async (req, res) => {
    let collection = await db.collection("users");
    let newDocument = req.body;
    newDocument.date = new Date();
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
});

export default router;
