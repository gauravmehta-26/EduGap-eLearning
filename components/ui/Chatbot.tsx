'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Input from './Input';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isLoading?: boolean;
}

interface ChatbotProps {
  subject?: string;
  context?: 'dashboard' | 'profile' | 'remediation';
  weakConcepts?: string[];
}

export default function Chatbot({ subject, context, weakConcepts }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: getWelcomeMessage(context, subject),
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  function getWelcomeMessage(ctx?: string, subj?: string): string {
    if (ctx === 'dashboard') {
      return "Hi! I'm here to help you understand your quiz results and improve your weak areas. Ask me anything! 📊";
    } else if (ctx === 'remediation' && subj) {
      return `Hello! I can help you master ${subj} concepts. Ask me to explain anything you're confused about! 📚`;
    } else if (ctx === 'profile' && subj) {
      return `Ready to ace your ${subj} quiz? I'm here to help you prepare. Ask me any questions! 🎯`;
    }
    return 'Hello there! What can I do to lend a hand? 👋';
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const userInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    // Add loading message
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: '...',
      sender: 'bot',
      timestamp: new Date(),
      isLoading: true,
    };
    setMessages((prev) => [...prev, loadingMessage]);

    try {
      // Call AI API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userInput,
          subject,
          context,
          weakConcepts,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      // Remove loading message and add actual response
      setMessages((prev) => {
        const filtered = prev.filter((msg) => !msg.isLoading);
        return [
          ...filtered,
          {
            id: (Date.now() + 2).toString(),
            text: data.response,
            sender: 'bot',
            timestamp: new Date(),
          },
        ];
      });
    } catch (error) {
      console.error('Error getting chatbot response:', error);
      
      // Remove loading message and add error response
      setMessages((prev) => {
        const filtered = prev.filter((msg) => !msg.isLoading);
        return [
          ...filtered,
          {
            id: (Date.now() + 2).toString(),
            text: "I'm having trouble connecting right now. Please try again in a moment! 🔄",
            sender: 'bot',
            timestamp: new Date(),
          },
        ];
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isTyping) {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:from-purple-600 hover:to-purple-700 transition-all duration-200"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle chatbot"
      >
        {isOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] z-50 shadow-2xl rounded-xl overflow-hidden"
          >
            <div className="h-full flex flex-col bg-white">
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
                    <img 
                      src="/q-logo.svg" 
                      alt="Q Logo" 
                      className="w-7 h-7"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Study Assistant</h3>
                    <p className="text-xs text-purple-100">Always here to help</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
                  aria-label="Close chat"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Messages - WhatsApp-style doodle background */}
              <div 
                className="flex-1 overflow-y-auto p-4 space-y-4 relative"
                style={{
                  backgroundColor: '#e5ddd5',
                  backgroundImage: `
                    url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23d1c4b8' stroke-width='1.5' opacity='0.3'%3E%3C!-- Smiley faces --%3E%3Ccircle cx='60' cy='60' r='20'/%3E%3Ccircle cx='54' cy='55' r='2' fill='%23d1c4b8'/%3E%3Ccircle cx='66' cy='55' r='2' fill='%23d1c4b8'/%3E%3Cpath d='M 52 65 Q 60 70 68 65' stroke-linecap='round'/%3E%3C!-- Stars --%3E%3Cpath d='M 150 50 L 153 58 L 161 58 L 155 63 L 157 71 L 150 66 L 143 71 L 145 63 L 139 58 L 147 58 Z' fill='%23d1c4b8'/%3E%3Cpath d='M 320 80 L 323 88 L 331 88 L 325 93 L 327 101 L 320 96 L 313 101 L 315 93 L 309 88 L 317 88 Z' fill='%23d1c4b8'/%3E%3C!-- Hearts --%3E%3Cpath d='M 250 60 C 250 55 245 50 240 50 C 235 50 232 53 230 56 C 228 53 225 50 220 50 C 215 50 210 55 210 60 C 210 70 230 80 230 80 C 230 80 250 70 250 60 Z' fill='%23d1c4b8'/%3E%3C!-- Music notes --%3E%3Cpath d='M 80 150 L 80 130 L 95 127 L 95 147 M 80 150 Q 75 152 75 157 Q 75 162 80 164 Q 85 162 85 157 Q 85 152 80 150 M 95 147 Q 90 149 90 154 Q 90 159 95 161 Q 100 159 100 154 Q 100 149 95 147' fill='%23d1c4b8'/%3E%3C!-- Coffee cup --%3E%3Cpath d='M 180 140 L 185 160 L 205 160 L 210 140 Z M 215 145 L 215 155 Q 220 155 220 150 Q 220 145 215 145' stroke-linejoin='round'/%3E%3Cpath d='M 175 135 Q 177 130 175 125 M 190 135 Q 192 130 190 125 M 205 135 Q 207 130 205 125' stroke-linecap='round'/%3E%3C!-- Flowers --%3E%3Ccircle cx='300' cy='160' r='5'/%3E%3Ccircle cx='295' cy='155' r='4'/%3E%3Ccircle cx='305' cy='155' r='4'/%3E%3Ccircle cx='295' cy='165' r='4'/%3E%3Ccircle cx='305' cy='165' r='4'/%3E%3Cline x1='300' y1='165' x2='300' y2='180'/%3E%3C!-- Clouds --%3E%3Cpath d='M 50 240 Q 45 240 45 235 Q 45 230 50 230 Q 50 225 55 225 Q 60 225 60 230 Q 65 230 65 235 Q 65 240 60 240 Z'/%3E%3C!-- Sun --%3E%3Ccircle cx='350' cy='240' r='12'/%3E%3Cline x1='350' y1='220' x2='350' y2='225'/%3E%3Cline x1='350' y1='255' x2='350' y2='260'/%3E%3Cline x1='330' y1='240' x2='335' y2='240'/%3E%3Cline x1='365' y1='240' x2='370' y2='240'/%3E%3Cline x1='335' y1='225' x2='340' y2='230'/%3E%3Cline x1='360' y1='250' x2='365' y2='255'/%3E%3Cline x1='335' y1='255' x2='340' y2='250'/%3E%3Cline x1='360' y1='230' x2='365' y2='225'/%3E%3C!-- Balloons --%3E%3Cellipse cx='140' cy='310' rx='12' ry='15'/%3E%3Cpath d='M 140 325 Q 135 335 130 345' stroke-linecap='round'/%3E%3Cellipse cx='170' cy='300' rx='12' ry='15'/%3E%3Cpath d='M 170 315 Q 165 325 160 335' stroke-linecap='round'/%3E%3C!-- Ice cream --%3E%3Ccircle cx='260' cy='310' r='10'/%3E%3Ccircle cx='270' cy='305' r='8'/%3E%3Ccircle cx='250' cy='305' r='8'/%3E%3Cpath d='M 245 310 L 260 340 L 275 310' fill='%23d1c4b8'/%3E%3C!-- Pencil --%3E%3Cpath d='M 340 300 L 360 320 L 355 325 L 335 305 Z' fill='%23d1c4b8'/%3E%3Cpath d='M 335 305 L 330 310 L 350 330 L 355 325 Z'/%3E%3Cpath d='M 360 320 L 365 315 L 370 320 L 365 325 Z' fill='%23d1c4b8'/%3E%3C!-- Camera --%3E%3Crect x='40' y='360' width='40' height='30' rx='3'/%3E%3Ccircle cx='60' cy='375' r='10'/%3E%3Crect x='70' y='363' width='8' height='5' rx='1'/%3E%3C!-- Rocket --%3E%3Cpath d='M 180 370 L 185 350 L 190 370 Z' fill='%23d1c4b8'/%3E%3Cpath d='M 185 350 L 185 340 Q 185 335 180 335 Q 175 335 175 340 L 175 350' fill='%23d1c4b8'/%3E%3Ccircle cx='185' cy='343' r='2' fill='%23e5ddd5'/%3E%3Cpath d='M 175 355 L 172 365 L 175 360 Z' fill='%23d1c4b8'/%3E%3Cpath d='M 195 355 L 198 365 L 195 360 Z' fill='%23d1c4b8'/%3E%3C!-- Pizza slice --%3E%3Cpath d='M 280 360 L 300 340 L 320 360 Z'/%3E%3Ccircle cx='295' cy='355' r='2' fill='%23d1c4b8'/%3E%3Ccircle cx='305' cy='352' r='2' fill='%23d1c4b8'/%3E%3Ccircle cx='290' cy='348' r='2' fill='%23d1c4b8'/%3E%3C/g%3E%3C/svg%3E")
                  `,
                  backgroundSize: '400px 400px',
                  backgroundPosition: '0 0',
                  backgroundRepeat: 'repeat'
                }}
              >
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-br-sm'
                          : message.isLoading
                          ? 'bg-white text-gray-800 rounded-bl-sm animate-pulse'
                          : 'bg-white text-gray-800 rounded-bl-sm'
                      }`}
                    >
                      {message.isLoading ? (
                        <div className="flex space-x-2 py-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      ) : (
                        <>
                          <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender === 'user' ? 'text-purple-100' : 'text-gray-400'
                          }`}>
                            {message.timestamp.toLocaleTimeString('en-US', { 
                              hour: 'numeric', 
                              minute: '2-digit',
                              hour12: true 
                            })}
                          </p>
                        </>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex space-x-2 items-center">
                  <Input
                    type="text"
                    value={inputValue}
                    onChange={(value) => setInputValue(value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Write your message..."
                    className="flex-1 bg-gray-50"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full flex items-center justify-center hover:from-purple-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-md"
                    aria-label="Send message"
                  >
                    {isTyping ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  ✨ AI-powered study assistant • Responses may vary
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
