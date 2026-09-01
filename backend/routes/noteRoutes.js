const express = require("express");

const {
    createNote,
    getNotes
} = require("../controllers/noteController");

const router = express.Router();

// Create a new note
router.post("/", createNote);

// Get all notes
router.get("/", getNotes);

module.exports = router;