const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const noteRoutes = require("./routes/noteRoutes");
const errorHandler = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// Health check
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Student Notes API is healthy"
    });
});

// API routes
app.use("/api/notes", noteRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Student Notes API is running successfully"
    });
});

// Centralized error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});