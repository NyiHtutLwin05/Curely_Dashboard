"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Video,
  MessageCircle,
  Phone,
  Calendar,
  Clock,
  User,
  FileText,
  Shield,
  Bell,
  Wifi,
  Mic,
  Camera,
  Settings,
  MessageSquare,
} from "lucide-react";

// Mock data
const upcomingConsultations = [
  {
    id: 1,
    doctor: {
      name: "Dr. Sarah Johnson",
      photo:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&h=200&auto=format&fit=crop",
      specialization: "Cardiologist",
    },
    date: "2024-01-20",
    time: "10:00 AM",
    type: "video",
    status: "upcoming",
    duration: "30 min",
  },
  {
    id: 2,
    doctor: {
      name: "Dr. Michael Chen",
      photo:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&h=200&auto=format&fit=crop",
      specialization: "Neurologist",
    },
    date: "2024-01-22",
    time: "2:30 PM",
    type: "audio",
    status: "upcoming",
    duration: "20 min",
  },
];

const pastConsultations = [
  {
    id: 3,
    doctor: {
      name: "Dr. Emily Williams",
      photo:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=200&h=200&auto=format&fit=crop",
      specialization: "Pediatrician",
    },
    date: "2024-01-15",
    time: "11:00 AM",
    type: "video",
    status: "completed",
    duration: "30 min",
    prescription: true,
    followUp: "2024-02-15",
  },
];

export default function TelemedicinePage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [isInConsultation, setIsInConsultation] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {!isInConsultation ? (
        <div className="p-6 md:p-8 lg:p-12 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2 font-[var(--font-logo)]">
              Virtual Care
            </h1>
            <p className="text-muted-foreground">
              Connect with healthcare professionals from anywhere
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6">
                <Button variant="secondary" className="w-full mb-4">
                  <Video className="h-4 w-4 mr-2" />
                  Start New Consultation
                </Button>
                <p className="text-sm opacity-90">
                  Connect with a doctor within minutes
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Button variant="outline" className="w-full mb-4">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message Your Doctor
                </Button>
                <p className="text-sm text-muted-foreground">
                  Send a secure message to your healthcare provider
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Button variant="outline" className="w-full mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Consultation
                </Button>
                <p className="text-sm text-muted-foreground">
                  Book a future appointment
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Consultations Tabs */}
          <Tabs defaultValue="upcoming" className="space-y-6">
            <TabsList>
              <TabsTrigger value="upcoming" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Upcoming
              </TabsTrigger>
              <TabsTrigger value="past" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Past
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              <div className="space-y-4">
                {upcomingConsultations.map((consultation) => (
                  <Card key={consultation.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="md:w-1/4 p-6 flex items-center gap-4 border-r">
                        <img
                          src={consultation.doctor.photo}
                          alt={consultation.doctor.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold">
                            {consultation.doctor.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {consultation.doctor.specialization}
                          </p>
                        </div>
                      </div>
                      <div className="md:w-2/4 p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{consultation.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{consultation.time}</span>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className="flex items-center gap-2"
                        >
                          {consultation.type === "video" ? (
                            <Video className="h-3 w-3" />
                          ) : (
                            <Phone className="h-3 w-3" />
                          )}
                          {consultation.duration}
                        </Badge>
                      </div>
                      <div className="md:w-1/4 p-6 bg-muted/20">
                        <Button
                          className="w-full mb-2"
                          onClick={() => setIsInConsultation(true)}
                        >
                          Join Now
                        </Button>
                        <Button variant="outline" className="w-full">
                          Reschedule
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="past">
              <div className="space-y-4">
                {pastConsultations.map((consultation) => (
                  <Card key={consultation.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="md:w-1/4 p-6 flex items-center gap-4 border-r">
                        <img
                          src={consultation.doctor.photo}
                          alt={consultation.doctor.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold">
                            {consultation.doctor.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {consultation.doctor.specialization}
                          </p>
                        </div>
                      </div>
                      <div className="md:w-2/4 p-6">
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{consultation.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{consultation.time}</span>
                          </div>
                          {consultation.prescription && (
                            <Badge variant="secondary">
                              <FileText className="h-3 w-3 mr-1" />
                              Prescription Available
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="md:w-1/4 p-6 bg-muted/20">
                        <Button variant="outline" className="w-full mb-2">
                          View Summary
                        </Button>
                        <Button variant="secondary" className="w-full">
                          Book Follow-up
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        // Virtual Consultation Room
        <div className="h-screen flex flex-col">
          {/* Header */}
          <div className="bg-card border-b p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="animate-pulse">
                  Live Consultation
                </Badge>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>00:15:32</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setIsInConsultation(false)}
                >
                  End Call
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 grid grid-cols-4 gap-4 p-4 bg-background">
            {/* Video Area */}
            <div className="col-span-3 bg-card rounded-lg p-4 relative">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <Video className="h-16 w-16 text-muted-foreground" />
              </div>
              <div className="absolute bottom-8 right-8 w-48 h-36 bg-background rounded-lg shadow-lg">
                <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
                  <User className="h-8 w-8 text-muted-foreground" />
                </div>
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full h-12 w-12"
                >
                  <Mic className="h-5 w-5" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full h-12 w-12"
                >
                  <Camera className="h-5 w-5" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  className="rounded-full h-12 w-12"
                >
                  <Phone className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">
                    Connection Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm">
                    <Wifi className="h-4 w-4 text-green-500" />
                    <span>Excellent</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Chat</CardTitle>
                </CardHeader>
                <CardContent className="h-[calc(100vh-400px)] flex flex-col">
                  <div className="flex-1 space-y-4">
                    <div className="flex gap-2">
                      <Badge variant="secondary">Dr. Johnson</Badge>
                      <p className="text-sm">
                        Hello! How can I help you today?
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button className="flex-1">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
