
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScheduleCard, { ScheduleItem } from "@/components/ScheduleCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

interface Schedule {
  id: number;
  title: string;
  description: string;
  scheduleItems: ScheduleItem[];
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

const Schedules = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Set isLoaded to true after a short delay to trigger animations
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);
  }, []);
  
  const schedules: Schedule[] = [
    {
      id: 1,
      title: "Balanced School Day",
      description: "A well-rounded schedule for balancing academics, extracurriculars, and rest.",
      category: "School",
      difficulty: "Medium",
      scheduleItems: [
        { time: "6:30 AM", activity: "Wake up and morning routine" },
        { time: "7:00 AM", activity: "Breakfast" },
        { time: "7:30 AM", activity: "Travel to school" },
        { time: "8:00 AM", activity: "School" },
        { time: "3:00 PM", activity: "After-school activity/club" },
        { time: "4:30 PM", activity: "Travel home" },
        { time: "5:00 PM", activity: "Relaxation/free time" },
        { time: "6:00 PM", activity: "Dinner" },
        { time: "7:00 PM", activity: "Homework" },
        { time: "9:00 PM", activity: "Wind down time" },
        { time: "10:00 PM", activity: "Sleep" }
      ]
    },
    {
      id: 2,
      title: "Weekend Study Plan",
      description: "Maximize your weekend study time while still having fun.",
      category: "Study",
      difficulty: "Easy",
      scheduleItems: [
        { time: "8:00 AM", activity: "Wake up and breakfast" },
        { time: "9:00 AM", activity: "Study Session 1 (Most challenging subject)" },
        { time: "10:30 AM", activity: "Break - physical activity" },
        { time: "11:00 AM", activity: "Study Session 2" },
        { time: "12:30 PM", activity: "Lunch" },
        { time: "1:30 PM", activity: "Study Session 3" },
        { time: "3:00 PM", activity: "Free time/social activities" },
        { time: "6:00 PM", activity: "Dinner" },
        { time: "7:00 PM", activity: "Light review" },
        { time: "8:00 PM", activity: "Relaxation time" },
        { time: "10:30 PM", activity: "Sleep" }
      ]
    },
    {
      id: 3,
      title: "Exam Preparation Week",
      description: "Intensive study schedule for the week leading up to final exams.",
      category: "Study",
      difficulty: "Hard",
      scheduleItems: [
        { time: "6:00 AM", activity: "Wake up, light exercise" },
        { time: "6:30 AM", activity: "Shower and breakfast" },
        { time: "7:00 AM", activity: "Review notes from previous day" },
        { time: "8:00 AM", activity: "Study Session 1 (Subject 1)" },
        { time: "10:00 AM", activity: "Break - walk outside" },
        { time: "10:15 AM", activity: "Study Session 2 (Subject 2)" },
        { time: "12:15 PM", activity: "Lunch and rest" },
        { time: "1:00 PM", activity: "Study Session 3 (Subject 3)" },
        { time: "3:00 PM", activity: "Break - snack and stretching" },
        { time: "3:15 PM", activity: "Study Session 4 (Subject 4)" },
        { time: "5:15 PM", activity: "Dinner" },
        { time: "6:00 PM", activity: "Review challenging concepts" },
        { time: "7:30 PM", activity: "Light physical activity" },
        { time: "8:00 PM", activity: "Prepare materials for next day" },
        { time: "8:30 PM", activity: "Relaxation time" },
        { time: "9:30 PM", activity: "Sleep" }
      ]
    },
    {
      id: 4,
      title: "Sports and Academics",
      description: "Balancing competitive sports with school requirements.",
      category: "Sports",
      difficulty: "Medium",
      scheduleItems: [
        { time: "5:30 AM", activity: "Wake up, morning training" },
        { time: "7:00 AM", activity: "Shower and breakfast" },
        { time: "7:45 AM", activity: "Travel to school" },
        { time: "8:15 AM", activity: "School" },
        { time: "3:15 PM", activity: "Team practice" },
        { time: "5:30 PM", activity: "Travel home" },
        { time: "6:00 PM", activity: "Dinner and rest" },
        { time: "7:00 PM", activity: "Homework" },
        { time: "9:00 PM", activity: "Prepare gear for next day" },
        { time: "9:30 PM", activity: "Wind down" },
        { time: "10:00 PM", activity: "Sleep" }
      ]
    },
    {
      id: 5,
      title: "Creative Arts Focus",
      description: "For students balancing academics with artistic pursuits.",
      category: "Arts",
      difficulty: "Easy",
      scheduleItems: [
        { time: "7:00 AM", activity: "Wake up and breakfast" },
        { time: "8:00 AM", activity: "School" },
        { time: "3:00 PM", activity: "Snack and short break" },
        { time: "3:30 PM", activity: "Creative practice (art, music, etc.)" },
        { time: "5:30 PM", activity: "Dinner" },
        { time: "6:30 PM", activity: "Homework" },
        { time: "8:30 PM", activity: "More creative time" },
        { time: "9:30 PM", activity: "Wind down" },
        { time: "10:30 PM", activity: "Sleep" }
      ]
    },
    {
      id: 6,
      title: "Part-Time Job Balance",
      description: "Managing school with part-time work responsibilities.",
      category: "Work",
      difficulty: "Hard",
      scheduleItems: [
        { time: "6:30 AM", activity: "Wake up and breakfast" },
        { time: "7:30 AM", activity: "School" },
        { time: "2:30 PM", activity: "Travel to work" },
        { time: "3:00 PM", activity: "Part-time job" },
        { time: "7:00 PM", activity: "Travel home" },
        { time: "7:30 PM", activity: "Dinner" },
        { time: "8:00 PM", activity: "Homework" },
        { time: "10:00 PM", activity: "Relaxation" },
        { time: "10:30 PM", activity: "Sleep" }
      ]
    }
  ];

  const filteredSchedules = schedules.filter(schedule => 
    schedule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    schedule.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    schedule.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = ["All", ...new Set(schedules.map(schedule => schedule.category))];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Add CSS for animations */}
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
        
        .hover-scale {
          transition: transform 0.3s ease;
        }
        
        .hover-scale:hover {
          transform: scale(1.05);
        }
      `}} />
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-clockify-blue to-clockify-lightBlue py-12">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white ${isLoaded ? 'fade-in' : 'opacity-0'}`}>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bounce">
            Ready-Made Schedules
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Browse our collection of schedules designed for teens. Find one that matches your needs or customize it to make it your own.
          </p>
        </div>
      </section>
      
      {/* Search Section */}
      <section className="py-8 bg-white">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isLoaded ? 'slide-in-left' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search schedules..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="bg-clockify-blue hover:bg-clockify-darkBlue bounce hover:scale-105 transition-transform">
              Create New Schedule
            </Button>
          </div>
        </div>
      </section>
      
      {/* Schedules Section */}
      <section className="py-8 bg-clockify-lightGray flex-grow">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isLoaded ? 'scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
          <Tabs defaultValue="All">
            <TabsList className="mb-8">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="hover-scale">{category}</TabsTrigger>
              ))}
            </TabsList>
            
            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSchedules
                    .filter(schedule => category === "All" || schedule.category === category)
                    .map((schedule, index) => (
                      <div 
                        key={schedule.id} 
                        className={`${isLoaded ? 'scale-in hover-scale' : 'opacity-0'}`} 
                        style={{ animationDelay: `${0.5 + (index * 0.1)}s` }}
                      >
                        <ScheduleCard
                          title={schedule.title}
                          description={schedule.description}
                          scheduleItems={schedule.scheduleItems}
                          category={schedule.category}
                          difficulty={schedule.difficulty}
                        />
                      </div>
                    ))}
                </div>
                
                {filteredSchedules.filter(schedule => category === "All" || schedule.category === category).length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-lg text-gray-500">No schedules found. Try a different search.</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Schedules;
