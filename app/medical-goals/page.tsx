"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Plus,
  Target,
  Trophy,
  Activity,
  Brain,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Goal {
  id: string;
  title: string;
  category: string;
  deadline: Date;
  progress: number;
  description: string;
}

export default function HealthGoals() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "Weight Loss Goal",
      category: "fitness",
      deadline: new Date(2024, 5, 1),
      progress: 65,
      description: "Lose 10 pounds through regular exercise and diet",
    },
    {
      id: "2",
      title: "Meditation Practice",
      category: "mental",
      deadline: new Date(2024, 4, 15),
      progress: 30,
      description: "Meditate for 10 minutes daily",
    },
  ]);

  const [date, setDate] = useState<Date>();
  const [newGoal, setNewGoal] = useState({
    title: "",
    category: "",
    description: "",
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "fitness":
        return <Activity className="w-4 h-4" />;
      case "mental":
        return <Brain className="w-4 h-4" />;
      case "nutrition":
        return <Heart className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.category || !date) return;

    const goal: Goal = {
      id: Math.random().toString(),
      title: newGoal.title,
      category: newGoal.category,
      deadline: date,
      progress: 0,
      description: newGoal.description,
    };

    setGoals([...goals, goal]);
    setNewGoal({ title: "", category: "", description: "" });
    setDate(undefined);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-primary">Health Goals</h1>
        <div className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-primary" />
          <span className="text-lg font-semibold">
            Total Goals: {goals.length}
          </span>
        </div>
      </div>

      <Tabs defaultValue="current" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="current">Current Goals</TabsTrigger>
          <TabsTrigger value="add">Add New Goal</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          {goals.map((goal) => (
            <Card key={goal.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  {getCategoryIcon(goal.category)}
                  {goal.title}
                </CardTitle>
                <span className="text-sm text-muted-foreground">
                  Due: {format(goal.deadline, "PPP")}
                </span>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {goal.description}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {goal.progress}%
                    </span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Create New Health Goal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Goal Title</Label>
                <Input
                  id="title"
                  placeholder="Enter your goal title"
                  value={newGoal.title}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, title: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newGoal.category}
                  onValueChange={(value) =>
                    setNewGoal({ ...newGoal, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fitness">Fitness</SelectItem>
                    <SelectItem value="nutrition">Nutrition</SelectItem>
                    <SelectItem value="mental">Mental Health</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Deadline</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Describe your goal"
                  value={newGoal.description}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, description: e.target.value })
                  }
                />
              </div>

              <Button className="w-full" onClick={handleAddGoal}>
                <Plus className="w-4 h-4 mr-2" />
                Add Goal
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
