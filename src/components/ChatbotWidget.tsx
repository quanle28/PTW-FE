// ChatbotWidget.tsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { MessageCircle } from 'lucide-react';

const ChatbotWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ from: 'user' | 'bot'; text: string }[]>([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const handleSend = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { from: 'user', text: input }];
        setMessages(newMessages);
        setInput('');

        try {
            const response = await axios.post('http://localhost:8080/shopqtq/chatbot', {
                message: input
            });

            setMessages([...newMessages, { from: 'bot', text: response.data }]);
        } catch (error) {
            setMessages([...newMessages, { from: 'bot', text: 'Chatbot hiện không phản hồi. Vui lòng thử lại sau.' }]);
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="chatbot-container">
            {isOpen ? (
                <div className="chatbox">
                    <div className="chatbox-header">
                        <span className="chatbox-title">TechView Chatbot</span>
                        <button onClick={() => setIsOpen(false)} className="chatbox-close">×</button>
                    </div>

                    <div className="chatbox-messages">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`chat-bubble ${msg.from === 'user' ? 'user' : 'bot'}`}
                            >
                                {msg.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chatbox-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            className="chatbox-textbox"
                            placeholder="Nhập tin nhắn..."
                        />
                        <button onClick={handleSend} className="chatbox-send">
                            Gửi
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="chatbox-toggle"
                >
                    <MessageCircle size={20} /> Chatbot
                </button>
            )}
        </div>
    );
};

export default ChatbotWidget;
