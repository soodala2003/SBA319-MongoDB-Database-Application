import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import Joi from "joi";

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

    // Create the schema
    const schema = Joi.object({
        _id: Joi.object(),
        name: Joi.string().required(),
        email: Joi.string().email().required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        const errorDetails = error.details.map(d => d.message).join("<br>");
        res.send(`<h2>ValidationError: </h2>${errorDetails}`);
        return;
    } else {
        await collection.insertOne(newDocument);
    }

    // Redirect the users page  
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
