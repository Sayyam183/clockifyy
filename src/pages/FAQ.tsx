
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircle, Send, X, ThumbsUp, HelpCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const FAQ = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { text: "Hi there! How can I help you today?", isUser: false, timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();
  
  // Set animation state immediately
  useEffect(() => {
    // Preload content before showing animations
    document.body.style.opacity = '1';
    
    // Set isLoaded to true immediately on mount
    setIsLoaded(true);
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleChatOpen = () => {
    setShowChat(true);
    toast({
      title: "Live Chat Activated",
      description: "A support agent will be with you shortly.",
    });
  };
  
  const handleChatClose = () => {
    setShowChat(false);
    toast({
      title: "Live Chat Ended",
      description: "Thank you for using our support service.",
    });
  };

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

  const faqs = [
    {
      question: "Who is Clockify designed for?",
      answer: "Clockify is specifically designed for teenagers aged 13-18 who want to improve their time management skills. Our schedules and tips are tailored to the unique challenges that students face, such as balancing schoolwork, extracurricular activities, social life, and rest."
    },
    {
      question: "How do I choose the right schedule for me?",
      answer: "Start by considering your primary needs - are you focused on academics, balancing sports, managing creative pursuits, or juggling a part-time job? Browse our categories to find schedules that match your situation. You can also filter by difficulty level, with 'Easy' schedules offering more flexibility and 'Hard' ones providing more structure. Remember, you can always customize any schedule to better fit your specific needs."
    },
    {
      question: "Can I customize the schedules?",
      answer: "Absolutely! While our schedules provide excellent starting points, we encourage you to customize them to fit your unique situation. You can edit activity names, adjust time blocks, and make any other changes that help the schedule work better for you. Your personalized schedule will be saved to your account for future use."
    },
    {
      question: "What if I have an unpredictable schedule?",
      answer: "Many teens have schedules that vary day-to-day or week-to-week. In this case, we recommend creating multiple schedule templates for different types of days (e.g., school days, game days, work days). You can also use our more flexible templates and focus on time-blocking categories of activities rather than specific times. Our 'Tips' section also has advice specifically for managing variable schedules."
    },
    {
      question: "How long does it take to see results from better time management?",
      answer: "Most users report noticeable improvements within 2-3 weeks of consistently following a schedule. However, the exact timeline varies depending on your starting point and how consistently you implement the changes. Remember that time management is a skill that develops over time - be patient with yourself and celebrate small improvements!"
    },
    {
      question: "What should I do if I keep falling behind on my schedule?",
      answer: "If you're consistently unable to stick to your schedule, it might be too ambitious or not aligned with your actual needs and habits. Try these steps: 1) Track how you actually spend your time for a few days, 2) Compare that to your ideal schedule to see where the biggest discrepancies are, 3) Adjust your schedule to be more realistic - perhaps you need more transition time between activities or your study blocks are too long, 4) Start with easier schedules before moving to more demanding ones."
    },
    {
      question: "Is Clockify available as a mobile app?",
      answer: "Currently, Clockify is a web-based application optimized for both desktop and mobile browsers. You can bookmark the site on your phone for easy access. We're developing dedicated mobile apps for iOS and Android, which will be available in the near future."
    },
    {
      question: "How do I track my progress over time?",
      answer: "Clockify includes built-in tracking features that allow you to mark completed activities and see your adherence to your schedule over time. You can view weekly and monthly reports on your dashboard to track your progress. Many users also find it helpful to keep a brief journal noting what worked well and what challenges they faced each day."
    },
    {
      question: "Can parents/guardians access their teen's schedules?",
      answer: "We believe in promoting teen independence while recognizing the supportive role of parents. Teens can choose to share their schedules with parents through a view-only link. However, the account and schedule management remains in the teen's control. This approach helps teens develop responsibility while still allowing for parental guidance when needed."
    },
    {
      question: "What if I have special educational needs or accommodations?",
      answer: "We understand that teens with ADHD, learning disabilities, or other conditions may need adapted approaches to time management. We have specific schedule templates designed with these needs in mind, incorporating more frequent breaks, varied activities, and visual cues. Our blog also features tips from experts on time management strategies for different learning styles and needs."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Add CSS for unique FAQ animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        .faq-fade-in {
          opacity: 0;
          animation: faqFadeIn 0.7s ease-out forwards;
        }
        
        .faq-swing-in {
          opacity: 0;
          transform: rotateY(-10deg) translateX(-20px);
          transform-origin: left;
          animation: faqSwingIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .faq-slide-up-fade {
          opacity: 0;
          transform: translateY(20px);
          animation: faqSlideUpFade 0.7s ease-out forwards;
        }
        
        .faq-expand {
          max-width: 0;
          opacity: 0;
          animation: faqExpand 0.8s ease-out forwards;
        }
        
        @keyframes faqFadeIn {
          to { opacity: 1; }
        }
        
        @keyframes faqSwingIn {
          to { opacity: 1; transform: rotateY(0) translateX(0); }
        }
        
        @keyframes faqSlideUpFade {
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes faqExpand {
          to { opacity: 1; max-width: 100%; }
        }
        
        .faq-item-hover {
          transition: all 0.3s ease;
        }
        
        .faq-item-hover:hover {
          transform: translateX(8px);
          box-shadow: -4px 0 0 0 #8B5CF6;
          padding-left: 8px;
        }

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
      
      <Navbar />
      
      {/* Hero Section with unique animations */}
      <section className="bg-gradient-to-r from-clockify-blue to-clockify-lightBlue py-12">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white ${isLoaded ? 'faq-fade-in' : 'opacity-0'}`}>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 faq-swing-in" style={{animationDelay: '0.1s'}}>
            Frequently Asked Questions
          </h1>
          <p className="text-xl max-w-3xl mx-auto faq-slide-up-fade" style={{animationDelay: '0.3s'}}>
            Find answers to common questions about Clockify and time management for teens.
          </p>
        </div>
      </section>
      
      {/* FAQ Section with staggered animations */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className={`${isLoaded ? 'faq-slide-up-fade faq-item-hover' : 'opacity-0'}`}
                style={{ animationDelay: `${0.4 + (index * 0.1)}s` }}
              >
                <AccordionTrigger className="text-left font-medium text-lg hover:text-clockify-blue transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-12 bg-clockify-lightGray">
        <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center ${isLoaded ? 'faq-swing-in' : 'opacity-0'}`} style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-bold mb-4 faq-swing-in" style={{animationDelay: '0.7s'}}>Still Have Questions?</h2>
          <p className="text-lg text-gray-700 mb-6 faq-slide-up-fade" style={{animationDelay: '0.8s'}}>
            We're here to help! Reach out to our support team for assistance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="mailto:support@clockify.com" 
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-clockify-blue hover:bg-clockify-darkBlue faq-expand faq-item-hover"
              style={{ animationDelay: '0.9s' }}
            >
              Email Support
            </a>
            <Button 
              onClick={handleChatOpen} 
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-clockify-blue bg-white hover:bg-gray-50 faq-expand faq-item-hover"
              style={{ animationDelay: '1s' }}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Live Chat
            </Button>
          </div>
        </div>
      </section>
      
      {/* Live Chat Modal with improved UI */}
      {showChat && (
        <div className="fixed bottom-4 right-4 w-80 z-50 scale-in">
          <Card className="p-4 shadow-lg border-t-4 border-t-clockify-blue">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <MessageCircle className="mr-2 h-5 w-5 text-clockify-blue" />
                <h3 className="text-lg font-semibold">Live Support</h3>
                <Badge className="ml-2 bg-green-500 text-white text-xs">Online</Badge>
              </div>
              <Button variant="ghost" size="sm" onClick={handleChatClose} className="h-6 w-6 p-0 rounded-full">
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
      )}
      
      <Footer />
    </div>
  );
};

export default FAQ;
