
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// HD Slider images - using high-quality Unsplash images
const images = [
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1532667449560-72a95c8d381b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
];

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleGetStarted = (e) => {
    e.preventDefault();
    navigate("/schedules");
    window.scrollTo(0, 0);
  };

  const handleLearnMore = (e) => {
    e.preventDefault();
    navigate("/learn-more");
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      setIsImageLoaded(false);
    }, 5000);

    // Set isLoaded to true after a short delay to trigger animations
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setIsImageLoaded(false);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setIsImageLoaded(false);
  };

  return (
    <section className="bg-gradient-to-r from-purple-600 to-indigo-500 py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className={`md:w-1/2 text-white transition-all duration-1000 transform ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="animate-pulse-slow">Level Up</span>{" "}
              <span className="text-yellow-300 animate-pulse-slow" style={{ animationDelay: "0.5s" }}>Your Time Game</span>
            </h1>
            <p className="text-xl mb-8 transition-all duration-700 transform" style={{ transitionDelay: "0.3s" }}>
              The ultimate time management website created specifically for teens. Take control of your schedule, balance school and fun, and crush your goals with our easy-to-use tools.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-white text-purple-700 hover:bg-white/90 transition-all duration-300 transform hover:scale-105 hover:shadow-xl fancy-button"
                onClick={handleGetStarted}
              >
                Get Started Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-transparent text-white border-white hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                onClick={handleLearnMore}
              >
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Image Slider */}
          <div className={`hidden md:block md:w-1/2 mt-8 md:mt-0 relative transition-all duration-1000 transform ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 to-indigo-800/20 mix-blend-multiply z-10 rounded-xl"></div>
              
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="Teen time management"
                  className="w-full h-full object-cover absolute inset-0 transition-all duration-1500"
                  style={{ 
                    opacity: currentImage === index ? 1 : 0,
                    transform: currentImage === index ? 'scale(1)' : 'scale(1.1)',
                    transition: 'opacity 1s ease, transform 2.5s ease'
                  }}
                  onLoad={() => currentImage === index && setIsImageLoaded(true)}
                />
              ))}
              
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-500 ${
                      currentImage === index ? "bg-white scale-125" : "bg-white/40"
                    }`}
                    onClick={() => setCurrentImage(index)}
                  />
                ))}
              </div>
              
              <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 p-2 rounded-full text-white hover:bg-black/50 transition-all z-20 hover:scale-110"
                onClick={prevImage}
              >
                <ChevronLeft size={20} />
              </button>
              
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 p-2 rounded-full text-white hover:bg-black/50 transition-all z-20 hover:scale-110"
                onClick={nextImage}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
