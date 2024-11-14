import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get all names that have commented
router.get("/", async (req, res) => {
    let collection = await db.collection("comments");

    // Define the query to create the index
    const sort = { date: -1 };

    let results = await collection
        .find()
        .sort(sort)
        .toArray();
        
    res.render("comments", { results });
});

// Get a single comment
router.get("/:id", async (req, res) => {
    let collection = await db.collection("comments");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.render("comments_id", { result });
});

// Add a new comment to the collection
router.post("/", async (req, res) => {
    let collection = await db.collection("comments");
    let newDocument = req.body;
    newDocument.date = new Date();
    let result = await collection.insertOne(newDocument);

    res.redirect("comments");
});

// Update a comment
router.patch("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: { 
        name: req.body.name, 
        email: req.body.email, 
        movie_id: req.body.movie_id,
        text_body: req.body.text_body,
      },
    };
  
    let collection = await db.collection("comments");
    let result = await collection.updateOne(query, updates);
  
    res.redirect("/comments"); 
});

// Delete an entry
router.delete("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
  
    const collection = db.collection("comments");
    let result = await collection.deleteOne(query);

    res.redirect("/comments");
});

export default router;