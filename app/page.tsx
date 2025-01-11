"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity, Heart, Weight, Thermometer } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const healthData = [
  { date: "2024-03-01", value: 120 },
  { date: "2024-03-02", value: 118 },
  { date: "2024-03-03", value: 122 },
  { date: "2024-03-04", value: 119 },
  { date: "2024-03-05", value: 121 },
];

const upcomingAppointments = [
  { title: "Dr. Sarah Johnson - Cardiology", time: "2024-03-20 10:00 AM" },
  { title: "Dr. Michael Chen - General Checkup", time: "2024-03-22 2:30 PM" },
  { title: "Dr. Emily Wilson - Dental", time: "2024-03-25 11:15 AM" },
];

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Personal Health Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="p-6">
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-red-500" />
              <h3 className="text-sm font-medium text-muted-foreground">
                Heart Rate
              </h3>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-bold">
                72{" "}
                <span className="text-sm font-normal text-muted-foreground">
                  bpm
                </span>
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-blue-500" />
              <h3 className="text-sm font-medium text-muted-foreground">
                Blood Pressure
              </h3>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-bold">120/80</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <div className="flex items-center space-x-2">
              <Weight className="w-4 h-4 text-green-500" />
              <h3 className="text-sm font-medium text-muted-foreground">
                Weight
              </h3>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-bold">
                68{" "}
                <span className="text-sm font-normal text-muted-foreground">
                  kg
                </span>
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <div className="flex items-center space-x-2">
              <Thermometer className="w-4 h-4 text-orange-500" />
              <h3 className="text-sm font-medium text-muted-foreground">
                Temperature
              </h3>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-bold">
                36.6{" "}
                <span className="text-sm font-normal text-muted-foreground">
                  °C
                </span>
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Blood Pressure History
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={healthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>
        </div>
        <div>
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Health Goals Progress
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      Daily Steps
                    </span>
                    <span className="text-sm font-medium">8,500 / 10,000</span>
                  </div>
                  <Progress value={85} />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      Water Intake
                    </span>
                    <span className="text-sm font-medium">6 / 8 glasses</span>
                  </div>
                  <Progress value={75} />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Sleep</span>
                    <span className="text-sm font-medium">7 / 8 hours</span>
                  </div>
                  <Progress value={87.5} />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Upcoming Appointments
            </h3>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {upcomingAppointments.map((appointment, index) => (
                  <div key={index} className="border-b pb-4 last:border-0">
                    <h4 className="font-medium">{appointment.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {appointment.time}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Calendar</h3>
            <Calendar mode="single" className="rounded-md border" />
          </div>
        </Card>
      </div>
    </div>
  );
}
