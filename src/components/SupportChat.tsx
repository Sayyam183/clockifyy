
import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, ThumbsUp, Star, Smile, Meh, Frown, Heart } from "lucide-react";
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
    { text: "Hi there! I'm your Clockify assistant. How can I help you today?", isUser: false, timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [conversationContext, setConversationContext] = useState({
    userName: "",
    topicDiscussed: "",
    questionCount: 0,
  });
  const [showRatingPanel, setShowRatingPanel] = useState(false);
  const { toast } = useToast();

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showRatingPanel]);

  const handleFeedback = () => {
    setShowRatingPanel(true);
  };

  const submitRating = (rating: string, feedback: string = "") => {
    // Here you could implement API calls to save the rating
    toast({
      title: "Thank you for your feedback!",
      description: `You rated this conversation as "${rating}". We'll use this to improve.`,
    });
    setShowRatingPanel(false);
  };

  // Detect user name from messages
  useEffect(() => {
    const userMessages = messages.filter(m => m.isUser).map(m => m.text);
    if (userMessages.length > 0 && conversationContext.userName === "") {
      // Check for name introduction patterns
      const namePatterns = [
        /my name is (\w+)/i,
        /i'm (\w+)/i,
        /i am (\w+)/i,
        /call me (\w+)/i
      ];
      
      for (const message of userMessages) {
        for (const pattern of namePatterns) {
          const match = message.match(pattern);
          if (match && match[1]) {
            setConversationContext(prev => ({
              ...prev,
              userName: match[1]
            }));
            break;
          }
        }
      }
    }
  }, [messages, conversationContext.userName]);

  // Track topic being discussed
  const updateConversationContext = (userMessage: string) => {
    // Increment question count
    const isQuestion = userMessage.includes("?");
    
    let topic = conversationContext.topicDiscussed;
    
    // Detect topic from message
    if (userMessage.toLowerCase().includes("schedule")) {
      topic = "schedules";
    } else if (userMessage.toLowerCase().includes("study") || userMessage.toLowerCase().includes("school")) {
      topic = "study techniques";
    } else if (userMessage.toLowerCase().includes("app") || userMessage.toLowerCase().includes("clockify")) {
      topic = "app features";
    } else if (userMessage.toLowerCase().includes("account") || userMessage.toLowerCase().includes("login")) {
      topic = "account management";
    }
    
    setConversationContext(prev => ({
      ...prev,
      questionCount: isQuestion ? prev.questionCount + 1 : prev.questionCount,
      topicDiscussed: topic || prev.topicDiscussed
    }));
    
    return { ...conversationContext, topicDiscussed: topic, questionCount: isQuestion ? conversationContext.questionCount + 1 : conversationContext.questionCount };
  };

  // Improved AI response generation with context awareness
  const getAIResponse = (userMessage: string, context: any) => {
    // Convert message to lowercase for easier matching
    const lowerMessage = userMessage.toLowerCase();
    
    // Personalization based on detected name
    const personalization = context.userName ? `, ${context.userName}` : "";
    
    // Greeting patterns with personalization
    if (lowerMessage.includes("hi") || 
        lowerMessage.includes("hello") || 
        lowerMessage.includes("hey") ||
        lowerMessage.includes("greetings")) {
      return `Hello${personalization}! 👋 How can I help you with your time management today?`;
    }
    
    // If user introduces themselves
    if (lowerMessage.includes("my name is") || 
        lowerMessage.includes("i'm ") || 
        lowerMessage.includes("i am ") ||
        lowerMessage.includes("call me ")) {
      if (context.userName) {
        return `Nice to meet you, ${context.userName}! How can I assist you with Clockify today?`;
      }
      return "Nice to meet you! How can I assist you with Clockify today?";
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
      return `I'm here to help${personalization}! Please let me know what specific issue you're having with Clockify, and I'll guide you through resolving it. You can also check our FAQ page for common questions.`;
    }

    // Thank you responses
    if (lowerMessage.includes("thank") || lowerMessage.includes("thanks") || lowerMessage.includes("appreciate")) {
      return `You're welcome${personalization}! I'm happy to help. Is there anything else you'd like to know about Clockify?`;
    }

    // Goodbye responses
    if (lowerMessage.includes("bye") || lowerMessage.includes("goodbye") || lowerMessage.includes("see you")) {
      return `Goodbye${personalization}! Feel free to come back anytime you have questions about managing your time with Clockify.`;
    }
    
    // Questions about features
    if (lowerMessage.includes("feature") || lowerMessage.includes("can it") || lowerMessage.includes("does it")) {
      return "Clockify includes features like customizable schedules, time tracking, reminders, and educational tips tailored for teens. It's designed to be easy to use while providing powerful time management tools.";
    }
    
    // Context-aware follow-up based on previous topic
    if (context.topicDiscussed === "schedules" && context.questionCount > 1) {
      return "Looking for more schedule advice? You might want to check out our Schedules page for templates designed specifically for different activities and study styles.";
    } else if (context.topicDiscussed === "study techniques" && context.questionCount > 1) {
      return "For more study tips, I recommend checking out our Tips page. We've compiled advice from successful students on how to maximize your study sessions.";
    }
    
    // Default responses with some variety
    const defaultResponses = [
      `That's a great question${personalization}. Clockify can definitely help with that!`,
      `I understand what you're asking about. Here's what you need to know about managing your time effectively...`,
      `Thanks for reaching out${personalization}! I'd be happy to assist you with that question about Clockify.`,
      `Many teens have similar questions. Clockify is designed to address exactly these kinds of time management challenges.`,
      `I can definitely help with that${personalization}. Let's look at how Clockify can address your needs.`
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
    
    // Update context and get updated context
    const updatedContext = updateConversationContext(inputValue);
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate AI typing with variable delay based on response length
    setTimeout(() => {
      setIsTyping(false);
      const aiResponseText = getAIResponse(inputValue, updatedContext);
      const aiResponse = {
        text: aiResponseText,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds for more natural feel
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

        .chat-message {
          transition: all 0.3s ease;
          animation: messageAppear 0.3s forwards;
          opacity: 0;
          transform: translateY(10px);
        }

        @keyframes messageAppear {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .rating-option {
          transition: all 0.2s ease;
        }
        
        .rating-option:hover {
          transform: scale(1.15);
        }
        
        .rating-option.selected {
          transform: scale(1.2);
          color: #8B5CF6;
        }
      `}} />
      <Card className="p-4 shadow-lg border-t-4 border-t-clockify-blue">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <MessageCircle className="mr-2 h-5 w-5 text-clockify-blue" />
            <h3 className="text-lg font-semibold">Clockify Assistant</h3>
            <Badge className="ml-2 bg-green-500 text-white text-xs">Online</Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0 rounded-full">
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Chat messages container */}
        <div className="h-60 bg-gray-50 rounded p-3 mb-4 overflow-auto">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex mb-2 ${message.isUser ? 'justify-end' : 'justify-start'} chat-message`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
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
            <div className="flex mb-2 justify-start chat-message">
              <div className="rounded-lg p-2 bg-gray-200 text-gray-800">
                <div className="typing-indicator">
                  <span className="typing-indicator-dot"></span>
                  <span className="typing-indicator-dot"></span>
                  <span className="typing-indicator-dot"></span>
                </div>
              </div>
            </div>
          )}

          {/* Rating Panel */}
          {showRatingPanel && (
            <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200 mb-3 chat-message">
              <h4 className="font-medium text-sm mb-2 text-center">How was your experience?</h4>
              <div className="flex justify-center gap-3 mb-3">
                <RatingOption icon={<Frown className="h-6 w-6" />} onClick={() => submitRating("Poor")} label="Poor" />
                <RatingOption icon={<Meh className="h-6 w-6" />} onClick={() => submitRating("Okay")} label="Okay" />
                <RatingOption icon={<Smile className="h-6 w-6" />} onClick={() => submitRating("Good")} label="Good" />
                <RatingOption icon={<Heart className="h-6 w-6" />} onClick={() => submitRating("Love it")} label="Love it" />
              </div>
              <div className="flex justify-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs text-gray-500"
                  onClick={() => setShowRatingPanel(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Message input */}
        <div className="flex gap-2 mb-2">
          <input 
            type="text" 
            placeholder="Type your message..." 
            className="flex-grow p-2 border rounded focus:ring-2 focus:ring-clockify-blue focus:border-transparent outline-none"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button 
            onClick={handleMessageSend} 
            className="hover:scale-105 transition-transform bg-clockify-blue hover:bg-clockify-darkBlue"
            disabled={!inputValue.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Chat footer */}
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

// Rating option component
interface RatingOptionProps {
  icon: React.ReactNode;
  onClick: () => void;
  label: string;
}

const RatingOption = ({ icon, onClick, label }: RatingOptionProps) => {
  return (
    <div 
      className="rating-option flex flex-col items-center cursor-pointer" 
      onClick={onClick}
    >
      <div className="text-gray-600 hover:text-clockify-blue mb-1">
        {icon}
      </div>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
};

export default SupportChat;
