function NoteList({ notes, loading, onEdit, onDelete }) {
    if (loading) {
        return <p>Loading notes...</p>;
    }

    if (notes.length === 0) {
        return <p>No notes available. Create your first note!</p>;
    }

    return (
        <div>
            {notes.map((note) => (
                <article key={note._id}>
                    <h3>{note.title}</h3>

                    <p>
                        <strong>Subject:</strong> {note.subject}
                    </p>

                    <p>{note.content}</p>

                    <small>
                        Created:{" "}
                        {new Date(note.createdAt).toLocaleString()}
                    </small>

                    <div>
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