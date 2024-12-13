import React from 'react';

type ChatMessageProps = {
  text: string;
  isUser: boolean;
  options?: string[];
  onOptionClick: (option: string) => void;
};

export default function ChatMessage({ text, isUser, options, onOptionClick }: ChatMessageProps) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`rounded-lg px-4 py-2 max-w-[80%] ${
        isUser 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-100 text-gray-800'
      }`}>
        <p className="whitespace-pre-wrap">{text}</p>
        {options && (
          <div className="flex flex-wrap gap-2 mt-2">
            {options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => onOptionClick(option)}
                className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm hover:bg-blue-50 transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}