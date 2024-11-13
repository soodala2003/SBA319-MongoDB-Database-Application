import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get 20 movies with "_id", "plot", "tilte", and "year" entries 
router.get("/", async (req, res) => {
    let collection = await db.collection("movies");
    let results = await collection
        .aggregate([
            { $project: { _id: 1, plot: 1, title: 1, year: 1 } },
        ])
        .limit(20)
        .toArray();
    res.render("movies", { results });
});

// Get a single movie
router.get("/:id", async (req, res) => {
    let collection = await db.collection("movies");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

export default router;