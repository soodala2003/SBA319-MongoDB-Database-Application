import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get all names that have commented
router.get("/", async (req, res) => {
    let collection = await db.collection("comments");
    let results = await collection
        .find({}).limit(20).toArray();

    //res.send(results).status(200);
    res.render("comments", { results});
});

// Get a single comment
router.get("/:id", async (req, res) => {
    let collection = await db.collection("comments");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.render("comments_id", { result });
    //else res.send(result).status(200);
});

// "/comment/:id"
// Update the post with a new comment
router.patch("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $push: { text: req.body },
    };
  
    let collection = await db.collection("comments");
    let result = await collection.updateOne(query, updates);
  
    res.send(result).status(200);
});

export default router;