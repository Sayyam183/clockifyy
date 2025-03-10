
import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface SupportChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const SupportChat = ({ isOpen, onClose }: SupportChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { text: "Hi there! How can I help you today?", isUser: false, timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFeedback = () => {
    toast({
      title: "Thank you!",
      description: "We appreciate your feedback.",
    });
  };

  // AI response generation
  const getAIResponse = (userMessage: string) => {
    const responses = [
      "I understand your question. Let me help you with that!",
      "That's a good question about time management.",
      "I can definitely assist you with that issue.",
      "Let me find the information you need about Clockify.",
      "Thanks for reaching out! Here's what you need to know...",
      "I'm checking our resources to give you the best answer.",
      "Great question! Many teens ask about this topic.",
      "I'd be happy to explain how Clockify can help with that.",
      "Let me show you how to better manage your time for that activity.",
      "Our schedules are designed to help with exactly that kind of situation."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleMessageSend = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage = {
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate AI typing with slight delay
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse = {
        text: getAIResponse(inputValue),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleMessageSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 z-50 scale-in">
      <style dangerouslySetInnerHTML={{ __html: `
        .typing-indicator {
          display: flex;
          align-items: center;
          column-gap: 0.25rem;
        }
        
        .typing-indicator-dot {
          display: block;
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          background-color: #8B5CF6;
          animation: typingAnimation 1.4s infinite ease-in-out;
        }
        
        .typing-indicator-dot:nth-child(1) {
          animation-delay: 0s;
        }
        
        .typing-indicator-dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .typing-indicator-dot:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        @keyframes typingAnimation {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-0.25rem);
          }
        }
      `}} />
      <Card className="p-4 shadow-lg border-t-4 border-t-clockify-blue">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <MessageCircle className="mr-2 h-5 w-5 text-clockify-blue" />
            <h3 className="text-lg font-semibold">Live Support</h3>
            <Badge className="ml-2 bg-green-500 text-white text-xs">Online</Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0 rounded-full">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="h-60 bg-gray-50 rounded p-3 mb-4 overflow-auto">
          {messages.map((message, index) => (
            <div key={index} className={`flex mb-2 ${message.isUser ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`rounded-lg p-2 max-w-[80%] ${
                  message.isUser 
                    ? 'bg-clockify-blue text-white' 
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {message.text}
                <div className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex mb-2 justify-start">
              <div className="rounded-lg p-2 bg-gray-200 text-gray-800">
                <div className="typing-indicator">
                  <span className="typing-indicator-dot"></span>
                  <span className="typing-indicator-dot"></span>
                  <span className="typing-indicator-dot"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex gap-2 mb-2">
          <input 
            type="text" 
            placeholder="Type your message..." 
            className="flex-grow p-2 border rounded focus:ring-2 focus:ring-clockify-blue focus:border-transparent outline-none"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button onClick={handleMessageSend} className="hover:scale-105 transition-transform bg-clockify-blue hover:bg-clockify-darkBlue">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-between text-xs text-gray-500 px-1">
          <button 
            onClick={handleFeedback}
            className="flex items-center hover:text-clockify-blue transition-colors"
          >
            <ThumbsUp className="h-3 w-3 mr-1" />
            Rate this chat
          </button>
          <a 
            href="mailto:support@clockify.com" 
            className="flex items-center hover:text-clockify-blue transition-colors"
          >
            Email transcript
          </a>
        </div>
      </Card>
    </div>
  );
};

export default SupportChat;
