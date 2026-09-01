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

// Update a note
const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, subject, content } = req.body;

        const note = await Note.findByIdAndUpdate(
            id,
            {
                title,
                subject,
                content
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Note updated successfully",
            data: note
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update note",
            error: error.message
        });
    }
};

// Delete a note
const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;

        const note = await Note.findByIdAndDelete(id);

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Note deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete note",
            error: error.message
        });
    }
};

module.exports = {
    createNote,
    getNotes,
    updateNote,
    deleteNote
};