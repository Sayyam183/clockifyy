
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TipCard from "@/components/TipCard";
import { Clock, Calendar, List, Check, Timer } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const Tips = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Set isLoaded to true after a short delay to trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    // Add intersection observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    cardsRef.current.forEach(card => {
      if (card) observer.observe(card);
    });
    
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  // Function to add refs to our ref array
  const addToRefs = (el: HTMLDivElement) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const timeManagementTips = [
    {
      title: "The Pomodoro Technique",
      description: "Study for 25 minutes, then take a 5-minute break. After four sessions, take a longer break of 15-30 minutes. This helps maintain focus and prevents burnout.",
      icon: <Timer className="h-5 w-5 text-clockify-blue" />,
      color: "bg-clockify-blue"
    },
    {
      title: "Use a Planner",
      description: "Whether digital or physical, a planner helps you visualize your commitments and deadlines. Try color-coding for different subjects or activities.",
      icon: <Calendar className="h-5 w-5 text-green-500" />,
      color: "bg-green-500"
    },
    {
      title: "Set SMART Goals",
      description: "Create goals that are Specific, Measurable, Achievable, Relevant, and Time-bound. This framework makes your objectives clearer and more attainable.",
      icon: <Check className="h-5 w-5 text-purple-500" />,
      color: "bg-purple-500"
    },
    {
      title: "Prioritize with ABC Method",
      description: "Label tasks A (must do), B (should do), and C (nice to do). Focus on completing A tasks before moving to B and C tasks.",
      icon: <List className="h-5 w-5 text-yellow-500" />,
      color: "bg-yellow-500"
    },
    {
      title: "Eliminate Distractions",
      description: "Identify what distracts you most (social media, television, texting) and create a study environment that minimizes these distractions.",
      icon: <Clock className="h-5 w-5 text-red-500" />,
      color: "bg-red-500"
    },
    {
      title: "Two-Minute Rule",
      description: "If a task takes less than two minutes to complete, do it immediately. This prevents small tasks from piling up and becoming overwhelming.",
      icon: <Timer className="h-5 w-5 text-teal-500" />,
      color: "bg-teal-500"
    },
    {
      title: "Batch Similar Tasks",
      description: "Group similar activities together. For example, answer all emails at once or complete all math problems in one sitting to maximize efficiency.",
      icon: <List className="h-5 w-5 text-indigo-500" />,
      color: "bg-indigo-500"
    },
    {
      title: "Schedule Buffer Time",
      description: "Always plan for tasks to take longer than expected. Add buffer time between activities to account for overruns and unexpected events.",
      icon: <Calendar className="h-5 w-5 text-pink-500" />,
      color: "bg-pink-500"
    },
    {
      title: "Learn to Say No",
      description: "It's okay to decline additional commitments when your schedule is full. Prioritize your well-being and existing responsibilities.",
      icon: <Check className="h-5 w-5 text-orange-500" />,
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-clockify-blue to-clockify-lightBlue py-12">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-[bounce_1s_ease-in-out]">
            Time Management Tips for Teens
          </h1>
          <p className="text-xl max-w-3xl mx-auto animate-[fadeIn_1.5s_ease-in-out]">
            Discover proven strategies to make the most of your time, boost productivity, and reduce stress.
          </p>
        </div>
      </section>
      
      {/* Tips Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timeManagementTips.map((tip, index) => (
              <div 
                key={index}
                ref={addToRefs}
                className={`transition-all duration-500 transform opacity-0 translate-y-10 delay-${index * 100} card-animation`} 
              >
                <TipCard 
                  title={tip.title}
                  description={tip.description}
                  icon={tip.icon}
                  color={tip.color}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Additional Resources */}
      <section className="py-12 bg-clockify-lightGray">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <h2 className="text-2xl font-bold mb-8 text-center animate-[bounce_1s_ease-in-out]">Additional Resources</h2>
          <div className="bg-white rounded-lg shadow-sm p-6 transition-all duration-500 transform hover:shadow-md">
            <h3 className="text-xl font-semibold mb-4">Recommended Books</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li className="transition-all duration-300 hover:text-clockify-blue hover:translate-x-1">Atomic Habits by James Clear</li>
              <li className="transition-all duration-300 hover:text-clockify-blue hover:translate-x-1">Deep Work by Cal Newport</li>
              <li className="transition-all duration-300 hover:text-clockify-blue hover:translate-x-1">The 7 Habits of Highly Effective Teens by Sean Covey</li>
              <li className="transition-all duration-300 hover:text-clockify-blue hover:translate-x-1">Getting Things Done for Teens by David Allen</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mt-6 transition-all duration-500 transform hover:shadow-md">
            <h3 className="text-xl font-semibold mb-4">Helpful Apps</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li className="transition-all duration-300 hover:text-clockify-blue hover:translate-x-1">Forest - Stay focused and plant virtual trees</li>
              <li className="transition-all duration-300 hover:text-clockify-blue hover:translate-x-1">Notion - All-in-one workspace for notes and tasks</li>
              <li className="transition-all duration-300 hover:text-clockify-blue hover:translate-x-1">Todoist - Simple and powerful task manager</li>
              <li className="transition-all duration-300 hover:text-clockify-blue hover:translate-x-1">Focus@Will - Music scientifically optimized for focus</li>
            </ul>
          </div>
        </div>
      </section>
      
      <Footer />

      <style jsx>{`
        .card-animation.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .delay-0 { transition-delay: 0ms; }
        .delay-100 { transition-delay: 100ms; }
        .delay-200 { transition-delay: 200ms; }
        .delay-300 { transition-delay: 300ms; }
        .delay-400 { transition-delay: 400ms; }
        .delay-500 { transition-delay: 500ms; }
        .delay-600 { transition-delay: 600ms; }
        .delay-700 { transition-delay: 700ms; }
        .delay-800 { transition-delay: 800ms; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
};

export default Tips;
