
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleGetStarted = (e) => {
    e.preventDefault();
    navigate("/schedules");
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.2
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className={`bg-gradient-to-r from-purple-600 to-indigo-500 rounded-xl shadow-2xl p-8 md:p-12 text-center transition-all duration-1200 transform ${
            isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'
          }`}
        >
          <div className="relative overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-500/20 mix-blend-multiply z-10"></div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 relative z-20">Ready to take control of your time?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto relative z-20">
              Join thousands of other teens who are mastering time management with Clockify.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-purple-700 hover:bg-white/90 transition-all transform hover:scale-105 hover:shadow-lg relative z-20 fancy-button"
              onClick={handleGetStarted}
            >
              Get Started Today
            </Button>
            
            {/* Animated background elements */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2 animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
            <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-white/5 rounded-full -translate-y-1/2 animate-pulse-slow" style={{ animationDelay: "0.5s" }}></div>
            <div className="absolute bottom-1/3 left-1/4 w-16 h-16 bg-white/5 rounded-full animate-pulse-slow" style={{ animationDelay: "1.5s" }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
