function NoteForm({
    formData,
    editingId,
    onChange,
    onSubmit,
    onCancel
}) {
    return (
        <section>
            <h2>{editingId ? "Edit Note" : "Create Note"}</h2>

            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Note title"
                    value={formData.title}
                    onChange={onChange}
                    required
                />

                <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={onChange}
                    required
                />

                <textarea
                    name="content"
                    placeholder="Write your note..."
                    value={formData.content}
                    onChange={onChange}
                    required
                    rows="6"
                />

                <button type="submit">
                    {editingId ? "Update Note" : "Add Note"}
                </button>

                {editingId && (
                    <button type="button" onClick={onCancel}>
                        Cancel
                    </button>
                )}
            </form>
        </section>
    );
}

export default NoteForm;