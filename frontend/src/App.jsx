import { useEffect, useState } from "react";
import {
    getNotes,
    createNote,
    updateNote,
    deleteNote
} from "./services/noteService";

import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

function App() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("All");

    const [formData, setFormData] = useState({
        title: "",
        subject: "",
        content: ""
    });

    const [editingId, setEditingId] = useState(null);

    const loadNotes = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getNotes();
            setNotes(response.data);
        } catch (err) {
            setError(
                "Unable to load notes. Please check the backend."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadNotes();
    }, []);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setError("");

            if (editingId) {
                await updateNote(editingId, formData);
                setEditingId(null);
            } else {
                await createNote(formData);
            }

            setFormData({
                title: "",
                subject: "",
                content: ""
            });

            await loadNotes();
        } catch (err) {
            setError("Unable to save note.");
        }
    };

    const handleEdit = (note) => {
        setEditingId(note._id);

        setFormData({
            title: note.title,
            subject: note.subject,
            content: note.content
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this note?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");

            await deleteNote(id);
            await loadNotes();
        } catch (err) {
            setError("Unable to delete note.");
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);

        setFormData({
            title: "",
            subject: "",
            content: ""
        });
    };

    const subjects = [
        "All",
        ...new Set(notes.map((note) => note.subject))
    ];

    const filteredNotes = notes.filter((note) => {
        const search = searchTerm.toLowerCase();

        const matchesSearch =
            note.title.toLowerCase().includes(search) ||
            note.content.toLowerCase().includes(search) ||
            note.subject.toLowerCase().includes(search);

        const matchesSubject =
            selectedSubject === "All" ||
            note.subject === selectedSubject;

        return matchesSearch && matchesSubject;
    });

    return (
        <div>
            <header>
                <h1>Student Notes Application</h1>
                <p>Organize your study notes by subject</p>
            </header>

            <main>
                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}

                <NoteForm
                    formData={formData}
                    editingId={editingId}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    onCancel={handleCancelEdit}
                />

                <section>
                    <h2>Search and Filter Notes</h2>

                    <div className="search-controls">
                        <input
                            type="text"
                            placeholder="Search notes..."
                            value={searchTerm}
                            onChange={(event) =>
                                setSearchTerm(event.target.value)
                            }
                        />

                        <select
                            value={selectedSubject}
                            onChange={(event) =>
                                setSelectedSubject(event.target.value)
                            }
                        >
                            {subjects.map((subject) => (
                                <option
                                    key={subject}
                                    value={subject}
                                >
                                    {subject}
                                </option>
                            ))}
                        </select>
                    </div>
                </section>

                <section>
                    <div className="notes-header">
                        <h2>My Notes</h2>

                        <span className="note-count">
                            {filteredNotes.length}{" "}
                            {filteredNotes.length === 1
                                ? "Note"
                                : "Notes"}
                        </span>
                    </div>

                    {filteredNotes.length === 0 && !loading ? (
                        <div className="empty-state">
                            No notes match your search or filter.
                        </div>
                    ) : (
                        <NoteList
                            notes={filteredNotes}
                            loading={loading}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )}
                </section>
            </main>

            <footer>
                <p>
                    Student Notes Application © 2026
                </p>
            </footer>
        </div>
    );
}

export default App;