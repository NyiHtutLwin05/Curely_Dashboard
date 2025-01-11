"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Activity,
  FileText,
  User,
  Pill,
  Calendar,
  Syringe,
  AlertCircle,
  Phone,
  Download,
  Search,
  Plus,
  HeartPulse,
  Stethoscope,
  ClipboardList,
} from "lucide-react";

// Mock data
const patientInfo = {
  name: "Sarah Johnson",
  dob: "1985-03-15",
  bloodType: "O+",
  height: "5'6\"",
  weight: "140 lbs",
  bmi: "22.6",
};

const conditions = [
  { name: "Type 2 Diabetes", diagnosed: "2018-05-12", status: "Managed" },
  { name: "Hypertension", diagnosed: "2019-02-23", status: "Active" },
];

const medications = [
  {
    name: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    startDate: "2018-05-15",
  },
  {
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    startDate: "2019-02-25",
  },
];

const visits = [
  {
    date: "2023-12-15",
    doctor: "Dr. Michael Chen",
    type: "Regular Checkup",
    notes: "Blood pressure stable. Continue current medication.",
  },
  {
    date: "2023-10-02",
    doctor: "Dr. Sarah Smith",
    type: "Diabetes Follow-up",
    notes: "HbA1c improved. Maintain diet and exercise routine.",
  },
];

const allergies = ["Penicillin", "Latex", "Shellfish"];

const vaccinations = [
  { name: "COVID-19", date: "2023-09-15", dueDate: "2024-09-15" },
  { name: "Flu Shot", date: "2023-10-01", dueDate: "2024-10-01" },
  { name: "Tetanus", date: "2020-05-20", dueDate: "2030-05-20" },
];

const emergencyContacts = [
  { name: "John Johnson", relation: "Spouse", phone: "(555) 123-4567" },
  { name: "Mary Johnson", relation: "Daughter", phone: "(555) 987-6543" },
];

export default function MedicalHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-background p-6 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2 font-[var(--font-logo)]">
              Medical History
            </h1>
            <p className="text-muted-foreground">
              Complete health record and medical information
            </p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Records
            </Button>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Record
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search medical records..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Patient Overview Card */}
          <Card className="md:col-span-1 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Patient Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium">{patientInfo.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Date of Birth</span>
                  <span className="font-medium">{patientInfo.dob}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Blood Type</span>
                  <Badge variant="outline">{patientInfo.bloodType}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Height</span>
                  <span className="font-medium">{patientInfo.height}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Weight</span>
                  <span className="font-medium">{patientInfo.weight}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">BMI</span>
                  <span className="font-medium">{patientInfo.bmi}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Area */}
          <div className="md:col-span-2">
            <Tabs defaultValue="conditions" className="w-full">
              <TabsList className="grid grid-cols-4 gap-4 mb-4">
                <TabsTrigger
                  value="conditions"
                  className="flex items-center gap-2"
                >
                  <HeartPulse className="h-4 w-4" />
                  <span className="hidden md:inline">Conditions</span>
                </TabsTrigger>
                <TabsTrigger
                  value="medications"
                  className="flex items-center gap-2"
                >
                  <Pill className="h-4 w-4" />
                  <span className="hidden md:inline">Medications</span>
                </TabsTrigger>
                <TabsTrigger value="visits" className="flex items-center gap-2">
                  <Stethoscope className="h-4 w-4" />
                  <span className="hidden md:inline">Visits</span>
                </TabsTrigger>
                <TabsTrigger value="other" className="flex items-center gap-2">
                  <ClipboardList className="h-4 w-4" />
                  <span className="hidden md:inline">Other</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="conditions">
                <Card>
                  <CardHeader>
                    <CardTitle>Medical Conditions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Condition</TableHead>
                          <TableHead>Diagnosed</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {conditions.map((condition, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {condition.name}
                            </TableCell>
                            <TableCell>{condition.diagnosed}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  condition.status === "Active"
                                    ? "destructive"
                                    : "outline"
                                }
                              >
                                {condition.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="medications">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Medications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Medication</TableHead>
                          <TableHead>Dosage</TableHead>
                          <TableHead>Frequency</TableHead>
                          <TableHead>Started</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {medications.map((medication, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {medication.name}
                            </TableCell>
                            <TableCell>{medication.dosage}</TableCell>
                            <TableCell>{medication.frequency}</TableCell>
                            <TableCell>{medication.startDate}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="visits">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Visits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Doctor</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Notes</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {visits.map((visit, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {visit.date}
                            </TableCell>
                            <TableCell>{visit.doctor}</TableCell>
                            <TableCell>{visit.type}</TableCell>
                            <TableCell className="max-w-[200px] truncate">
                              {visit.notes}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="other">
                <div className="grid grid-cols-1 gap-6">
                  {/* Allergies */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-destructive" />
                        Allergies
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {allergies.map((allergy, index) => (
                          <Badge key={index} variant="destructive">
                            {allergy}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Vaccinations */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Syringe className="h-5 w-5 text-primary" />
                        Vaccinations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Vaccine</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Next Due</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {vaccinations.map((vaccination, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">
                                {vaccination.name}
                              </TableCell>
                              <TableCell>{vaccination.date}</TableCell>
                              <TableCell>{vaccination.dueDate}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  {/* Emergency Contacts */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Phone className="h-5 w-5 text-primary" />
                        Emergency Contacts
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Relation</TableHead>
                            <TableHead>Phone</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {emergencyContacts.map((contact, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">
                                {contact.name}
                              </TableCell>
                              <TableCell>{contact.relation}</TableCell>
                              <TableCell>{contact.phone}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
