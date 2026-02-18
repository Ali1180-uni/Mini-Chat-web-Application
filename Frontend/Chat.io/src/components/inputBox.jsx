const InputBox = ({ props }) => {
  return (
    <div className="p-4 bg-slate-900/60 backdrop-blur-xl border-t border-slate-800/50">
      <form onSubmit={props.sendchat} className="flex items-center gap-3">
        {/* Emoji Button */}
        <button
          type="button"
          className="p-2.5 rounded-full bg-slate-800/50 hover:bg-slate-700/50 transition-all text-slate-400 hover:text-yellow-400"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>

        {/* Attachment Button */}
        <button
          type="button"
          className="p-2.5 rounded-full bg-slate-800/50 hover:bg-slate-700/50 transition-all text-slate-400 hover:text-blue-400"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>

        {/* Input Field */}
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Type a message..."
            value={props.message}
            onChange={(e) => props.setMessage(e.target.value)}
            name="chat"
            className="w-full py-3.5 px-5 bg-slate-800/70 border border-slate-700/50 rounded-2xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
          />
        </div>

        {/* Send Button */}
        <button
          type="submit"
          className="p-3.5 rounded-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 transition-all text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 active:scale-95"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default InputBox;
