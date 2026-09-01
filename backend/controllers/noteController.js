const Note = require("../models/Note");

// Create a new note
const createNote = async (req, res) => {
    try {
        const { title, subject, content } = req.body;

        const note = await Note.create({
            title,
            subject,
            content
        });

        res.status(201).json({
            success: true,
            message: "Note created successfully",
            data: note
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create note",
            error: error.message
        });
    }
};

// Get all notes
const getNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: notes.length,
            data: notes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve notes",
            error: error.message
        });
    }
};

module.exports = {
    createNote,
    getNotes
};