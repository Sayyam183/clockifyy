
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import StatsSection from "@/components/home/StatsSection";
import CTASection from "@/components/home/CTASection";
import SupportChat from "@/components/SupportChat";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Set isLoaded to true after a short delay to trigger animations
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    // Smooth scroll behavior for the page
    document.documentElement.style.scrollBehavior = "smooth";
    
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

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

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <CTASection />
      </main>
      <Footer />
      <SupportChat isOpen={showChat} onClose={handleChatClose} />
    </div>
  );
};

export default Index;
