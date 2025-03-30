
import { useState, useEffect, useRef } from "react";
import { Clock, Calendar, List, CheckCircle } from "lucide-react";

const HowItWorksSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
        threshold: 0.1
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
    <section ref={sectionRef} className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold text-gray-900 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            How Clockify Works
          </h2>
          <p className={`mt-4 text-xl text-gray-600 max-w-3xl mx-auto transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} 
             style={{ transitionDelay: '0.2s' }}>
            Get started in just three easy steps
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <div className={`bg-white p-8 rounded-lg shadow-md transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'}`}
               style={{ transitionDelay: '0.3s' }}>
            <div className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center mb-6 pulse-glow">
              <Calendar className="h-7 w-7 text-white" />
              <div className="absolute top-0 right-0 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Choose a Template</h3>
            <p className="text-gray-600">
              Browse our collection of pre-made schedule templates designed specifically for teens.
            </p>
          </div>
          
          {/* Step 2 */}
          <div className={`bg-white p-8 rounded-lg shadow-md transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'}`}
               style={{ transitionDelay: '0.5s' }}>
            <div className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center mb-6 pulse-glow">
              <List className="h-7 w-7 text-white" />
              <div className="absolute top-0 right-0 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Customize Your Schedule</h3>
            <p className="text-gray-600">
              Personalize the template to match your unique needs, priorities, and school requirements.
            </p>
          </div>
          
          {/* Step 3 */}
          <div className={`bg-white p-8 rounded-lg shadow-md transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'}`}
               style={{ transitionDelay: '0.7s' }}>
            <div className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center mb-6 pulse-glow">
              <CheckCircle className="h-7 w-7 text-white" />
              <div className="absolute top-0 right-0 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Start Managing Time</h3>
            <p className="text-gray-600">
              Follow your new schedule and watch your productivity soar while stress levels drop.
            </p>
          </div>
          
          {/* Connecting line between steps - visible on desktop only */}
          <div className="hidden md:block absolute top-1/4 left-0 right-0 h-0.5 bg-indigo-200" style={{ zIndex: 0 }}></div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
