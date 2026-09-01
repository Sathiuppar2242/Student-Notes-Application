import { useEffect, useState } from "react";
import {
    getNotes,
    createNote,
    updateNote,
    deleteNote
} from "./services/noteService";

function App() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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
            setError("Unable to load notes. Please check the backend.");
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

            loadNotes();
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
    };

    const handleDelete = async (id) => {
        try {
            setError("");

            await deleteNote(id);
            loadNotes();
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

    return (
        <div>
            <header>
                <h1>Student Notes Application</h1>
                <p>Organize your study notes by subject</p>
            </header>

            <main>
                <section>
                    <h2>{editingId ? "Edit Note" : "Create Note"}</h2>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="title"
                            placeholder="Note title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        />

                        <textarea
                            name="content"
                            placeholder="Write your note..."
                            value={formData.content}
                            onChange={handleChange}
                            required
                            rows="6"
                        />

                        <button type="submit">
                            {editingId ? "Update Note" : "Add Note"}
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                            >
                                Cancel
                            </button>
                        )}
                    </form>
                </section>

                <section>
                    <h2>My Notes</h2>

                    {error && <p>{error}</p>}

                    {loading ? (
                        <p>Loading notes...</p>
                    ) : notes.length === 0 ? (
                        <p>No notes available. Create your first note!</p>
                    ) : (
                        notes.map((note) => (
                            <article key={note._id}>
                                <h3>{note.title}</h3>

                                <p>
                                    <strong>Subject:</strong>{" "}
                                    {note.subject}
                                </p>

                                <p>{note.content}</p>

                                <small>
                                    Created:{" "}
                                    {new Date(
                                        note.createdAt
                                    ).toLocaleString()}
                                </small>

                                <div>
                                    <button
                                        onClick={() =>
                                            handleEdit(note)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(note._id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                            </article>
                        ))
                    )}
                </section>
            </main>
        </div>
    );
}

export default App;