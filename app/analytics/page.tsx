"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Activity,
  Heart,
  Weight,
  TrendingUp,
  Calendar,
  Download,
  Filter,
  Share2,
  Plus,
  ArrowUp,
  ArrowDown,
  Target,
  Dumbbell,
  Utensils,
  Moon,
  Droplets,
} from "lucide-react";

// Mock data
const weightData = [
  { date: "Jan", value: 70 },
  { date: "Feb", value: 69 },
  { date: "Mar", value: 68.5 },
  { date: "Apr", value: 68 },
  { date: "May", value: 67.5 },
  { date: "Jun", value: 67 },
];

const bloodPressureData = [
  { date: "Jan", systolic: 120, diastolic: 80 },
  { date: "Feb", systolic: 118, diastolic: 79 },
  { date: "Mar", systolic: 122, diastolic: 82 },
  { date: "Apr", systolic: 119, diastolic: 80 },
  { date: "May", systolic: 121, diastolic: 81 },
  { date: "Jun", systolic: 118, diastolic: 78 },
];

const activityData = [
  { date: "Mon", steps: 8000, calories: 2200, sleep: 7.5 },
  { date: "Tue", steps: 10000, calories: 2400, sleep: 8 },
  { date: "Wed", steps: 7500, calories: 2100, sleep: 6.5 },
  { date: "Thu", steps: 9000, calories: 2300, sleep: 7 },
  { date: "Fri", steps: 11000, calories: 2500, sleep: 8 },
  { date: "Sat", steps: 6000, calories: 2000, sleep: 9 },
  { date: "Sun", steps: 5000, calories: 1900, sleep: 8.5 },
];

const healthScoreData = [
  { name: "Physical", value: 85 },
  { name: "Mental", value: 75 },
  { name: "Nutrition", value: 70 },
  { name: "Sleep", value: 80 },
];

const COLORS = ["#FF8042", "#00C49F", "#FFBB28", "#0088FE"];

const metrics = [
  {
    title: "Daily Steps",
    value: "9,847",
    change: "+12%",
    trend: "up",
    icon: Activity,
  },
  {
    title: "Blood Pressure",
    value: "120/80",
    change: "-2%",
    trend: "down",
    icon: Heart,
  },
  {
    title: "Weight",
    value: "67 kg",
    change: "-0.5kg",
    trend: "down",
    icon: Weight,
  },
  {
    title: "Health Score",
    value: "85/100",
    change: "+5",
    trend: "up",
    icon: Target,
  },
];

const timeRanges = [
  { value: "7d", label: "7 Days" },
  { value: "1m", label: "1 Month" },
  { value: "3m", label: "3 Months" },
  { value: "6m", label: "6 Months" },
  { value: "1y", label: "1 Year" },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("1m");

  return (
    <div className="min-h-screen bg-background p-6 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2 font-[var(--font-logo)]">
              Health Analytics
            </h1>
            <p className="text-muted-foreground">
              Track and analyze your health metrics
            </p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                {timeRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Measurement
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <metric.icon className="h-5 w-5 text-primary" />
                  <Badge
                    variant={metric.trend === "up" ? "default" : "secondary"}
                    className="flex items-center gap-1"
                  >
                    {metric.trend === "up" ? (
                      <ArrowUp className="h-3 w-3" />
                    ) : (
                      <ArrowDown className="h-3 w-3" />
                    )}
                    {metric.change}
                  </Badge>
                </div>
                <h3 className="font-semibold text-lg mb-1">{metric.value}</h3>
                <p className="text-sm text-muted-foreground">{metric.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Weight Trend */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Weight className="h-5 w-5 text-primary" />
                Weight Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weightData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      name="Weight (kg)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Blood Pressure */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Blood Pressure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={bloodPressureData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="systolic"
                      stroke="hsl(var(--destructive))"
                      name="Systolic"
                    />
                    <Line
                      type="monotone"
                      dataKey="diastolic"
                      stroke="hsl(var(--primary))"
                      name="Diastolic"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Activity Overview */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Activity Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar
                      yAxisId="left"
                      dataKey="steps"
                      fill="hsl(var(--primary))"
                      name="Steps"
                    />
                    <Bar
                      yAxisId="right"
                      dataKey="calories"
                      fill="hsl(var(--destructive))"
                      name="Calories"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Health Score */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Health Score Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={healthScoreData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {healthScoreData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Daily Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Health Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Dumbbell className="h-4 w-4" />
                  Physical Activity
                </div>
                <div className="space-y-1">
                  <p className="text-sm">
                    Steps: <span className="font-medium">9,847</span>
                  </p>
                  <p className="text-sm">
                    Distance: <span className="font-medium">6.2 km</span>
                  </p>
                  <p className="text-sm">
                    Active Minutes: <span className="font-medium">45 min</span>
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Utensils className="h-4 w-4" />
                  Nutrition
                </div>
                <div className="space-y-1">
                  <p className="text-sm">
                    Calories: <span className="font-medium">2,100</span>
                  </p>
                  <p className="text-sm">
                    Protein: <span className="font-medium">75g</span>
                  </p>
                  <p className="text-sm">
                    Water: <span className="font-medium">2.5L</span>
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Moon className="h-4 w-4" />
                  Sleep
                </div>
                <div className="space-y-1">
                  <p className="text-sm">
                    Duration: <span className="font-medium">7h 30m</span>
                  </p>
                  <p className="text-sm">
                    Quality: <span className="font-medium">85%</span>
                  </p>
                  <p className="text-sm">
                    Deep Sleep: <span className="font-medium">2h 15m</span>
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Heart className="h-4 w-4" />
                  Vitals
                </div>
                <div className="space-y-1">
                  <p className="text-sm">
                    Heart Rate: <span className="font-medium">72 bpm</span>
                  </p>
                  <p className="text-sm">
                    Blood Pressure: <span className="font-medium">120/80</span>
                  </p>
                  <p className="text-sm">
                    SpO2: <span className="font-medium">98%</span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
