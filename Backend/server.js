const express = require('express'); // Import Express framework
const { createServer } = require('node:http'); // Import createServer from node:http

const app = express(); // Initialize Express app
const server = createServer(app); // Create HTTP server using Express app

// CORS configuration for production
const FRONTEND_URL = process.env.FRONTEND_URL || '*';

const io = require('socket.io')(server, {
    cors: {
        origin: FRONTEND_URL === '*' ? '*' : FRONTEND_URL.split(','),
        methods: ['GET', 'POST'],
        credentials: true
    },
});

// Health check endpoint for deployment
app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'Chat.io Backend Running' });
});

app.get('/health', (req, res) => {
    res.json({ status: 'healthy', uptime: process.uptime() });
});

io.on('connection', (socket) => { // Listen for client connections
    console.log('A user connected:', socket.id); // Log when a user connects

    socket.on('chat', (payload) => {
        console.log('Message received:', payload); // Log received chat message
        io.emit('chat', payload); // Broadcast the chat message to all connected clients
    })
    socket.on('disconnect', () => { // Listen for client disconnections
        console.log('A user disconnected:', socket.id); // Log when a user disconnects
    });
});

// Use environment variable PORT for deployment (Render, Railway, etc.)
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});