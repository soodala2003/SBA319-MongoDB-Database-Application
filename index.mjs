import express from "express";
import dotenv from "dotenv";
import expressLayout from "express-ejs-layouts";
import main from "./routes/main.mjs";
import users from "./routes/users.mjs";
import comments from "./routes/comments.mjs";
import movies from "./routes/movies.mjs";

dotenv.config();

const PORT = process.env.PORT || 5050;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Templating Engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.use("/", main);

app.use("/users", users);
app.use("/comments", comments);
app.use("/movies", movies);

// Global error handling
app.use((err, _req, res, next) => {
    res.status(500).send("Seems like we messed up somewhere...");
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});