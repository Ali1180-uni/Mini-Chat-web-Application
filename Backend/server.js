const express = require('express'); // Import Express framework
const { createServer } = require('node:http'); // Import createServer from node:http

const app = express(); // Initialize Express app
const server = createServer(app); // Create HTTP server using Express app

const io = require('socket.io')(server, { // Adding CORS configuration
    cors: {
        origin: '*', // Not Recommended for Production
    },
});

io.on('connection', (socket) => { // Listen for client connections
    console.log('What is Socket', socket);
    console.log('A user connected:', socket.id); // Log when a user connects

    socket.on('chat', (payload) => {
        console.log('Message received:', payload); // Log received chat message
        io.emit('chat', payload); // Broadcast the chat message to all connected clients
    })
    socket.on('disconnect', () => { // Listen for client disconnections
        console.log('A user disconnected:', socket.id); // Log when a user disconnects
    });
});

// Not using Express server thats why we use server.listen
// app.listen(4000, () => { // Start Express app on port 4000
//     console.log('Express server is running on http://localhost:4000'); // Log server start message
// });


const PORT = 3000; // Define the port to listen on
server.listen(PORT, () => { // Start the server
    console.log(`Server is running on http://localhost:${PORT}`); // Log server start message
});