import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get all users entries
router.get("/", async (req, res) => {
    let collection = await db.collection("users");
    let results = await collection
        .aggregate([
            { $project: { _id: 1, name: 1, email: 1 } },
        ]) 
        .toArray();
    res.render("users", { results });
}); 

// Get a single user
router.get("/:id", async (req, res) => {
    let collection = await db.collection("users");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.render("user_id", { result });
});

// Add a new user to the collection
router.post("/", async (req, res) => {
    let collection = await db.collection("users");
    let newDocument = req.body;
    newDocument.date = new Date();
    let result = await collection.insertOne(newDocument);

    res.redirect("users");
});

// Update a user data
router.patch("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: { 
        name: req.body.name, 
        email: req.body.email, 
      },
    };
  
    let collection = await db.collection("users");
    let result = await collection.updateOne(query, updates);
  
    res.redirect("/users"); 
});

// Delete an entry
router.delete("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
  
    const collection = db.collection("users");
    let result = await collection.deleteOne(query);

    res.redirect("/users");
});

export default router;
