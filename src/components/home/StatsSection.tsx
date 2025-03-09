
import { useState, useEffect, useRef } from "react";

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    users: 0,
    grades: 0,
    procrastination: 0,
    templates: 0
  });
  const targetCounts = {
    users: 3500,
    grades: 80,
    procrastination: 65,
    templates: 50
  };
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

  useEffect(() => {
    if (isVisible) {
      const duration = 2000; // ms
      const frameDuration = 1000 / 60; // 60fps
      const totalFrames = Math.round(duration / frameDuration);
      let frame = 0;

      const timer = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const easedProgress = easeOutCubic(progress);
        
        setCounts({
          users: Math.floor(easedProgress * targetCounts.users),
          grades: Math.floor(easedProgress * targetCounts.grades),
          procrastination: Math.floor(easedProgress * targetCounts.procrastination),
          templates: Math.floor(easedProgress * targetCounts.templates)
        });

        if (frame === totalFrames) {
          clearInterval(timer);
          setCounts(targetCounts);
        }
      }, frameDuration);

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  // Easing function for smoother animation
  const easeOutCubic = (x: number): number => {
    return 1 - Math.pow(1 - x, 3);
  };

  return (
    <section ref={sectionRef} className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div className={`bg-white p-8 rounded-lg shadow-md transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'}`} 
               style={{ transitionDelay: '0.1s' }}>
            <p className="text-5xl font-bold text-purple-600">{counts.users}{counts.users === targetCounts.users ? "+" : ""}</p>
            <p className="mt-4 text-lg text-gray-600">Teen Users</p>
          </div>
          
          <div className={`bg-white p-8 rounded-lg shadow-md transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'}`} 
               style={{ transitionDelay: '0.3s' }}>
            <p className="text-5xl font-bold text-purple-600">{counts.grades}%</p>
            <p className="mt-4 text-lg text-gray-600">Report Better Grades</p>
          </div>
          
          <div className={`bg-white p-8 rounded-lg shadow-md transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'}`} 
               style={{ transitionDelay: '0.5s' }}>
            <p className="text-5xl font-bold text-purple-600">{counts.procrastination}%</p>
            <p className="mt-4 text-lg text-gray-600">Less Procrastination</p>
          </div>
          
          <div className={`bg-white p-8 rounded-lg shadow-md transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'}`} 
               style={{ transitionDelay: '0.7s' }}>
            <p className="text-5xl font-bold text-purple-600">{counts.templates}+</p>
            <p className="mt-4 text-lg text-gray-600">Schedule Templates</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
