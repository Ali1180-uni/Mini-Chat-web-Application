import React from 'react'

const inputBox = ({props}) => {
  return ( <div className="txtInput">
        {/* Form submits when Enter is pressed or button is clicked */}
        <form onSubmit={props.sendchat}>
          {/* Text input field */}
          <input
            type="text"                                    // Text input type
            placeholder="Type a message..."                // Placeholder text when empty
            value={props.message}                                // Controlled input - value from state
            onChange={(e) => props.setMessage(e.target.value)}   // Update state when user types
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
  );
}

export default inputBox
