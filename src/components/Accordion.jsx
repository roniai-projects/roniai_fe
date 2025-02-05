const Accordion = ({ title, content, isOpen, onToggle }) => {
  return (
    <div className="mb-2">
      <button
        onClick={onToggle}
        className="flex justify-between items-center py-2 w-full border-b border-black"
      >
        <span className="font-semibold md:text-xl text-left">{title}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-6 h-6 ${isOpen ? "transform rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="py-2">
          <p className="text-gray-800 text-sm md:text-base">{content}</p>
        </div>
      )}
    </div>
  );
};

export default Accordion;
