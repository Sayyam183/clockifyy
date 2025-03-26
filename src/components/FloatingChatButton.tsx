
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SupportChat from "./SupportChat";

const FloatingChatButton = () => {
  const [showChat, setShowChat] = useState(false);
  const { toast } = useToast();

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
    <>
      {/* Floating button */}
      <button
        onClick={handleChatOpen}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-clockify-blue text-white shadow-lg flex items-center justify-center hover:bg-clockify-darkBlue transition-colors hover:scale-105 transform transition-transform"
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Render the support chat component */}
      <SupportChat isOpen={showChat} onClose={handleChatClose} />
    </>
  );
};

export default FloatingChatButton;
