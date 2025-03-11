
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

  // AI response generation - improved with better contextual responses
  const getAIResponse = (userMessage: string) => {
    // Convert message to lowercase for easier matching
    const lowerMessage = userMessage.toLowerCase();
    
    // Greeting patterns
    if (lowerMessage.includes("hi") || 
        lowerMessage.includes("hello") || 
        lowerMessage.includes("hey") ||
        lowerMessage.includes("greetings")) {
      return "Hello! 👋 How can I help you with your time management today?";
    }
    
    // Questions about the app
    if (lowerMessage.includes("what is") || lowerMessage.includes("how does") || lowerMessage.includes("explain")) {
      if (lowerMessage.includes("clockify")) {
        return "Clockify is a time management app designed specifically for teenagers aged 13-18. It helps you balance school, extracurricular activities, and rest with customizable schedules and useful tips.";
      }
      return "Great question! Clockify offers personalized schedules, time management tips, and tracking tools to help teens better manage their time. What specific aspect would you like to know more about?";
    }
    
    // Schedule related queries
    if (lowerMessage.includes("schedule") || lowerMessage.includes("plan") || lowerMessage.includes("calendar")) {
      return "Our schedules are fully customizable to fit your unique needs. You can create different templates for school days, weekends, or special activity days. Would you like me to help you set up your first schedule?";
    }
    
    // School/study related
    if (lowerMessage.includes("study") || lowerMessage.includes("school") || lowerMessage.includes("homework")) {
      return "Effective studying is all about balance! We recommend the Pomodoro technique: 25 minutes of focused study followed by a 5-minute break. Our schedules can help you implement this and other study strategies.";
    }
    
    // Help or support queries
    if (lowerMessage.includes("help") || lowerMessage.includes("support") || lowerMessage.includes("issue")) {
      return "I'm here to help! Please let me know what specific issue you're having, and I'll guide you through resolving it. You can also visit our FAQ page for common questions.";
    }
    
    // Default responses for anything else
    const defaultResponses = [
      "That's a great question. Let me help you with that!",
      "I understand what you're asking. Here's what you need to know about managing your time effectively...",
      "Thanks for reaching out! I'd be happy to assist you with that question about Clockify.",
      "Many teens have similar questions. Here's what might help you...",
      "I can definitely help with that. Let's look at how Clockify can address your needs."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
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
