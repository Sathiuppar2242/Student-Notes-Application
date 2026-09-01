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
                {error && <p>{error}</p>}

                <NoteForm
                    formData={formData}
                    editingId={editingId}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    onCancel={handleCancelEdit}
                />

                <section>
                    <h2>My Notes</h2>

                    <NoteList
                        notes={notes}
                        loading={loading}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </section>
            </main>
        </div>
    );
}

export default App;