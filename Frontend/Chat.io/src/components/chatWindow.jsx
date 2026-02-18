import { useEffect, useRef } from 'react'

const ChatWindow = ({ chat, username }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23334155%22%20fill-opacity%3D%220.07%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]">
      {chat.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-slate-500">
          <div className="w-24 h-24 mb-6 rounded-2xl bg-linear-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center border border-blue-500/20">
            <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-slate-300 font-semibold text-lg mb-2">No messages yet</h3>
          <p className="text-slate-500 text-sm">Start the conversation!</p>
        </div>
      ) : (
        chat.map((payload, index) => {
          const isMe = payload.username === username;

          return (
            <div
              key={index}
              className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] ${isMe ? 'order-2' : 'order-1'}`}>
                {!isMe && (
                  <div className="flex items-center gap-2 mb-1.5 ml-1">
                    <div className="w-6 h-6 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold">
                      {payload.username}
                    </div>
                  </div>
                )}
                <div
                  className={`px-4 py-3 rounded-2xl shadow-lg ${
                    isMe
                      ? 'bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-br-md shadow-blue-500/20'
                      : 'bg-slate-800/80 text-slate-100 rounded-bl-md border border-slate-700/50'
                  }`}
                >
                  <p className="text-sm leading-relaxed wrap-break-words">{payload.message}</p>
                </div>
                <p className={`text-[10px] text-slate-500 mt-1.5 ${isMe ? 'text-right mr-1' : 'ml-1'}`}>
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          );
        })
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatWindow;
