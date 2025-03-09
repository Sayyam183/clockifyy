
import { useEffect, useState, useRef } from "react";
import { Calendar, List, Check } from "lucide-react";

const FeaturesSection = () => {
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
    <section ref={sectionRef} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold text-gray-900 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Why Clockify Stands Out
          </h2>
          <p className={`mt-4 text-xl text-gray-600 max-w-3xl mx-auto transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} 
             style={{ transitionDelay: '0.2s' }}>
            Designed with modern teens in mind. Streamlined, effective, and actually fun to use.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className={`bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg shadow-sm border border-gray-100 transition-all duration-700 transform hover:shadow-xl ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'}`} 
               style={{ transitionDelay: '0.3s' }}>
            <div className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center mb-6 pulse-glow">
              <Calendar className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Smart Schedule Templates</h3>
            <p className="text-gray-600">
              Pre-designed for high school and college students. Just pick and customize.
            </p>
          </div>
          
          <div className={`bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg shadow-sm border border-gray-100 transition-all duration-700 transform hover:shadow-xl ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'}`} 
               style={{ transitionDelay: '0.5s' }}>
            <div className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center mb-6 pulse-glow">
              <List className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Personalized Experience</h3>
            <p className="text-gray-600">
              Adapt any schedule to match your personal style, priorities, and workflow.
            </p>
          </div>
          
          <div className={`bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg shadow-sm border border-gray-100 transition-all duration-700 transform hover:shadow-xl ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'}`} 
               style={{ transitionDelay: '0.7s' }}>
            <div className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center mb-6 pulse-glow">
              <Check className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Research-Backed Methods</h3>
            <p className="text-gray-600">
              Using time management techniques proven to work with teen brains and busy schedules.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
