# 💬 Chat.io - Real-Time Chat Application

A modern real-time chat application built with **React**, **Socket.IO**, and **Express.js**. Features a beautiful, responsive UI with instant messaging capabilities.

![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?style=for-the-badge&logo=react)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socketdotio)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

---

## 🚀 Deployment

**Frontend**: Deploy on [Netlify](https://netlify.com)  
**Backend**: Deploy on [Render](https://render.com) (WebSocket support)

📖 **See [DEPLOYMENT.md](DEPLOYMENT.md) for full deployment guide**

---

## 📸 Preview

A sleek, iMessage-style chat interface with:
- Real-time message delivery
- User identification with unique IDs
- Gradient message bubbles
- Responsive design for all devices

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 19 | UI Framework |
| Vite 7 | Build Tool & Dev Server |
| Socket.IO Client | Real-time Communication |
| nanoid | Unique ID Generation |

### Backend
| Technology | Purpose |
|------------|---------|
| Express.js 5 | Web Server Framework |
| Socket.IO | WebSocket Server |
| Node.js | Runtime Environment |

---

## 📁 Project Structure

```
Socket io/
├── Backend/
│   ├── server.js          # Express + Socket.IO server
│   ├── package.json       # Backend dependencies
│   └── node_modules/
│
├── Frontend/
│   └── Chat.io/
│       ├── src/
│       │   ├── App.jsx    # Main React component
│       │   ├── App.css    # Styling (fully commented)
│       │   ├── main.jsx   # React entry point
│       │   └── index.css  # Global styles
│       ├── index.html     # HTML template
│       ├── vite.config.js # Vite configuration
│       └── package.json   # Frontend dependencies
│
├── Notes/                 # Development notes
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)

### Installation

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Ali1180-uni/Mini-Chat-web-Application.git
cd Mini-Chat-web-Application
```

#### 2️⃣ Setup Backend

```bash
# Navigate to Backend folder
cd Backend

# Install dependencies
npm install

# Start the server
npm start
```

The backend server will start on **http://localhost:3000**

#### 3️⃣ Setup Frontend

Open a **new terminal** and run:

```bash
# Navigate to Frontend folder
cd Frontend/Chat.io

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start on **http://localhost:5173** (Vite default)

---

## 🎮 Usage

1. **Start the Backend** first (it must be running for chat to work)
2. **Start the Frontend** in a separate terminal
3. Open **http://localhost:5173** in your browser
4. Open the same URL in another browser/tab to test real-time chat
5. Start chatting! Messages appear instantly on all connected clients

---

## 📝 Available Scripts

### Backend (`/Backend`)

| Command | Description |
|---------|-------------|
| `npm start` | Start server with nodemon (auto-restart on changes) |

### Frontend (`/Frontend/Chat.io`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint for code quality |

---

## ⚙️ Configuration

### Backend Port
Edit `Backend/server.js`:
```javascript
const PORT = 3000; // Change this to your desired port
```

### Frontend Socket Connection
If you change the backend port, update `Frontend/Chat.io/src/App.jsx`:
```javascript
const socket = io.connect("http://localhost:3000"); // Update port here
```

### CORS Configuration
The backend is configured to accept connections from any origin (`*`). For production, update `Backend/server.js`:
```javascript
const io = require('socket.io')(server, {
    cors: {
        origin: 'https://your-domain.com', // Specify your frontend URL
    },
});
```

---

## 🔧 How It Works

### Socket.IO Flow

```
┌─────────────┐          ┌─────────────┐          ┌─────────────┐
│   Client A  │          │   Server    │          │   Client B  │
└──────┬──────┘          └──────┬──────┘          └──────┬──────┘
       │                        │                        │
       │  socket.emit('chat')   │                        │
       │───────────────────────>│                        │
       │                        │                        │
       │                        │  io.emit('chat')       │
       │                        │───────────────────────>│
       │<───────────────────────│                        │
       │                        │                        │
```

1. **Connection**: Client connects to server via WebSocket
2. **Send**: Client emits 'chat' event with message + username
3. **Broadcast**: Server broadcasts to ALL connected clients
4. **Receive**: All clients receive and display the message

---

## 🎨 Customization

### Changing Colors
Edit `Frontend/Chat.io/src/App.css` - all color values are commented:

```css
/* MY MESSAGE BUBBLE - Blue/Purple gradient */
.my-message .message-bubble {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
}

/* OTHER'S MESSAGE BUBBLE - Light gray */
.other-message .message-bubble {
  background-color: #f3f4f6;
}
```

### Changing Username Length
Edit `Frontend/Chat.io/src/App.jsx`:
```javascript
const username = nanoid(4); // Change 4 to desired length
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Messages not sending | Make sure Backend is running on port 3000 |
| CORS errors | Check backend CORS configuration |
| Port already in use | Change the PORT in `server.js` |
| Frontend can't connect | Verify socket URL matches backend port |

---

## 📜 License

This project is open source and available under the [ISC License](LICENSE).

---

## 👨‍💻 Author

**Ali Rehmani**

- GitHub: [@Ali1180-uni](https://github.com/Ali1180-uni)

---

## 🙏 Acknowledgments

- [Socket.IO](https://socket.io/) for real-time engine
- [Vite](https://vitejs.dev/) for blazing fast builds
- [React](https://react.dev/) for the UI library

---

<p align="center">
  Made with ❤️ by Ali
</p>
