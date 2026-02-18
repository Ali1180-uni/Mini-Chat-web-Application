import { useState, useEffect } from "react";
import io from "socket.io-client";
import { nanoid } from "nanoid";
import InputBox from "./components/inputBox";
import ChatWindow from "./components/chatWindow";

// Use environment variable for backend URL (for production deployment)
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
const socket = io.connect(BACKEND_URL);
const username = nanoid(4);

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendchat = (e) => {
    e.preventDefault();
    socket.emit("chat", { message, username });
    setMessage("");
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });
  });

  return (
    <div className="flex h-screen w-full bg-white">
      {/* Sidebar - Contact List (WhatsApp style) */}
      <div className="hidden md:flex w-80 flex-col border-r border-gray-200 bg-[#F8F3EB]">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#E76D57] flex items-center justify-center text-white font-semibold text-base shadow-lg shadow-[#E76D57]/20">
              {username}
            </div>
            <div>
              <h2 className="text-[#122620] font-semibold text-base tracking-wide">Chat.io</h2>
              <p className="text-[#122620]/60 text-sm">Online</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-full hover:bg-gray-200 transition-colors text-[#122620]/60 hover:text-[#E76D57]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search or start new chat"
              className="w-full py-3.5 px-4 pl-11 bg-white border border-gray-300 rounded-xl text-base text-[#122620] placeholder-[#122620]/40 focus:outline-none focus:ring-2 focus:ring-[#E76D57]/40 focus:border-transparent transition-all"
            />
            <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#122620]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto px-3">
          <div className="p-1 rounded-2xl bg-[#E76D57]/10 border border-[#E76D57]/20 cursor-pointer hover:bg-[#E76D57]/15 transition-all">
            <div className="flex items-center gap-3 p-3">
              <div className="w-14 h-14 rounded-full bg-linear-to-br from-[#E76D57] to-[#d35a45] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#E76D57]/20">
                GC
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="text-[#122620] font-semibold text-base">Global Chat</h3>
                  <span className="text-sm text-[#E76D57] font-medium">Now</span>
                </div>
                <p className="text-[#122620]/60 text-sm truncate mt-0.5">Everyone is here...</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200">
          <p className="text-[#122620]/40 text-sm text-center tracking-wider">END-TO-END ENCRYPTED</p>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full bg-white">
        {/* Chat Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#F8F3EB] backdrop-blur-xl border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-linear-to-br from-[#E76D57] to-[#d35a45] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#E76D57]/25">
              GC
            </div>
            <div>
              <h1 className="text-[#122620] font-semibold text-xl tracking-tight">Global Chat</h1>
              <p className="text-[#E76D57] text-sm font-medium flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E76D57] animate-pulse"></span>
                Online • {chat.length} messages
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-3 rounded-full bg-gray-100 hover:bg-[#E76D57]/20 transition-all text-[#122620]/60 hover:text-[#E76D57]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            <button className="p-3 rounded-full bg-gray-100 hover:bg-[#E76D57]/20 transition-all text-[#122620]/60 hover:text-[#E76D57]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
            <button className="p-3 rounded-full bg-gray-100 hover:bg-[#E76D57]/20 transition-all text-[#122620]/60 hover:text-[#E76D57]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <ChatWindow chat={chat} username={username} />

        {/* Input Area */}
        <InputBox props={{ message, setMessage, sendchat }} />
      </div>
    </div>
  );
}

export default App;
