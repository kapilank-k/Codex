// src/components/UI/RightPanel.jsx

import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { IoSend } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";

// MODIFIED: The component now accepts an `onChatComplete` prop
export default function RightPanel({ onChatComplete, docId, topic }) {
  const [messages, setMessages] = useState([]);
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

  const handleSend = async (text) => {
    const userMessage = text.trim();
    if (!userMessage) return;

    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: userMessage }]);
    setInput('');
    setSuggestions([]);
    setIsTyping(true);

    try {
      const socraticFallback = () => {
        const hint = topic ? `about ${topic}` : 'from your document';
        const prompt = `Okay — thinking ${hint}. What do you already know about "${userMessage}"?` +
          ` Can you give 2 bullet points?`;
        setIsTyping(false);
        setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: prompt }]);
        setSuggestions(['Give two points', 'Define key term', 'Show example']);
      };

      // If no docId yet, provide a local Socratic fallback so the user can still chat
      if (!docId) {
        socraticFallback();
        return;
      }

      const resp = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          docId,
          topic,
          messages: [
            { role: 'user', content: topic ? `Topic: ${topic}\n\n${userMessage}` : userMessage }
          ]
        })
      });

      let aiText = '';
      if (!resp.ok) {
        try {
          const err = await resp.json();
          aiText = err?.error || 'Tutor error';
        } catch (_) {
          aiText = 'Tutor error';
        }
      } else {
        const data = await resp.json();
        aiText = data.reply || '';
      }
      if (!aiText || /OPENAI_API_KEY/i.test(aiText) || /Tutor error/i.test(aiText)) {
        socraticFallback();
      } else {
        setIsTyping(false);
        setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: aiText }]);
        setSuggestions(['Explain simply', 'Give an example', 'Quiz me']);
      }
    } catch (e) {
      setIsTyping(false);
      const errText = (e && e.message) ? e.message : 'Network error';
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: `Hmm, I hit an issue (${errText}). Meanwhile: what’s one thing you’re confident about here?` }]);
      setSuggestions(['Two bullet points', 'Define the term', 'Ask me a quiz']);
    }
  };

  // Seed a greeting when topic changes or on first mount
  useEffect(() => {
    setMessages([
      {
        id: Date.now(),
        sender: 'ai',
        text: topic ? `Let’s explore: ${topic}. What would you like to understand first?` : 'Hello! What would you like to learn today?',
      },
    ]);
  }, [topic]);

  const handleSuggestionClick = (suggestion) => {
    handleSend(suggestion);
  };

  return (
    // The width is controlled to prevent it from taking the full screen
    <div className="pixel-frame h-[90vh] w-full max-w-2xl"> 
      <div className="pixel-frame-content p-4 sm:p-6 flex flex-col h-full font-pixel overflow-y-scroll pr-2 max-h-[calc(100vh-6rem)]" style={{ scrollbarGutter: 'stable' }}>
        <header>
          <h1 className="text-center text-2xl sm:text-3xl text-[#FFFFFF]"> S Y G L </h1>
          {topic && <p className="text-center text-xs text-[#F28500] mt-1">Topic: {topic}</p>}
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
              <button className="text-[#20C20E] hover:text-[#FFFFFF] transition-colors" title="Voice Input" onClick={() => alert('Voice input feature coming soon!')}>
                <FaMicrophone size={20} />
              </button>
              <button onClick={() => handleSend(input)} disabled={!input.trim()} className="text-[#F28500] hover:text-[#FF5964] disabled:text-gray-600 transition-colors">
                <IoSend size={20} />
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}