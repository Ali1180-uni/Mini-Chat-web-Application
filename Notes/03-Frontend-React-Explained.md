# ⚛️ Frontend React + Socket.IO Integration

## Overview

This guide explains how to integrate Socket.IO with a React application for real-time features.

---

## 📦 Required Packages

```bash
npm install socket.io-client nanoid
```

| Package | Purpose |
|---------|---------|
| `socket.io-client` | Connect to Socket.IO server |
| `nanoid` | Generate unique user IDs |

---

## 🏗️ React + Socket.IO Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    React Application                    │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │                  App Component                   │   │
│  │                                                  │   │
│  │  ┌──────────────┐    ┌───────────────────────┐  │   │
│  │  │    State     │    │   Socket.IO Client    │  │   │
│  │  │  - message   │<──>│  - emit() (send)      │  │   │
│  │  │  - chat[]    │    │  - on() (receive)     │  │   │
│  │  └──────────────┘    └───────────────────────┘  │   │
│  │                                                  │   │
│  └─────────────────────────────────────────────────┘   │
│                            │                            │
└────────────────────────────┼────────────────────────────┘
                             │ WebSocket
                             ▼
                    ┌─────────────────┐
                    │  Backend Server │
                    │   (Port 3000)   │
                    └─────────────────┘
```

---

## 🔧 Step-by-Step Integration

### Step 1: Import Dependencies

```javascript
import { useState, useEffect } from "react";
import io from "socket.io-client";
import { nanoid } from "nanoid";
```

| Import | Purpose |
|--------|---------|
| `useState` | Manage component state (message, chat) |
| `useEffect` | Handle side effects (socket listeners) |
| `io` | Create socket connection |
| `nanoid` | Generate unique username |

### Step 2: Create Socket Connection

```javascript
const socket = io.connect("http://localhost:3000");
```

**Important Notes:**
- URL must match your backend server
- Connection is created ONCE (outside component)
- If inside component, creates new connection on every render

### Step 3: Generate Unique Username

```javascript
const username = nanoid(4);  // e.g., "xK9m"
```

The `4` means 4 characters. Options:
- `nanoid(4)` → "xK9m"
- `nanoid(8)` → "V1StGXR8"
- `nanoid(21)` → Full length (default)

---

## 📊 React State Management

### State Variables

```javascript
const [message, setMessage] = useState("");  // Current input
const [chat, setChat] = useState([]);        // All messages
```

**Visual:**
```
┌─────────────────────────────────────────┐
│                State                     │
├──────────────┬──────────────────────────┤
│   message    │  "Hello everyone!"       │
├──────────────┼──────────────────────────┤
│    chat      │  [                       │
│              │    {msg: "Hi", user: "a"}│
│              │    {msg: "Hey", user: "b"}│
│              │  ]                       │
└──────────────┴──────────────────────────┘
```

---

## 📤 Sending Messages

### Form Submit Handler

```javascript
const sendchat = (e) => {
    e.preventDefault();                        // Prevent page refresh
    socket.emit("chat", {message, username});  // Send to server
    setMessage("");                            // Clear input
};
```

### Flow:
```
User types    →   Clicks Send   →   socket.emit()   →   Server
"Hello"           (or Enter)        sends data          receives
```

---

## 📥 Receiving Messages

### useEffect Hook

```javascript
useEffect(() => {
    socket.on("chat", (payload) => {
        setChat([...chat, payload]);  // Add new message
    });
});
```

**Why useEffect?**
- Sets up event listener after component mounts
- React needs to know when state changes

**What happens:**
```
Server broadcasts   →   socket.on() fires   →   setChat()   →   UI updates
    message                                       adds msg        shows msg
```

---

## 🎨 JSX Structure

```jsx
<div className="content">
    {/* Header */}
    <div className="chat-header">
        <h1>Chat.io</h1>
        <span className="status">Online</span>
    </div>

    {/* Messages */}
    <div className="chatBox">
        {chat.map((payload, index) => (
            <div key={index} className="message-wrapper">
                <div className="message-bubble">
                    <span>{payload.username}</span>
                    <p>{payload.message}</p>
                </div>
            </div>
        ))}
    </div>

    {/* Input */}
    <div className="txtInput">
        <form onSubmit={sendchat}>
            <input 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">Send</button>
        </form>
    </div>
</div>
```

---

## 🔄 Data Flow Summary

```
┌─────────────────────────────────────────────────────────┐
│                    SENDING MESSAGE                      │
│                                                         │
│  User types → onChange → setMessage() → state updates  │
│                                                         │
│  User clicks Send → onSubmit → socket.emit() → Server  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                   RECEIVING MESSAGE                     │
│                                                         │
│  Server broadcasts → socket.on() fires → setChat()     │
│                                                         │
│  State updates → React re-renders → New message shows  │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 Identifying Own Messages

```javascript
const isMe = payload.username === username;
```

This compares the message sender with our username:

| Scenario | `isMe` value | CSS Class |
|----------|--------------|-----------|
| I sent it | `true` | `my-message` (right-aligned) |
| Someone else | `false` | `other-message` (left-aligned) |

---

## ⚠️ Common Mistakes

| Mistake | Problem | Solution |
|---------|---------|----------|
| Socket inside component | New connection every render | Put outside component |
| No useEffect | Event listeners don't work | Wrap in useEffect |
| Mutating state directly | React doesn't re-render | Use spread operator |
| Missing key in map() | React warning | Add `key={index}` |

---

## 📊 Complete Pattern

```javascript
import { useState, useEffect } from "react";
import io from "socket.io-client";

// 1. Create socket OUTSIDE component
const socket = io.connect("http://localhost:3000");

function App() {
    // 2. State for messages
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);

    // 3. Send messages
    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit("chat", { message });
        setMessage("");
    };

    // 4. Receive messages
    useEffect(() => {
        socket.on("chat", (data) => {
            setChat(prev => [...prev, data]);
        });
    }, []);

    // 5. Render UI
    return (
        <div>
            {chat.map((msg, i) => <p key={i}>{msg.message}</p>)}
            <form onSubmit={sendMessage}>
                <input 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                />
                <button>Send</button>
            </form>
        </div>
    );
}
```

---

## 📚 Next: Line-by-Line Code Breakdown

Continue to [04-App-JSX-Line-by-Line.md](./04-App-JSX-Line-by-Line.md)
