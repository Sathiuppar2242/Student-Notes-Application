# Student Notes Application

A full-stack web application for creating, managing, searching, filtering, updating, and deleting student study notes.

The application uses a React frontend, Node.js and Express.js backend, and MongoDB Atlas for persistent cloud database storage.

---

## 🚀 Features

- Create new study notes
- View all notes
- Edit existing notes
- Delete notes with confirmation
- Search notes by title, subject, or content
- Filter notes by subject
- Clear search and filters
- Dynamic note count
- Loading indicator
- Error handling
- Responsive mobile-friendly interface
- MongoDB Atlas cloud database
- RESTful API
- Environment variable protection
- Separate frontend and backend structure

---

## 🛠️ Technologies Used

### Frontend

- React
- Vite
- Axios
- HTML
- CSS
- JavaScript

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- CORS

### Development Tools

- Visual Studio Code
- Git
- GitHub
- Postman
- MongoDB Atlas

---

## 📁 Project Structure

```text
Student-Notes-Application/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── NoteForm.jsx
│   │   │   └── NoteList.jsx
│   │   │
│   │   ├── services/
│   │   │   └── noteService.js
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md

The exact folder structure may vary depending on the final project files.

⚙️ Installation
1. Clone the Repository
git clone YOUR_GITHUB_REPOSITORY_URL

Navigate into the project:

cd Student-Notes-Application
🔧 Backend Setup

Navigate to the backend:

cd backend

Install dependencies:

npm install

Create a .env file inside the backend folder:

PORT=5000
MONGODB_URI=YOUR_MONGODB_ATLAS_CONNECTION_STRING

Do not share or commit your actual MongoDB connection string.

Start the backend:

node server.js

The backend will run at:

http://localhost:5000
💻 Frontend Setup

Open another terminal.

Navigate to the frontend:

cd frontend

Install dependencies:

npm install

Start the React development server:

npm run dev

Open the Vite URL displayed in the terminal, usually:

http://localhost:5173
🔗 API Endpoints
Get All Notes
GET /api/notes
Create Note
POST /api/notes

Example request:

{
  "title": "Introduction to Java",
  "subject": "Java Programming",
  "content": "Java is an object-oriented programming language."
}
Update Note
PUT /api/notes/:id
Delete Note
DELETE /api/notes/:id
🧪 Testing

The application was tested for the following functionality:

Create note
Read notes
Update note
Delete note
Delete confirmation
Search functionality
Subject filtering
Clear search
Dynamic note count
Loading state
Responsive layout
MongoDB Atlas connectivity
REST API integration

All core functional tests passed successfully.

🔐 Security

Sensitive environment variables are stored in .env.

The .env file is excluded from Git using .gitignore.

Never commit database credentials or other secrets to GitHub.

📌 Future Enhancements

Possible future improvements include:

User authentication
Student-specific notes
Note categories
Favorite notes
Rich text editor
Dark mode
Pagination
Note sorting
Deployment to a cloud platform
JWT authentication
Advanced dashboard and analytics
👨‍💻 Author

Sathish R

Computer Science Engineering Student

📄 License

This project is created for educational and portfolio purposes.