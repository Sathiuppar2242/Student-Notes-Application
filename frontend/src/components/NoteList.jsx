function NoteList({ notes, loading, onEdit, onDelete }) {
    if (loading) {
        return <p>Loading notes...</p>;
    }

    if (notes.length === 0) {
        return (
            <div className="empty-state">
                No notes available. Create your first note!
            </div>
        );
    }

    return (
        <div className="notes-grid">
            {notes.map((note) => (
                <article className="note-card" key={note._id}>
                    <h3>{note.title}</h3>

                    <span className="note-subject">
                        {note.subject}
                    </span>

                    <p className="note-content">
                        {note.content}
                    </p>

                    <small className="note-date">
                        Created:{" "}
                        {new Date(note.createdAt).toLocaleString()}
                    </small>

                    <div className="note-actions">
                        <button onClick={() => onEdit(note)}>
                            Edit
                        </button>

                        <button onClick={() => onDelete(note._id)}>
                            Delete
                        </button>
                    </div>
                </article>
            ))}
        </div>
    );
}

export default NoteList;