
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
    // Preload content before showing animations
    document.body.style.opacity = '1';
    
    // Set isLoaded to true immediately on mount
    setIsLoaded(true);
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
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
      {/* Add CSS for unique schedule animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        .schedule-fade-in {
          opacity: 0;
          animation: scheduleFadeIn 0.7s ease-out forwards;
        }
        
        .schedule-slide-from-top {
          opacity: 0;
          transform: translateY(-30px);
          animation: scheduleSlideFromTop 0.6s ease-out forwards;
        }
        
        .schedule-rotate-in {
          opacity: 0;
          transform: rotateX(-10deg);
          animation: scheduleRotateIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .schedule-zoom-in {
          opacity: 0;
          transform: scale(0.9);
          animation: scheduleZoomIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        
        @keyframes scheduleFadeIn {
          to { opacity: 1; }
        }
        
        @keyframes scheduleSlideFromTop {
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scheduleRotateIn {
          to { opacity: 1; transform: rotateX(0); }
        }
        
        @keyframes scheduleZoomIn {
          to { opacity: 1; transform: scale(1); }
        }
        
        .hover-grow {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .hover-grow:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
      `}} />
      
      <Navbar />
      
      {/* Hero Section with unique animation */}
      <section className="bg-gradient-to-r from-clockify-blue to-clockify-lightBlue py-12">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white ${isLoaded ? 'schedule-fade-in' : 'opacity-0'}`}>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 schedule-rotate-in" style={{animationDelay: '0.1s'}}>
            Ready-Made Schedules
          </h1>
          <p className="text-xl max-w-3xl mx-auto schedule-slide-from-top" style={{animationDelay: '0.3s'}}>
            Browse our collection of schedules designed for teens. Find one that matches your needs or customize it to make it your own.
          </p>
        </div>
      </section>
      
      {/* Search Section */}
      <section className="py-8 bg-white">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isLoaded ? 'schedule-slide-from-top' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
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
            <Button className="bg-clockify-blue hover:bg-clockify-darkBlue schedule-rotate-in hover:scale-105 transition-transform" style={{animationDelay: '0.7s'}}>
              Create New Schedule
            </Button>
          </div>
        </div>
      </section>
      
      {/* Schedules Section */}
      <section className="py-8 bg-clockify-lightGray flex-grow">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isLoaded ? 'schedule-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.9s' }}>
          <Tabs defaultValue="All">
            <TabsList className="mb-8 schedule-zoom-in" style={{animationDelay: '1.1s'}}>
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="hover-grow">{category}</TabsTrigger>
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
                        className={`${isLoaded ? 'schedule-zoom-in hover-grow' : 'opacity-0'}`} 
                        style={{ animationDelay: `${1.3 + (index * 0.1)}s` }}
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
