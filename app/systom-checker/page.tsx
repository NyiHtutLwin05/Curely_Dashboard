"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  AlertCircle,
  Brain,
  Heart,
  Mic,
  Search,
  Send,
  Stethoscope,
  ThermometerSun,
  User,
} from "lucide-react";

interface Symptom {
  id: string;
  name: string;
  severity: "mild" | "moderate" | "severe";
  duration: string;
}

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [currentSymptom, setCurrentSymptom] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const commonSymptoms = [
    "Headache",
    "Fever",
    "Cough",
    "Fatigue",
    "Nausea",
    "Dizziness",
  ];

  const addSymptom = (symptom: string) => {
    if (!symptom) return;
    const newSymptom: Symptom = {
      id: Math.random().toString(),
      name: symptom,
      severity: "mild",
      duration: "Just started",
    };
    setSymptoms([...symptoms, newSymptom]);
    setCurrentSymptom("");
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "mild":
        return "bg-yellow-100 text-yellow-800";
      case "moderate":
        return "bg-orange-100 text-orange-800";
      case "severe":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Stethoscope className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-primary">Symptom Checker</h1>
        </div>
        <Button variant="outline" className="gap-2">
          <AlertCircle className="w-4 h-4" />
          Emergency Help
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Describe Your Symptoms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Type your symptoms..."
                  value={currentSymptom}
                  onChange={(e) => setCurrentSymptom(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && addSymptom(currentSymptom)
                  }
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsRecording(!isRecording)}
                  className={isRecording ? "text-red-500" : ""}
                >
                  <Mic className="w-4 h-4" />
                </Button>
                <Button onClick={() => addSymptom(currentSymptom)}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              <ScrollArea className="h-32 rounded-md border p-4">
                <div className="flex flex-wrap gap-2">
                  {commonSymptoms.map((symptom) => (
                    <Badge
                      key={symptom}
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      onClick={() => addSymptom(symptom)}
                    >
                      {symptom}
                    </Badge>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Symptom Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="list" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="list">List View</TabsTrigger>
                  <TabsTrigger value="body">Body Map</TabsTrigger>
                  <TabsTrigger value="chat">AI Chat</TabsTrigger>
                </TabsList>

                <TabsContent value="list" className="space-y-4">
                  {symptoms.map((symptom) => (
                    <div
                      key={symptom.id}
                      className="flex items-center justify-between p-4 rounded-lg border"
                    >
                      <div className="flex items-center gap-3">
                        <ThermometerSun className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium">{symptom.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {symptom.duration}
                          </p>
                        </div>
                      </div>
                      <Badge className={getSeverityColor(symptom.severity)}>
                        {symptom.severity}
                      </Badge>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="body">
                  <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">
                      Interactive body map coming soon
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="chat">
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-sm">
                        AI Assistant is analyzing your symptoms...
                      </p>
                    </div>
                    <Textarea
                      placeholder="Ask a question about your symptoms..."
                      className="resize-none"
                    />
                    <Button className="w-full">Send Message</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Age</Label>
                <Input type="number" placeholder="Enter your age" />
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <Input placeholder="Enter your gender" />
              </div>
              <div className="space-y-2">
                <Label>Medical History</Label>
                <Textarea placeholder="Any relevant medical history..." />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Vital Signs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Heart Rate</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span>75 bpm</span>
                  </div>
                </div>
                <div>
                  <Label>Temperature</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <ThermometerSun className="w-4 h-4 text-yellow-500" />
                    <span>98.6°F</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                AI Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Add symptoms to receive an AI-powered preliminary assessment
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
