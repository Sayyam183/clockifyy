
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Clock, Brain, Heart, Calendar, Zap } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const LearnMore = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Set isLoaded to true after a short delay to trigger animations
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    // Add intersection observer for scroll animations
    const observers = sectionRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                entry.target.classList.add('visible');
              }, 100 * index);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );

      if (ref) {
        observer.observe(ref);
      }
      
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  // Function to add refs to our ref array
  const addToRefs = (el: HTMLDivElement) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Add CSS for animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        .visible {
          opacity: 1 !important;
          transform: translateX(0) !important;
          scale: 1 !important;
        }
        
        .fade-in {
          opacity: 0;
          transition: opacity 0.5s ease-out;
        }
        
        .slide-in-left {
          opacity: 0;
          transform: translateX(-50px);
          transition: all 0.5s ease-out;
        }
        
        .scale-in {
          opacity: 0;
          transform: scale(0.95);
          transition: all 0.5s ease-out;
        }
        
        .bounce {
          animation: bounce 1s ease-in-out;
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-20px); }
          60% { transform: translateY(-10px); }
        }
      `}} />
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-clockify-blue to-clockify-lightBlue py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center text-white transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-[bounce_1s_ease-in-out]">
              The Science Behind Time Management
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Discover how effective time management can transform your productivity, reduce stress, and help you achieve your goals.
            </p>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            <div 
              ref={addToRefs} 
              className={`space-y-4 transition-all duration-700 transform translate-x-[-50px] opacity-0 ${isLoaded ? 'visible' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div className="bg-clockify-blue rounded-full p-2 animate-pulse">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Why Time Management Matters</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Research shows that effective time management is directly correlated with academic success, reduced stress levels, and increased satisfaction with life. For teenagers, developing these skills early creates lifelong habits that support success in college and careers.
              </p>
            </div>
            
            <div 
              ref={addToRefs} 
              className={`space-y-4 transition-all duration-700 transform translate-x-[-50px] opacity-0 ${isLoaded ? 'visible' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div className="bg-clockify-blue rounded-full p-2 animate-pulse">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">The Teenage Brain and Time Management</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                The teenage brain is still developing, particularly in the prefrontal cortex - the area responsible for planning, prioritization, and impulse control. Structured time management provides the external framework that helps compensate for these still-developing neural pathways.
              </p>
            </div>
            
            <div 
              ref={addToRefs} 
              className={`space-y-4 transition-all duration-700 transform translate-x-[-50px] opacity-0 ${isLoaded ? 'visible' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div className="bg-clockify-blue rounded-full p-2 animate-pulse">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Health and Well-being Benefits</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Proper time management ensures adequate time for sleep, physical activity, and relaxation - all crucial for teenage development. Studies show that teens who manage their time well report better sleep quality, reduced anxiety, and improved mood.
              </p>
            </div>
            
            <div 
              ref={addToRefs} 
              className={`space-y-4 transition-all duration-700 transform translate-x-[-50px] opacity-0 ${isLoaded ? 'visible' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div className="bg-clockify-blue rounded-full p-2 animate-pulse">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Balancing Academic and Social Life</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                One of the biggest challenges for teens is balancing school responsibilities with social activities. Our research-based schedules help create that balance, ensuring academic success while allowing time for the social interactions crucial for emotional development.
              </p>
            </div>
            
            <div 
              ref={addToRefs} 
              className={`space-y-4 transition-all duration-700 transform translate-x-[-50px] opacity-0 ${isLoaded ? 'visible' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div className="bg-clockify-blue rounded-full p-2 animate-pulse">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Building Lifelong Skills</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                The time management skills developed during teenage years translate directly to success in college and career. By starting early, teens develop habits that will benefit them throughout their lives, from better study habits to increased productivity in their future careers.
              </p>
            </div>
            
            <div 
              ref={addToRefs} 
              className={`bg-clockify-lightGray p-8 rounded-xl shadow-sm transition-all duration-700 transform scale-95 opacity-0 ${isLoaded ? 'visible scale-100 opacity-100' : ''}`}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to transform your time management?</h3>
              <p className="text-gray-700 mb-6">
                Start with our professionally designed schedules tailored specifically for teenagers' unique needs and challenges.
              </p>
              <Link to="/schedules">
                <Button 
                  size="lg" 
                  className="bg-clockify-blue hover:bg-clockify-darkBlue transition-all duration-300 transform hover:scale-105"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Browse Schedules
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default LearnMore;
