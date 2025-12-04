// ============================================
// IMPORTS
// ============================================

import { useState, useEffect } from "react"; // React hooks for state management and side effects
import io from "socket.io-client";            // Socket.IO client library for real-time communication
import { nanoid } from "nanoid";              // Library to generate unique random IDs
import "./App.css";                           // Import the CSS styles for this component

// ============================================
// SOCKET & USER SETUP
// ============================================

// Connect to the Socket.IO server running on localhost:3000
const socket = io.connect("http://localhost:3000");

// Generate a unique 4-character username for this user (e.g., "xK9m")
const username = nanoid(4);

// ============================================
// MAIN APP COMPONENT
// ============================================

function App() {
  // STATE: Current message being typed in the input field
  const [message, setMessage] = useState("");
  
  // STATE: Array of all chat messages [{message: "Hi", username: "xK9m"}, ...]
  const [chat, setChat] = useState([]);

  // ============================================
  // SEND MESSAGE FUNCTION
  // ============================================
  
  // This function runs when the user submits the form (clicks send or presses Enter)
  const sendchat = (e) =>{
    e.preventDefault();                        // Prevent page refresh on form submit
    socket.emit("chat", {message, username});  // Send message + username to server via socket
    setMessage("");                            // Clear the input field after sending
  }

  // ============================================
  // RECEIVE MESSAGES (useEffect Hook)
  // ============================================
  
  // useEffect runs after every render to listen for incoming messages
  useEffect(() => {
    // Listen for "chat" events from the server
    socket.on("chat", (payload) => {
      // When a message arrives, add it to our chat array
      setChat([...chat, payload]); // Spread existing messages + add new one
    });
  }); // Note: Runs on every render (could be optimized with cleanup)

  // ============================================
  // JSX - THE UI STRUCTURE
  // ============================================

  return (
    // Main container div - the white chat card
    <div className="content">
      
      {/* HEADER: Contains title and status badge */}
      <div className="chat-header">
        <h1>Chat.io</h1>                       {/* App title */}
        <span className="status">By Ali</span> {/* Status/credit badge */}
      </div>
      
      {/* CHAT AREA: Scrollable message container */}
      <div className="chatBox">
        {/* Loop through each message in the chat array */}
        {chat.map((payload, index) => {
          // Check if this message was sent by me (compare usernames)
          const isMe = payload.username === username;
          
          return (
            // Message wrapper - applies 'my-message' or 'other-message' class for alignment
            <div key={index} className={`message-wrapper ${isMe ? 'my-message' : 'other-message'}`}>
              {/* The actual message bubble */}
              <div className="message-bubble">
                <span className="sender-name">{payload.username}</span> {/* Sender's username */}
                <p className="message-text">{payload.message}</p>       {/* The message text */}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* INPUT AREA: Form with text input and send button */}
      <div className="txtInput">
        {/* Form submits when Enter is pressed or button is clicked */}
        <form onSubmit={sendchat}>
          {/* Text input field */}
          <input
            type="text"                                    // Text input type
            placeholder="Type a message..."                // Placeholder text when empty
            value={message}                                // Controlled input - value from state
            onChange={(e) => setMessage(e.target.value)}   // Update state when user types
            name="chat"                                    // Input name for form
          />
          {/* Send button with arrow icon */}
          <button type="submit">
            {/* SVG arrow icon */}
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path> {/* Arrow shape */}
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

// Export the App component so it can be imported in main.jsx
export default App;
