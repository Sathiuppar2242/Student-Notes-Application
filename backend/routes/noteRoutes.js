const express = require("express");

const {
    createNote,
    getNotes,
    updateNote,
    deleteNote
} = require("../controllers/noteController");

const router = express.Router();

// Create a new note
router.post("/", createNote);

// Get all notes
router.get("/", getNotes);

// Update a note
router.put("/:id", updateNote);

// Delete a note
router.delete("/:id", deleteNote);

module.exports = router;