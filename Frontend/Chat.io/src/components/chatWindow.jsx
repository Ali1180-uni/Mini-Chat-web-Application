import React from 'react'

const chatWindow = ({chat, username}) => {
  return ( <div className="chatBox">
        {/* Loop through each message in the chat array */}
        {chat.map((payload, index) => {
          // Check if this message was sent by me (compare usernames)
          const isMe = payload.username === username;
          
          return (
            // Message wrapper - applies 'my-message' or 'other-message' class for alignment
            <div key={index} className={`message-wrapper ${isMe ? 'my-message' : 'other-message'}`}>
              <div className="message-bubble">
                <span className="sender-name">{payload.username}</span>
                <p className="message-text">{payload.message}</p>
              </div>
            </div>
          );
        })}
      </div>
  )
}

export default chatWindow
