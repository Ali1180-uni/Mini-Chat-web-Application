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
    <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin bg-white bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23122620%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M20%2020.5l4-2.5v-5l-4-2.5-4%202.5v5l4%202.5z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')]">
      {chat.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center">
          <div className="w-32 h-32 mb-8 rounded-3xl bg-[#E76D57]/10 flex items-center justify-center border border-[#E76D57]/20">
            <svg className="w-16 h-16 text-[#E76D57]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-[#122620] font-semibold text-2xl mb-3">No messages yet</h3>
          <p className="text-[#122620]/50 text-base">Start the conversation!</p>
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
                  <div className="flex items-center gap-2 mb-2 ml-1">
                    <div className="w-8 h-8 rounded-full bg-[#F8F3EB] border border-[#E76D57]/30 flex items-center justify-center text-[#E76D57] text-xs font-bold">
                      {payload.username}
                    </div>
                  </div>
                )}
                <div
                  className={`px-5 py-3.5 rounded-2xl shadow-lg ${
                    isMe
                      ? 'bg-[#E76D57] text-white rounded-br-sm shadow-[#E76D57]/20'
                      : 'bg-[#F8F3EB] text-[#122620] rounded-bl-sm border border-gray-200'
                  }`}
                >
                  <p className="text-base leading-relaxed wrap-break-words">{payload.message}</p>
                </div>
                <p className={`text-xs text-[#122620]/40 mt-2 ${isMe ? 'text-right mr-1' : 'ml-1'}`}>
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
