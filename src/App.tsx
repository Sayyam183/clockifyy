
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Tips from "./pages/Tips";
import Schedules from "./pages/Schedules";
import Reviews from "./pages/Reviews";
import FAQ from "./pages/FAQ";
import LearnMore from "./pages/LearnMore";
import NotFound from "./pages/NotFound";

// Create a component to handle route changes
const RouteChangeHandler = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Ensure the page is fully visible immediately on route change
    document.body.style.opacity = '1';
    
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RouteChangeHandler />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/schedules" element={<Schedules />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/learn-more" element={<LearnMore />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
