# 🖥️ Backend Server Setup - Express + Socket.IO

## Overview

This guide explains how to set up a Socket.IO server with Express.js for real-time communication.

---

## 📦 Required Packages

```bash
npm install express socket.io
```

| Package | Purpose |
|---------|---------|
| `express` | Web server framework |
| `socket.io` | WebSocket server with extra features |

---

## 🏗️ Server Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Your Server                          │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │              HTTP Server (Node.js)               │   │
│  │  ┌─────────────────┐  ┌─────────────────────┐   │   │
│  │  │   Express App   │  │   Socket.IO Server  │   │   │
│  │  │  (REST routes)  │  │  (WebSocket events) │   │   │
│  │  └─────────────────┘  └─────────────────────┘   │   │
│  └─────────────────────────────────────────────────┘   │
│                         │                               │
│                    Port 3000                            │
└─────────────────────────────────────────────────────────┘
```

---

## 🔧 Step-by-Step Setup

### Step 1: Import Required Modules

```javascript
const express = require('express');
const { createServer } = require('node:http');
```

- **`express`**: The web framework
- **`createServer`**: Creates an HTTP server from Node.js

### Step 2: Create Express App

```javascript
const app = express();
```

This creates your Express application instance.

### Step 3: Create HTTP Server

```javascript
const server = createServer(app);
```

**Why?** Socket.IO needs a raw HTTP server, not just Express.

```
❌ Wrong: app.listen(3000)  → Socket.IO won't work properly
✅ Right: server.listen(3000) → Socket.IO attaches to this
```

### Step 4: Initialize Socket.IO

```javascript
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    },
});
```

**CORS Configuration:**
| Option | Meaning |
|--------|---------|
| `origin: '*'` | Accept connections from ANY domain |
| `origin: 'http://localhost:5173'` | Only accept from this URL |

⚠️ **Security Note**: Use specific origin in production!

---

## 📡 Socket.IO Event Handling

### Connection Event

```javascript
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
});
```

This fires when ANY client connects. The `socket` object represents that specific client.

### Custom Events

```javascript
socket.on('eventName', (data) => {
    // Handle the event
    console.log('Received:', data);
});
```

### Broadcasting

```javascript
// To ALL clients (including sender)
io.emit('eventName', data);

// To everyone EXCEPT the sender
socket.broadcast.emit('eventName', data);
```

### Disconnect Event

```javascript
socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
});
```

---

## 🎯 Chat Server Pattern

```javascript
io.on('connection', (socket) => {
    // 1. Log new connection
    console.log('User connected:', socket.id);

    // 2. Listen for chat messages
    socket.on('chat', (payload) => {
        // 3. Broadcast to everyone
        io.emit('chat', payload);
    });

    // 4. Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});
```

### Flow Diagram

```
┌──────────┐          ┌──────────┐          ┌──────────┐
│ Client A │          │  Server  │          │ Client B │
└────┬─────┘          └────┬─────┘          └────┬─────┘
     │                     │                     │
     │  emit('chat', msg)  │                     │
     │────────────────────>│                     │
     │                     │                     │
     │                     │  io.emit('chat')    │
     │<────────────────────│────────────────────>│
     │   (receives msg)    │   (receives msg)    │
     │                     │                     │
```

---

## 🚀 Starting the Server

```javascript
const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
```

**Note**: We use `server.listen()`, NOT `app.listen()`!

---

## 📊 Complete Server Template

```javascript
// 1. Imports
const express = require('express');
const { createServer } = require('node:http');

// 2. Create servers
const app = express();
const server = createServer(app);

// 3. Initialize Socket.IO with CORS
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    },
});

// 4. Handle connections
io.on('connection', (socket) => {
    console.log('Connected:', socket.id);

    // Handle custom events here
    socket.on('chat', (data) => {
        io.emit('chat', data);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected:', socket.id);
    });
});

// 5. Start server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`);
});
```

---

## ⚠️ Common Mistakes

| Mistake | Problem | Solution |
|---------|---------|----------|
| Using `app.listen()` | Socket.IO won't attach | Use `server.listen()` |
| No CORS config | Frontend can't connect | Add `cors: { origin: '*' }` |
| Wrong Socket.IO version | Connection fails | Match client/server versions |
| Forgetting `io.emit()` | Messages don't broadcast | Use `io.emit()` not `socket.emit()` |

---

## 📚 Next: Frontend React Setup

Continue to [03-Frontend-React-Explained.md](./03-Frontend-React-Explained.md)
