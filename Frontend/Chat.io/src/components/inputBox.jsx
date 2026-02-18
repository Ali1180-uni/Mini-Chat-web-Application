const InputBox = ({ props }) => {
  return (
    <div className="p-5 bg-[#F8F3EB] backdrop-blur-xl border-t border-gray-200">
      <form onSubmit={props.sendchat} className="flex items-center gap-4">
        {/* Emoji Button */}
        <button
          type="button"
          className="p-3 rounded-full bg-white hover:bg-gray-100 transition-all text-[#122620]/50 hover:text-[#E76D57] border border-gray-200"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>

        {/* Attachment Button */}
        <button
          type="button"
          className="p-3 rounded-full bg-white hover:bg-gray-100 transition-all text-[#122620]/50 hover:text-[#E76D57] border border-gray-200"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            className="w-full py-4 px-6 bg-white border border-gray-300 rounded-2xl text-[#122620] placeholder-[#122620]/40 text-base focus:outline-none focus:ring-2 focus:ring-[#E76D57]/40 focus:border-[#E76D57]/40 transition-all"
          />
        </div>

        {/* Send Button */}
        <button
          type="submit"
          className="p-4 rounded-full bg-[#E76D57] hover:bg-[#d35a45] transition-all text-white shadow-lg shadow-[#E76D57]/30 hover:shadow-[#E76D57]/50 hover:scale-105 active:scale-95"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default InputBox;
