import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { IoSend } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";

// Main App Component - The entire chat panel is encapsulated here
export default function App() {
  // State to hold the list of chat messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Hello! I am your friendly study assistant. What subject are you studying today?',
      suggestions: ['Math', 'Science', 'History', 'Art'],
    },
  ]);

  // State for the user's current input
  const [input, setInput] = useState('');
  // State to show/hide the AI typing indicator
  const [isTyping, setIsTyping] = useState(false);
  // State to manage the suggestion chips
  const [suggestions, setSuggestions] = useState(['Math', 'Science', 'History', 'Art']);

  // Ref for the end of the messages list to enable auto-scrolling
  const messagesEndRef = useRef(null);

  // Function to scroll to the bottom of the chat window smoothly
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // useEffect hook to scroll to bottom whenever messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);
  
  // --- AI Response Simulation ---
  const getAIResponse = (userInput) => {
    const responses = {
      'math': {
        text: "Great choice! Math is fascinating. Are you working on a specific topic like Algebra, Geometry, or Calculus?",
        suggestions: ['Algebra', 'Geometry', 'Calculus']
      },
      'science': {
        text: "Excellent! Science helps us understand the world. Which branch are you interested in?",
        suggestions: ['Physics', 'Chemistry', 'Biology']
      },
      'history': {
        text: "Fantastic! History is full of amazing stories. Are you studying a particular era?",
        suggestions: ['Ancient Civilizations', 'World War II', 'The Renaissance']
      },
      'art': {
        text: "Wonderful! Art is a beautiful form of expression. What kind of art are you exploring?",
        suggestions: ['Painting', 'Sculpture', 'Photography']
      },
      'default': {
        text: "That's interesting! I can help with things like:\n- Summarizing texts\n- Explaining concepts\n- Quizzing you on topics",
        suggestions: []
      },
      'error': {
        text: "Oops! Something went wrong on my end. Please try asking again in a moment.",
        suggestions: []
      }
    };

    const key = userInput.toLowerCase().trim();
    return responses[key] || responses['default'];
  };

  // --- Event Handlers ---
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

  return (
    // Use the new frame class for the outer container from RightPanel2.jsx
    <div className="pixel-frame h-screen w-full max-w-2xl mx-auto font-pixel">
        {/* Use the new content class for the inner div */}
        <div className="pixel-frame-content bg-[#0F110C] h-full p-4 sm:p-6 flex flex-col justify-between">
            <header>
                <h1 className="text-center text-2xl sm:text-3xl text-[#FF5964]">
                    S Y G L
                </h1>
            </header>

            <main className="flex-1 overflow-y-auto py-4 text-xs sm:text-sm">
                {messages.map((msg) => (
                    <div key={msg.id} className={`my-4 leading-relaxed ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                        <p className={msg.sender === 'user' ? 'text-[#EBF5DF]' : 'text-[#FF5964]'}>
                            {msg.sender === 'ai' && 'AI: '}
                            {msg.text.split('\n').map((line, i) => <span key={i} className="block">{line}</span>)}
                        </p>
                    </div>
                ))}
                {isTyping && <p className="text-left text-[#FF5964]">AI is typing...</p>}
                <div ref={messagesEndRef} />
            </main>

            <footer className="mt-4">
                {suggestions && suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3 justify-center">
                        {suggestions.map((s, i) => (
                            <button
                                key={i}
                                onClick={() => handleSuggestionClick(s)}
                                // Applying styling from RightPanel2.jsx for suggestions
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
                        // Applying styling from RightPanel2.jsx
                        className="w-full bg-[#0F110C] border-2 border-[#F28500] text-white p-3 pr-24 focus:outline-none focus:border-[#FF5964] text-xs sm:text-sm"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 gap-3">
                        <button 
                            className="text-[#F28500] hover:text-[#FF5964] transition-colors"
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

