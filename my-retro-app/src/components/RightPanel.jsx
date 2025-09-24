import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { IoSend } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";

// The component is correctly named and structured to be a modular panel
export default function RightPanel() {
  // --- All of your new chat logic is preserved ---
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Hello! I am your friendly study assistant. What subject are you studying today?',
      suggestions: ['Math', 'Science', 'History', 'Art'],
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState(['Math', 'Science', 'History', 'Art']);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getAIResponse = (userInput) => {
    const responses = {
      'math': { text: "Great choice! Math is fascinating. Are you working on a specific topic like Algebra, Geometry, or Calculus?", suggestions: ['Algebra', 'Geometry', 'Calculus'] },
      'science': { text: "Excellent! Science helps us understand the world. Which branch are you interested in?", suggestions: ['Physics', 'Chemistry', 'Biology'] },
      'history': { text: "Fantastic! History is full of amazing stories. Are you studying a particular era?", suggestions: ['Ancient Civilizations', 'World War II', 'The Renaissance'] },
      'art': { text: "Wonderful! Art is a beautiful form of expression. What kind of art are you exploring?", suggestions: ['Painting', 'Sculpture', 'Photography'] },
      'default': { text: "That's interesting! I can help with things like:\n- Summarizing texts\n- Explaining concepts\n- Quizzing you on topics", suggestions: [] },
    };
    const key = userInput.toLowerCase().trim();
    return responses[key] || responses['default'];
  };

  const handleSend = (text) => {
    const userMessage = text.trim();
    if (!userMessage) return;

    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: userMessage }]);
    setInput('');
    setSuggestions([]);
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = getAIResponse(userMessage);
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: aiResponse.text, suggestions: aiResponse.suggestions }]);
      setSuggestions(aiResponse.suggestions || []);
    }, 1500 + Math.random() * 500);
  };

  const handleSuggestionClick = (suggestion) => {
    handleSend(suggestion);
  };

  // --- The JSX is now built inside the original, correct layout structure ---
  return (
    <div className="pixel-frame h-full">
      <div className="pixel-frame-content p-4 sm:p-6 flex flex-col h-full font-pixel">
        
        <header>
          <h1 className="text-center text-2xl sm:text-3xl text-[#FFFFFF]">
            S Y G L
          </h1>
        </header>

        <main className="flex-1 overflow-y-auto py-4 text-xs sm:text-sm">
          {messages.map((msg) => (
            <div key={msg.id} className={`my-4 leading-relaxed ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
              <p className={msg.sender === 'user' ? 'text-[#FFFFFF]' : 'text-[#20C20E]'}>
                {msg.sender === 'ai' && 'AI: '}
                {msg.text.split('\n').map((line, i) => <span key={i} className="block">{line}</span>)}
              </p>
            </div>
          ))}
          {isTyping && <p className="text-left text-[#FFFFFF]">AI is typing...</p>}
          <div ref={messagesEndRef} />
        </main>

        <footer className="mt-auto">
          {suggestions && suggestions.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3 justify-center">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestionClick(s)}
                  className="px-3 py-1 bg-transparent border border-[#F28500] text-[#F28500] text-xs hover:bg-[#F28500] hover:text-[#0F110C] transition-colors duration-200"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          <div className="relative">
            <input
              type="text"
              placeholder="Enter command..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
              className="w-full bg-[#0F110C] border-2 border-[#F28500] text-white p-3 pr-24 focus:outline-none focus:border-[#FF5964] text-xs sm:text-sm"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 gap-3">
              <button 
                className="text-[#20C20E] hover:text-[#FFFFFF] transition-colors"
                title="Voice Input"
                onClick={() => alert('Voice input feature coming soon!')}
              >
                <FaMicrophone size={20} />
              </button>
              <button 
                onClick={() => handleSend(input)} 
                disabled={!input.trim()}
                className="text-[#F28500] hover:text-[#FF5964] disabled:text-gray-600 transition-colors"
              >
                <IoSend size={20} />
              </button>
            </div>
          </div>
        </footer>
        
      </div>
    </div>
  );
}