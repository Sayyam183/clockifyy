
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScheduleCard, { ScheduleItem } from "@/components/ScheduleCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Save } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

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
  const [schedules, setSchedules] = useState<Schedule[]>([
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
  ]);
  
  const [newSchedule, setNewSchedule] = useState<Schedule>({
    id: Date.now(),
    title: "",
    description: "",
    category: "Study",
    difficulty: "Medium",
    scheduleItems: [
      { time: "8:00 AM", activity: "Wake up" },
      { time: "9:00 AM", activity: "Start activity" }
    ]
  });
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  useEffect(() => {
    document.body.style.opacity = '1';
    setIsLoaded(true);
    window.scrollTo(0, 0);
  }, []);
  
  const handleCreateSchedule = () => {
    if (!newSchedule.title.trim()) {
      toast.error("Please add a title for your schedule");
      return;
    }
    
    if (!newSchedule.description.trim()) {
      toast.error("Please add a description for your schedule");
      return;
    }
    
    if (newSchedule.scheduleItems.length < 2) {
      toast.error("Please add at least two activities to your schedule");
      return;
    }
    
    // Check if any time or activity is empty
    const hasEmptyFields = newSchedule.scheduleItems.some(
      item => !item.time.trim() || !item.activity.trim()
    );
    
    if (hasEmptyFields) {
      toast.error("Please complete all time and activity fields");
      return;
    }
    
    setSchedules(prevSchedules => [
      {
        ...newSchedule,
        id: Date.now()
      },
      ...prevSchedules
    ]);
    
    // Reset the form after successful creation
    setNewSchedule({
      id: Date.now(),
      title: "",
      description: "",
      category: "Study",
      difficulty: "Medium",
      scheduleItems: [
        { time: "8:00 AM", activity: "Wake up" },
        { time: "9:00 AM", activity: "Start activity" }
      ]
    });
    
    setIsCreateDialogOpen(false);
    
    toast.success("New schedule created successfully!");
  };
  
  const addNewTimeSlot = () => {
    setNewSchedule(prev => ({
      ...prev,
      scheduleItems: [
        ...prev.scheduleItems,
        { time: "", activity: "" }
      ]
    }));
  };
  
  const updateTimeSlot = (index: number, field: 'time' | 'activity', value: string) => {
    setNewSchedule(prev => {
      const updatedItems = [...prev.scheduleItems];
      updatedItems[index] = { 
        ...updatedItems[index], 
        [field]: value 
      };
      
      return {
        ...prev,
        scheduleItems: updatedItems
      };
    });
  };
  
  const removeTimeSlot = (index: number) => {
    if (newSchedule.scheduleItems.length <= 2) {
      toast.error("A schedule needs at least two activities");
      return;
    }
    
    setNewSchedule(prev => ({
      ...prev,
      scheduleItems: prev.scheduleItems.filter((_, i) => i !== index)
    }));
  };

  const filteredSchedules = schedules.filter(schedule => 
    schedule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    schedule.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    schedule.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = ["All", ...new Set(schedules.map(schedule => schedule.category))];

  return (
    <div className="min-h-screen flex flex-col">
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
            
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-clockify-blue hover:bg-clockify-darkBlue schedule-rotate-in hover:scale-105 transition-transform" style={{animationDelay: '0.7s'}}>
                  <Plus className="mr-1" /> Create New Schedule
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Schedule</DialogTitle>
                  <DialogDescription>
                    Fill in the details below to create your custom schedule.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Schedule Title</Label>
                    <Input 
                      id="title" 
                      placeholder="E.g., Morning Study Routine" 
                      value={newSchedule.title}
                      onChange={(e) => setNewSchedule({...newSchedule, title: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Describe what this schedule is for..." 
                      value={newSchedule.description}
                      onChange={(e) => setNewSchedule({...newSchedule, description: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select 
                        value={newSchedule.category}
                        onValueChange={(value) => setNewSchedule({...newSchedule, category: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Study">Study</SelectItem>
                          <SelectItem value="School">School</SelectItem>
                          <SelectItem value="Sports">Sports</SelectItem>
                          <SelectItem value="Arts">Arts</SelectItem>
                          <SelectItem value="Work">Work</SelectItem>
                          <SelectItem value="Personal">Personal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="difficulty">Difficulty</Label>
                      <Select 
                        value={newSchedule.difficulty}
                        onValueChange={(value: "Easy" | "Medium" | "Hard") => setNewSchedule({...newSchedule, difficulty: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Easy">Easy</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label>Schedule Activities</Label>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={addNewTimeSlot}
                        className="flex items-center gap-1"
                        type="button"
                      >
                        <Plus className="h-4 w-4" /> Add Activity
                      </Button>
                    </div>
                    
                    <div className="space-y-3 max-h-[30vh] overflow-y-auto p-2">
                      {newSchedule.scheduleItems.map((item, index) => (
                        <div key={index} className="flex gap-3 items-center">
                          <Input 
                            placeholder="Time" 
                            className="w-1/3"
                            value={item.time}
                            onChange={(e) => updateTimeSlot(index, 'time', e.target.value)}
                          />
                          <Input 
                            placeholder="Activity" 
                            className="flex-1"
                            value={item.activity}
                            onChange={(e) => updateTimeSlot(index, 'activity', e.target.value)}
                          />
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => removeTimeSlot(index)}
                            type="button"
                          >
                            ✕
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-clockify-blue hover:bg-clockify-darkBlue"
                    onClick={handleCreateSchedule}
                    type="button"
                  >
                    <Save className="mr-2 h-4 w-4" /> Create Schedule
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>
      
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
