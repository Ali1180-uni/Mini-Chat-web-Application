import { useState, useEffect } from "react";
import io from "socket.io-client";
import { nanoid } from "nanoid";
import InputBox from "./components/inputBox";
import ChatWindow from "./components/chatWindow";

const socket = io.connect("http://localhost:3000");
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
    <div className="flex h-screen w-full bg-linear-to-br from-slate-950 via-slate-900 to-blue-950">
      {/* Sidebar - Contact List (WhatsApp style) */}
      <div className="hidden md:flex w-80 flex-col border-r border-slate-800/50 bg-slate-900/80 backdrop-blur-xl">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/30">
              {username}
            </div>
            <div>
              <h2 className="text-white font-semibold text-sm">Chat.io</h2>
              <p className="text-slate-400 text-xs">Online</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-full hover:bg-slate-800 transition-colors text-slate-400 hover:text-blue-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search or start new chat"
              className="w-full py-2.5 px-4 pl-10 bg-slate-800/50 border border-slate-700/50 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
            />
            <svg className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-2 mx-2 rounded-xl bg-blue-500/10 border border-blue-500/20 cursor-pointer">
            <div className="flex items-center gap-3 p-2">
              <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg">
                GC
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="text-white font-medium text-sm">Global Chat</h3>
                  <span className="text-xs text-blue-400">Now</span>
                </div>
                <p className="text-slate-400 text-xs truncate">Everyone is here...</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800/50">
          <p className="text-slate-500 text-xs text-center">End-to-end encrypted</p>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full">
        {/* Chat Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900/60 backdrop-blur-xl border-b border-slate-800/50">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/20">
              GC
            </div>
            <div>
              <h1 className="text-white font-semibold text-lg tracking-tight">Global Chat</h1>
              <p className="text-blue-400 text-xs font-medium">● Online • {chat.length} messages</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2.5 rounded-full bg-slate-800/50 hover:bg-blue-500/20 transition-all text-slate-400 hover:text-blue-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            <button className="p-2.5 rounded-full bg-slate-800/50 hover:bg-blue-500/20 transition-all text-slate-400 hover:text-blue-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
            <button className="p-2.5 rounded-full bg-slate-800/50 hover:bg-blue-500/20 transition-all text-slate-400 hover:text-blue-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
