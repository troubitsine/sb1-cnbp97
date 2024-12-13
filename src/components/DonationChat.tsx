import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useChat } from '../hooks/useChat';

export default function DonationChat() {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { messages, currentStep, handleUserInput, handleOptionClick } = useChat();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    handleUserInput(inputValue);
    setInputValue('');
  };

  return (
    <div className="flex flex-col h-screen max-h-screen">
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin"
      >
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            text={message.text}
            isUser={message.isUser}
            options={message.options}
            onOptionClick={handleOptionClick}
          />
        ))}
      </div>
      
      <ChatInput
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleSubmit}
        disabled={currentStep === 'complete'}
      />
    </div>
  );
}