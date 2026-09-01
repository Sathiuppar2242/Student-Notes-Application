const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const noteRoutes = require("./routes/noteRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// API routes
app.use("/api/notes", noteRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Student Notes API is running successfully"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});