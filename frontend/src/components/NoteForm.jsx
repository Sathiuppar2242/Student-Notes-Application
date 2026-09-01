function NoteForm({
    formData,
    editingId,
    onChange,
    onSubmit,
    onCancel
}) {
    return (
        <section className="note-form-section">
            <div className="form-header">
                <h2>{editingId ? "Edit Note" : "Create Note"}</h2>

                <p>
                    {editingId
                        ? "Update your existing study note."
                        : "Add a new note to your collection."}
                </p>
            </div>

            <form onSubmit={onSubmit} className="note-form">
                <div className="form-group">
                    <label htmlFor="title">
                        Note Title
                    </label>

                    <input
                        id="title"
                        type="text"
                        name="title"
                        placeholder="Enter note title"
                        value={formData.title}
                        onChange={onChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="subject">
                        Subject
                    </label>

                    <input
                        id="subject"
                        type="text"
                        name="subject"
                        placeholder="Enter subject"
                        value={formData.subject}
                        onChange={onChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="content">
                        Note Content
                    </label>

                    <textarea
                        id="content"
                        name="content"
                        placeholder="Write your note here..."
                        value={formData.content}
                        onChange={onChange}
                        required
                        rows="7"
                    />
                </div>

                <div className="form-actions">
                    <button type="submit">
                        {editingId ? "Update Note" : "Add Note"}
                    </button>

                    {editingId && (
                        <button
                            type="button"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </section>
    );
}

export default NoteForm;