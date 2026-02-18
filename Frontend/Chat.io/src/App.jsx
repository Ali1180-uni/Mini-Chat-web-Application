import { useState, useEffect } from "react"; // React hooks for state management and side effects
import io from "socket.io-client";            // Socket.IO client library for real-time communication
import { nanoid } from "nanoid";              // Library to generate unique random IDs
import InputBox from "./components/inputBox";
import ChatWindow from "./components/chatWindow";
import "./App.css";                           // Import the CSS styles for this component

// Connect to the Socket.IO server running on localhost:3000
const socket = io.connect("http://localhost:3000");

// Generate a unique 4-character username for this user (e.g., "xK9m")
const username = nanoid(4);
function App() {
  // STATE: Current message being typed in the input field
  const [message, setMessage] = useState("");
  
  // STATE: Array of all chat messages [{message: "Hi", username: "xK9m"}, ...]
  const [chat, setChat] = useState([]);

  
  // This function runs when the user submits the form (clicks send or presses Enter)
  const sendchat = (e) =>{
    e.preventDefault();                        // Prevent page refresh on form submit
    socket.emit("chat", {message, username});  // Send message + username to server via socket
    setMessage("");                            // Clear the input field after sending
  }

  
  // useEffect runs after every render to listen for incoming messages
  useEffect(() => {
    // Listen for "chat" events from the server
    socket.on("chat", (payload) => {
      // When a message arrives, add it to our chat array
      setChat([...chat, payload]); // Spread existing messages + add new one
    });
  }); // Note: Runs on every render (could be optimized with cleanup)


  return (
    // Main container div - the white chat card
    <div className="content">
      
      {/* HEADER: Contains title and status badge */}
      <div className="chat-header">
        <h1>Chat.io</h1>                       {/* App title */}
        <span className="status">By Ali</span> {/* Status/credit badge */}
      </div>
      

      <ChatWindow chat={chat} username={username} /> {/* Chat window component - displays messages */}
      <InputBox props={{message, setMessage, sendchat}} /> {/* Input box component - for typing and sending messages */}
    </div>
  );
}

// Export the App component so it can be imported in main.jsx
export default App;
