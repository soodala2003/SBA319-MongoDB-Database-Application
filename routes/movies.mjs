import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get all movies entries 
router.get("/", async (req, res) => {
    let collection = await db.collection("movies");
    let results = await collection
        .aggregate([
            { $project: { _id: 1, plot: 1, title: 1, year: 1 } },
        ])
        .toArray();
    res.render("movies", { results });
});

// Get a single movie
router.get("/:id", async (req, res) => {
    let collection = await db.collection("movies");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.render("movie_id", { result });
});

// Add a new movie to the collection
router.post("/", async (req, res) => {
    let collection = await db.collection("movies");
    let newDocument = req.body;
    newDocument.date = new Date();
    let result = await collection.insertOne(newDocument);

    res.redirect("movies");
});

// Update a movie data
router.patch("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: { 
        title: req.body.title, 
        plot: req.body.plot, 
        year: req.body.year,
      },
    };
  
    let collection = await db.collection("movies");
    let result = await collection.updateOne(query, updates);
  
    res.redirect("/movies"); 
});

// Delete an entry
router.delete("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
  
    const collection = db.collection("movies");
    let result = await collection.deleteOne(query);

    res.redirect("/movies");
});

export default router;