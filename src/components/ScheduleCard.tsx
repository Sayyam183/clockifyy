
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export interface ScheduleItem {
  time: string;
  activity: string;
}

export interface ScheduleCardProps {
  title: string;
  description: string;
  scheduleItems: ScheduleItem[];
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

const ScheduleCard = ({ title, description, scheduleItems, category, difficulty }: ScheduleCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSchedule, setEditedSchedule] = useState<ScheduleItem[]>(scheduleItems);

  const handleActivityChange = (index: number, newActivity: string) => {
    const updatedSchedule = [...editedSchedule];
    updatedSchedule[index] = { ...updatedSchedule[index], activity: newActivity };
    setEditedSchedule(updatedSchedule);
  };

  const handleSaveChanges = () => {
    // In a real app, you would save these changes to a backend
    setIsEditing(false);
  };

  const getDifficultyColor = () => {
    switch (difficulty) {
      case "Easy": return "bg-green-500";
      case "Medium": return "bg-yellow-500";
      case "Hard": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="flex items-center justify-between p-4 bg-clockify-lightGray">
        <div className="flex items-center gap-2">
          <div className={`h-3 w-3 rounded-full ${getDifficultyColor()}`}></div>
          <span className="text-sm font-medium">{difficulty}</span>
        </div>
        <span className="text-sm text-gray-500">{category}</span>
      </div>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-clockify-blue" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">View Schedule</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              {isEditing ? (
                <div className="space-y-4">
                  {editedSchedule.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="font-medium min-w-[80px]">{item.time}</span>
                      <input
                        type="text"
                        value={item.activity}
                        onChange={(e) => handleActivityChange(index, e.target.value)}
                        className="flex-1 p-2 border rounded-md"
                      />
                    </div>
                  ))}
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="space-y-4">
                    {scheduleItems.map((item, index) => (
                      <div key={index} className="flex items-start gap-2 py-2 border-b last:border-0">
                        <Clock className="h-4 w-4 text-clockify-blue mt-1" />
                        <span className="font-medium min-w-[80px]">{item.time}</span>
                        <span>{item.activity}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4" onClick={() => setIsEditing(true)}>
                    Edit Schedule
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
      <CardFooter className="bg-clockify-lightGray justify-between">
        <span className="text-sm">{scheduleItems.length} activities</span>
        <Button variant="ghost" size="sm" className="text-clockify-blue hover:text-clockify-darkBlue">
          Use This Schedule
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ScheduleCard;
