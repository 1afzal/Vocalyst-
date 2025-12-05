import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Send, Loader2, User, Bot, Zap } from 'lucide-react';

// Configuration for the Gemini API
const MODEL_NAME = 'gemini-2.5-flash-preview-09-2025';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`;
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Validate API key is present
if (!API_KEY) {
    console.error('VITE_GEMINI_API_KEY is not set. Please create a .env file in the frontend directory with VITE_GEMINI_API_KEY=your_api_key');
} else if (API_KEY === 'your_api_key_here') {
    console.error('VITE_GEMINI_API_KEY is still set to the placeholder value. Please replace it with your actual API key in the .env file.');
} else {
    // Log first few characters for debugging (don't log the full key for security)
    console.log('API key loaded:', API_KEY.substring(0, 10) + '...');
}

// Helper function for exponential backoff retry logic
const fetchWithRetry = async (url, options, maxRetries = 5) => {
    let lastError = null;
    for (let i = 0; i < maxRetries; i++) {
        const delay = Math.pow(2, i) * 1000;
        try {
            if (i > 0) {
                
                await new Promise(resolve => setTimeout(resolve, delay));
            }
            
            const response = await fetch(url, options);

            
            if (response.ok) {
                return response;
            } else if (response.status === 429) {
            
                console.warn(`Attempt ${i + 1} failed with status 429. Retrying in ${delay / 1000}s...`);
            } else {
      
                const errorBody = await response.json();
                console.error("Non-retryable API error:", errorBody);
                throw new Error(`API Request failed with status ${response.status}: ${errorBody.error?.message || 'Unknown error'}`);
            }
        } catch (error) {
            lastError = error;
            console.error(`Attempt ${i + 1} failed:`, error.message);
        }
    }
    throw new Error(`Failed to fetch content after ${maxRetries} retries. Last error: ${lastError?.message || 'Unknown error'}`);
};


// Component for a single chat message bubble
const ChatMessage = ({ message, role }) => {
    const isUser = role === 'user';
    // Minimalist B&W styling
    const bubbleClass = isUser
        ? 'bg-black text-white rounded-tr-none self-end'
        : 'bg-gray-100 text-gray-900 rounded-tl-none self-start';
    const icon = isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-black" />;
    const iconBg = isUser ? 'bg-gray-900' : 'bg-gray-200';

    // Simple markdown conversion for basic formatting (like newlines)
    const formattedText = message.split('\n').map((line, index) => (
        <React.Fragment key={index}>
            {line}
            {index < message.split('\n').length - 1 && <br />}
        </React.Fragment>
    ));

    return (
        <div className={`flex flex-col max-w-3/4 mb-4 ${isUser ? 'items-end' : 'items-start'}`}>
            <div className={`flex items-start space-x-2 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`p-2 rounded-full ${iconBg} shadow-sm`}>
                    {icon}
                </div>
                <div className={`p-3 rounded-xl shadow-lg transition-all duration-300 ease-in-out ${bubbleClass} max-w-full md:max-w-xl break-words whitespace-pre-wrap font-inter`}>
                    {formattedText}
                </div>
            </div>
        </div>
    );
};

// Main Chat Application Component
function ChatApp(){
    // State for the chat history: [{ role: 'user' | 'model', text: '...' }]
    const [messages, setMessages] = useState([{
        role: 'model',
        text: "Hello! I'm Vocalyst chatBot, your AI assistant. How can I help you today?",
    }]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    // Ref for scrolling to the latest message
    const messagesEndRef = useRef(null);

    // Scroll to the bottom of the chat history whenever messages update
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = useCallback(async (text) => {
        if (!text.trim() || isLoading) return;

        // Check if API key is configured
        if (!API_KEY) {
            setMessages(prev => [...prev, {
                role: 'model',
                text: "⚠️ API key not configured. Please create a .env file in the frontend directory with:\n\nVITE_GEMINI_API_KEY=your_api_key_here\n\nAfter adding the file, restart the development server.",
            }]);
            return;
        }

        const userMessage = { role: 'user', text };

        // 1. Update UI with user message and start loading indicator
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const newChatHistory = [...messages, userMessage];

        try {
            const payload = {
                // The API expects the entire conversation history for context
                contents: newChatHistory.map(msg => ({
                    role: msg.role === 'user' ? 'user' : 'model',
                    parts: [{ text: msg.text }]
                })),
            };

            const response = await fetchWithRetry(
                `${API_URL}?key=${API_KEY}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                }
            );

            const result = await response.json();
            const candidate = result.candidates?.[0];
            const modelText = candidate?.content?.parts?.[0]?.text;

            if (modelText) {
                // 2. Update UI with model response
                setMessages(prev => [...prev, { role: 'model', text: modelText }]);
            } else {
                // Handle cases where the model response is empty or malformed
                const errorMessage = "Sorry, I received an empty or invalid response from the AI.";
                setMessages(prev => [...prev, { role: 'model', text: errorMessage }]);
                console.error("AI response error:", result);
            }

        } catch (error) {
            console.error("Gemini API Error:", error);
            // 3. Update UI with an error message
            let errorMessage = "An error occurred while connecting to the AI. Please try again.";
            
            // Provide more specific error messages
            if (error.message && error.message.includes('API key not valid')) {
                errorMessage = "⚠️ Invalid API key. Please check your .env file and ensure VITE_GEMINI_API_KEY is set correctly. After updating, restart the development server.";
            } else if (error.message && error.message.includes('API key')) {
                errorMessage = "⚠️ API key issue detected. Please verify your VITE_GEMINI_API_KEY in the .env file.";
            }
            
            setMessages(prev => [...prev, {
                role: 'model',
                text: errorMessage,
            }]);
        } finally {
            // 4. Stop loading indicator
            setIsLoading(false);
        }
    }, [isLoading, messages]);

    // Handler for the send button or Enter key press
    const handleSend = () => {
        sendMessage(input);
    };

    // Handler for pressing Enter in the input field
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center p-4 sm:p-6 font-sans">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
                .font-inter { font-family: 'Inter', sans-serif; }
                /* Custom scrollbar for better aesthetics */
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #c8c8c8;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #a8a8a8;
                }
                `}
            </style>

            <div className="w-full max-w-4xl bg-white border border-black shadow-2xl rounded-xl flex flex-col h-[90vh] md:h-[80vh] overflow-hidden">
                
                {/* Header - White background, black text/border for minimalist look */}
                <div className="p-4 bg-gray-100 text-black border-b border-black shadow-sm flex items-center justify-center rounded-t-xl">
                    <Zap className="w-6 h-6 mr-2 text-black animate-pulse" />
                    <h1 className="text-xl font-bold font-inter">Vocalyst ChatBot. </h1>
                </div>

                {/* Messages Area */}
                <div className="flex-1 p-4 overflow-y-auto custom-scrollbar flex flex-col space-y-3 bg-white">
                    {messages.map((msg, index) => (
                        <ChatMessage key={index} role={msg.role} message={msg.text} />
                    ))}
                    {isLoading && (
                        <div className="flex items-center self-start mb-4">
                            <div className="p-2 rounded-full bg-gray-200 shadow-sm mr-2">
                                <Bot className="w-4 h-4 text-black" />
                            </div>
                            <div className="bg-gray-100 p-3 rounded-xl rounded-tl-none shadow-lg max-w-full font-inter">
                                {/* Loading spinner is black */}
                                <Loader2 className="w-5 h-5 animate-spin text-black" />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-black bg-white">
                    <div className="flex items-center space-x-3">
                        <textarea
                            className="flex-1 resize-none border border-black rounded-xl p-3 focus:ring-2 focus:ring-black focus:border-black transition duration-150 font-inter text-base h-12 overflow-hidden"
                            placeholder="Type your message here..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            rows={1}
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || isLoading}
                            className={`p-3 rounded-full shadow-lg transition-all duration-200 ease-in-out font-semibold flex items-center justify-center
                                ${!input.trim() || isLoading
                                ? 'bg-gray-400 cursor-not-allowed' // Disabled state (gray)
                                : 'bg-black hover:bg-gray-800 active:scale-95' // Active state (black)
                            }`}
                            aria-label="Send message"
                        >
                            {isLoading ? (
                                <Loader2 className="w-6 h-6 text-white animate-spin" />
                            ) : (
                                <Send className="w-6 h-6 text-white" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatApp;