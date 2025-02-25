import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    console.log(userMessage);

    // Retrieve context (if needed) before sending the query to the bot
    const contextResponse = await axios.get('https://smart-delhi-ideathon-4.onrender.com/api/getContext', { 
      params: { query: inputValue } 
    });
    console.log(contextResponse.data);

    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Fetch bot response along with context
    await handleReceiveMessage(inputValue, contextResponse.data);
  };

  const handleReceiveMessage = async (query: string, context: any) => {
    try {
      const response = await axios.get('https://smart-delhi-ideathon-4.onrender.com/api/gemini-rag', {
        params: { query, context: JSON.stringify(context) },
      });
      console.log(response.data);

      // Build the bot message
      const botMessage: Message = {
        id: Date.now().toString(),
        text: response.data.answer || 'Sorry, I could not find an answer.',
        sender: 'bot',
        timestamp: new Date(),
      };

   
      setMessages((prev) => [...prev, botMessage]);

    
      await axios.post(
        'https://smart-delhi-ideathon-4.onrender.com/api/addQuery' ,
        null,
        { 
          params: { 
            query: JSON.stringify({ query: query, response: botMessage.text })
          } 
        }
      );
      console.log('Query and response saved successfully');
    } catch (error) {
      console.error('Error fetching response or saving query:', error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-20 h-20 bg-gradient-to-r from-indigo-700 to-blue-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 ease-out group"
        aria-label="Toggle chat"
      >
        <Bot className="w-9 h-9 text-white group-hover:rotate-12 transition-transform duration-200" />
      </button>
      {isOpen && (
        <div className="fixed top-[49%] w-[90%] right-4 bottom-1 transform -translate-y-[49%] h-[90%] z-50 bg-white shadow-lg flex flex-col animate-slide-up md:right-6 rounded-t-3xl">
          <div className="relative">
            <div className="h-20 bg-gradient-to-r from-indigo-800 via-indigo-700 to-indigo-600 px-4 flex items-center justify-between rounded-t-2xl shadow-lg">
              <div className="flex items-center space-x-3">
                <Bot className="w-8 h-8 text-white" />
                <span className="font-bold text-white text-lg">SahasiShe HelpDesk</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
                aria-label="Close chat"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-700 to-indigo-600 flex items-center justify-center mr-3">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[70%] p-4 rounded-2xl shadow-sm ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-indigo-700 to-indigo-600 text-white ml-auto'
                      : 'bg-white border border-gray-100 text-gray-800'
                  }`}
                >
                  {message.sender === 'bot' ? (
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                  ) : (
                    <p>{message.text}</p>
                  )}
                  <span className="text-xs mt-2 block opacity-60">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-700 to-indigo-600 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
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
          <div className="p-4 bg-white border-t flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 p-3 border rounded-lg focus:outline-none"
              placeholder="Type your message..."
            />
            <button
              onClick={handleSendMessage}
              className="ml-3 p-3 bg-gradient-to-r from-indigo-700 to-blue-800 rounded-full text-white"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
