"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pill,
  Clock,
  Calendar,
  Bell,
  Camera,
  AlertTriangle,
  RefreshCcw,
  Users,
  History,
  Watch,
  FileText,
  Share2,
  Moon,
  Globe,
  Plus,
  Check,
  X,
  Edit,
  Trash2,
} from "lucide-react";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  startDate: string;
  endDate: string;
  times: string[];
  instructions: string;
  photoUrl?: string;
  profileId: string;
  notes: string;
  refillDate: string;
  refillReminder: boolean;
  language: string;
}

interface Profile {
  id: string;
  name: string;
  relationship: string;
}

export default function MedicationReminders() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [newMedication, setNewMedication] = useState<Partial<Medication>>({});
  const [profiles, setProfiles] = useState<Profile[]>([
    { id: "1", name: "Me", relationship: "self" },
  ]);
  const [selectedProfile, setSelectedProfile] = useState<string>("1");
  const [activeTab, setActiveTab] = useState("add");
  const [darkMode, setDarkMode] = useState(false);

  const frequencies = [
    "Daily",
    "Twice Daily",
    "Three Times Daily",
    "Weekly",
    "As Needed",
  ];

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
  ];

  const addMedication = () => {
    if (!newMedication.name || !newMedication.dosage) return;

    const medication: Medication = {
      id: Math.random().toString(36).substring(7),
      name: newMedication.name,
      dosage: newMedication.dosage,
      frequency: newMedication.frequency || "Daily",
      duration: newMedication.duration || "",
      startDate:
        newMedication.startDate || new Date().toISOString().split("T")[0],
      endDate: newMedication.endDate || "",
      times: newMedication.times || ["09:00"],
      instructions: newMedication.instructions || "",
      photoUrl: newMedication.photoUrl,
      profileId: selectedProfile,
      notes: newMedication.notes || "",
      refillDate: newMedication.refillDate || "",
      refillReminder: true,
      language: newMedication.language || "en",
    };

    setMedications([...medications, medication]);
    setNewMedication({});
    setActiveTab("list");
  };

  const deleteMedication = (id: string) => {
    setMedications(medications.filter((med) => med.id !== id));
  };

  const addProfile = () => {
    const newProfile: Profile = {
      id: Math.random().toString(36).substring(7),
      name: "New Profile",
      relationship: "family",
    };
    setProfiles([...profiles, newProfile]);
  };

  return (
    <div
      className={`min-h-screen bg-background p-6 font-[var(--font-family)] ${
        darkMode ? "dark" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-[var(--font-logo)] font-bold text-foreground">
              Medication Reminders
            </h1>
            <p className="text-muted-foreground mt-2">
              Track and manage medications for you and your loved ones
            </p>
          </div>
          <div className="flex gap-4">
            {/* <Button
              variant="outline"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
            >
              <Moon className="w-5 h-5" />
            </Button> */}
            <Select value={selectedProfile} onValueChange={setSelectedProfile}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select profile" />
              </SelectTrigger>
              <SelectContent>
                {profiles.map((profile) => (
                  <SelectItem key={profile.id} value={profile.id}>
                    {profile.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={addProfile}>
              <Users className="w-4 h-4 mr-2" /> Add Profile
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="add">Add Medication</TabsTrigger>
            <TabsTrigger value="list">Medication List</TabsTrigger>
          </TabsList>

          <TabsContent value="add">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-[var(--font-logo)]">
                  Add New Medication
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Medication Name</Label>
                      <Input
                        id="name"
                        value={newMedication.name || ""}
                        onChange={(e) =>
                          setNewMedication({
                            ...newMedication,
                            name: e.target.value,
                          })
                        }
                        placeholder="Enter medication name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dosage">Dosage</Label>
                      <Input
                        id="dosage"
                        value={newMedication.dosage || ""}
                        onChange={(e) =>
                          setNewMedication({
                            ...newMedication,
                            dosage: e.target.value,
                          })
                        }
                        placeholder="e.g., 50mg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="frequency">Frequency</Label>
                      <Select
                        value={newMedication.frequency}
                        onValueChange={(value) =>
                          setNewMedication({
                            ...newMedication,
                            frequency: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          {frequencies.map((freq) => (
                            <SelectItem key={freq} value={freq.toLowerCase()}>
                              {freq}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={newMedication.startDate || ""}
                        onChange={(e) =>
                          setNewMedication({
                            ...newMedication,
                            startDate: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={newMedication.endDate || ""}
                        onChange={(e) =>
                          setNewMedication({
                            ...newMedication,
                            endDate: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="instructions">Instructions</Label>
                      <Textarea
                        id="instructions"
                        value={newMedication.instructions || ""}
                        onChange={(e) =>
                          setNewMedication({
                            ...newMedication,
                            instructions: e.target.value,
                          })
                        }
                        placeholder="Special instructions or notes"
                      />
                    </div>
                    <div>
                      <Label htmlFor="refillDate">Refill Date</Label>
                      <Input
                        id="refillDate"
                        type="date"
                        value={newMedication.refillDate || ""}
                        onChange={(e) =>
                          setNewMedication({
                            ...newMedication,
                            refillDate: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="photo">Medication Photo</Label>
                      <div className="mt-2">
                        <Button variant="outline">
                          <Camera className="w-4 h-4 mr-2" /> Add Photo
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="language">Language</Label>
                      <Select
                        value={newMedication.language}
                        onValueChange={(value) =>
                          setNewMedication({
                            ...newMedication,
                            language: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.map((lang) => (
                            <SelectItem key={lang.code} value={lang.code}>
                              {lang.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      className="w-full mt-6"
                      onClick={addMedication}
                      disabled={!newMedication.name || !newMedication.dosage}
                    >
                      <Plus className="w-4 h-4 mr-2" /> Add Medication
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="list">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-[var(--font-logo)]">
                  Your Medications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-4">
                    {medications.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">
                        No medications added yet. Add your first medication in
                        the Add tab.
                      </p>
                    ) : (
                      medications
                        .filter((med) => med.profileId === selectedProfile)
                        .map((medication) => (
                          <Card key={medication.id} className="relative">
                            <CardContent className="pt-6">
                              <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <h3 className="text-xl font-semibold">
                                      {medication.name}
                                    </h3>
                                    <Badge variant="secondary">
                                      {medication.dosage}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-4 text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-4 h-4" />
                                      {medication.frequency}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Calendar className="w-4 h-4" />
                                      {medication.startDate}
                                    </span>
                                  </div>
                                  {medication.instructions && (
                                    <p className="text-sm text-muted-foreground mt-2">
                                      {medication.instructions}
                                    </p>
                                  )}
                                  {medication.refillDate && (
                                    <div className="flex items-center gap-2 mt-2">
                                      <RefreshCcw className="w-4 h-4 text-warning" />
                                      <span className="text-sm text-warning">
                                        Refill needed by {medication.refillDate}
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="icon">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button variant="outline" size="icon">
                                    <Share2 className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="icon"
                                    onClick={() =>
                                      deleteMedication(medication.id)
                                    }
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
