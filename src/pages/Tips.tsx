import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TipCard from "@/components/TipCard";
import { BookOpen, Calendar, CheckCircle, Clock, Lightbulb, ListChecks, LucideIcon, Sparkles, Star, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";

interface Tip {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  color?: string;
}

const Tips = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);
  }, []);

  const tips: Tip[] = [
    {
      id: 1,
      title: "Prioritize Tasks",
      description: "Identify your most important tasks and focus on those first. Use methods like the Eisenhower Matrix to differentiate between urgent and important tasks.",
      icon: Star,
      color: "bg-clockify-blue"
    },
    {
      id: 2,
      title: "Use a Planner",
      description: "Keep track of your commitments, deadlines, and appointments in a physical or digital planner. Regularly review and update it.",
      icon: Calendar,
      color: "bg-clockify-lightBlue"
    },
    {
      id: 3,
      title: "Time Blocking",
      description: "Allocate specific blocks of time for certain activities. This helps you stay focused and ensures you dedicate enough time to each task.",
      icon: Clock,
      color: "bg-clockify-blue"
    },
    {
      id: 4,
      title: "Break Down Large Tasks",
      description: "Divide big projects into smaller, manageable steps. This makes the overall task less daunting and easier to start.",
      icon: ListChecks,
      color: "bg-clockify-lightBlue"
    },
    {
      id: 5,
      title: "Eliminate Distractions",
      description: "Minimize interruptions by turning off notifications, finding a quiet workspace, and informing others when you need uninterrupted time.",
      icon: Lightbulb,
      color: "bg-clockify-blue"
    },
    {
      id: 6,
      title: "Set Realistic Goals",
      description: "Ensure your goals are achievable and align with your available time and resources. Avoid overcommitting yourself.",
      icon: CheckCircle,
      color: "bg-clockify-lightBlue"
    },
    {
      id: 7,
      title: "Take Regular Breaks",
      description: "Schedule short breaks to rest and recharge. This can improve focus and prevent burnout.",
      icon: Sparkles,
      color: "bg-clockify-blue"
    },
    {
      id: 8,
      title: "Learn to Say No",
      description: "Politely decline additional commitments when you're already at capacity. Protect your time and energy.",
      icon: UserCheck,
      color: "bg-clockify-lightBlue"
    },
    {
      id: 9,
      title: "Reflect and Adjust",
      description: "Regularly assess your time management strategies and make adjustments as needed. What works for one person may not work for another.",
      icon: BookOpen,
      color: "bg-clockify-blue"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Add the CSS animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        .fade-in {
          opacity: 0;
          animation: fadeIn 0.5s ease-out forwards;
        }
        .slide-in-left {
          opacity: 0;
          transform: translateX(-50px);
          animation: slideInLeft 0.5s ease-out forwards;
        }
        .bounce {
          animation: bounce 1s ease-in-out;
        }
        .scale-in {
          opacity: 0;
          transform: scale(0.95);
          animation: scaleIn 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        @keyframes slideInLeft {
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-20px); }
          60% { transform: translateY(-10px); }
        }
        @keyframes scaleIn {
          to { opacity: 1; transform: scale(1); }
        }
      `}} />
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-clockify-blue to-clockify-lightBlue py-12">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white ${isLoaded ? 'fade-in' : 'opacity-0'}`}>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bounce">
            Time Management Tips for Teens
          </h1>
          <p className="text-xl max-w-3xl mx-auto slide-in-left">
            Simple strategies to help you take control of your time and achieve your goals.
          </p>
        </div>
      </section>
      
      {/* Tips Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tips.map((tip, index) => (
              <div 
                key={tip.id} 
                className={`${isLoaded ? 'scale-in' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <TipCard 
                  title={tip.title} 
                  description={tip.description} 
                  icon={<tip.icon className="h-6 w-6" />} 
                  color={tip.color}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Tips;
