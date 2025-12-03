import { useState, useEffect, useRef } from 'react';
import { Send, X, Bot } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ChatMessage } from '../types';
import { getAIResponseForContext } from './AIChat';

interface ChatBoxProps {
  tripId: string;
  tripTitle: string;
  onClose: () => void;
}

export default function ChatBox({ tripId, tripTitle, onClose }: ChatBoxProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      senderId: '2',
      senderName: 'Sarah Johnson',
      message: 'Hey everyone! Looking forward to this trip!',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: '2',
      senderId: '3',
      senderName: 'Mike Chen',
      message: 'Same here! Has anyone booked their flights yet?',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: user.id,
      senderName: user.fullName,
      message: newMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    const aiMessage = newMessage.trim();
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        senderId: 'ai-assistant',
        senderName: 'AI Travel Assistant',
        message: getAIResponseForContext(aiMessage),
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 800);

    setNewMessage('');
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-t-xl">
          <div>
            <h3 className="font-semibold text-lg">{tripTitle}</h3>
            <p className="text-sm text-blue-100">Trip Chat</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded-lg transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => {
            const isOwnMessage = message.senderId === user?.id;
            const isAI = message.senderId === 'ai-assistant';
            return (
              <div
                key={message.id}
                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] ${isOwnMessage ? 'order-2' : 'order-1'}`}>
                  {!isOwnMessage && (
                    <div className="flex items-center gap-1 mb-1 px-1">
                      {isAI && <Bot className="w-4 h-4 text-orange-500" />}
                      <p className={`text-xs font-medium ${isAI ? 'text-orange-600' : 'text-gray-600'}`}>
                        {message.senderName}
                      </p>
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-2 ${
                      isOwnMessage
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : isAI
                        ? 'bg-orange-50 text-gray-900 rounded-bl-sm shadow-sm border border-orange-200'
                        : 'bg-white text-gray-900 rounded-bl-sm shadow-sm'
                    }`}
                  >
                    <p className="text-sm break-words">{message.message}</p>
                    <p
                      className={`text-xs mt-1 ${
                        isOwnMessage
                          ? 'text-blue-100'
                          : isAI
                          ? 'text-orange-600'
                          : 'text-gray-500'
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="p-4 border-t bg-white rounded-b-xl">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-semibold"
            >
              <Send className="w-5 h-5" />
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
