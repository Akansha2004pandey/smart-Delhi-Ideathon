import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, User } from 'lucide-react';
import axios from 'axios';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [pulseIcon, setPulseIcon] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIcon(true);
      setTimeout(() => setPulseIcon(false), 1000);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await axios.post(
        '/api/v1beta2/models/gemini-pro:chat', 
        {
          messages: [{ content: inputValue }],
        },
        {
          headers: {
            'Authorization': `Bearer AIzaSyDrh-4rpxYYpEIUy484xuKboffB9WiWeec`, // Replace with your actual API key
            'Content-Type': 'application/json',
          }
        }
      );

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.data.message,  // Assuming the API response contains a "message" field
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching bot response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble responding right now. Please try again later.",
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <div className='z-50'>
        <button
          onClick={() => setIsOpen(prev => !prev)}
          className={`fixed bottom-6 right-6 w-20 h-20 bg-gradient-to-r from-indigo-700 to-blue-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 ease-out group ${pulseIcon ? '' : ''}`}
          aria-label="Toggle chat"
        >
          <Bot className="w-9 h-9 text-white group-hover:rotate-12 transition-transform duration-200" />
        </button>
        {isOpen && (
          <div className="fixed top-[49%] right-4 bottom-1 transform -translate-y-[49%] w-full max-w-sm h-[280px] z-50 bg-white shadow-lg flex flex-col animate-slide-up md:right-6 md:max-w-[380px] sm:w-full sm:h-full rounded-t-3xl ">
            {/* Chat header and messages */}
            <div className="relative ">
              <div className="h-20 bg-gradient-to-r from-indigo-700 via-indigo-800 to-indigo-800 px-4 flex items-center justify-between rounded-t-2xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <Bot className="w-8 h-8 text-white" />
                  <span className="font-bold text-white text-lg">AI Assistant</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
                  aria-label="Close chat"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                {/* Messages */}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-gray-50 to-white">
              {messages.map(message => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-700  to-indigo-600 flex items-center justify-center mr-3">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div className={`max-w-[70%] p-4 rounded-2xl shadow-sm ${message.sender === 'user' ? 'bg-gradient-to-r from-indigo-700  to-indigo-600 text-white ml-auto animate-slide-left' : 'bg-white border border-gray-100 text-gray-800 animate-slide-right'}`}>
                    <p className="leading-relaxed">{message.text}</p>
                    <span className="text-xs mt-2 block opacity-60">{message.timestamp.toLocaleTimeString()}</span>
                  </div>
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center ml-3">
                      <span className="text-sm font-medium text-gray-600"><User className="w-5 h-5" /></span>
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-700  to-indigo-600 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 animate-slide-right">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-indigo-700 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-indigo-700 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 bg-indigo-700 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="p-4 bg-white border-t border-gray-100">
              <form onSubmit={handleSubmit} className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:border-transparent pr-24"
                  />
                </div>
                <button
                  type="submit"
                  className="p-3 bg-gradient-to-r from-indigo-700  to-indigo-600 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-shadow duration-200"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
