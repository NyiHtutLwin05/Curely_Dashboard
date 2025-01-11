"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Pill,
  Search,
  Plus,
  Download,
  Upload,
  Calendar,
  Clock,
  User,
  Building2,
  AlertCircle,
  Filter,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data
const prescriptions = [
  {
    id: "1",
    medication: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    prescribed: "2024-01-15",
    refillDate: "2024-02-15",
    status: "Active",
    doctor: "Dr. Michael Chen",
    pharmacy: "HealthCare Pharmacy",
    instructions: "Take with meals",
    remainingRefills: 3,
  },
  {
    id: "2",
    medication: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    prescribed: "2024-01-10",
    refillDate: "2024-02-10",
    status: "Active",
    doctor: "Dr. Sarah Smith",
    pharmacy: "MedPlus Pharmacy",
    instructions: "Take in the morning",
    remainingRefills: 2,
  },
  {
    id: "3",
    medication: "Amoxicillin",
    dosage: "250mg",
    frequency: "Three times daily",
    prescribed: "2023-12-01",
    refillDate: "2023-12-14",
    status: "Completed",
    doctor: "Dr. James Wilson",
    pharmacy: "Central Pharmacy",
    instructions: "Take until completed",
    remainingRefills: 0,
  },
];

export default function PrescriptionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPrescriptions = prescriptions.filter((prescription) => {
    const matchesSearch =
      prescription.medication
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      prescription.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.pharmacy.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      prescription.status.toLowerCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background p-6 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2 font-[var(--font-logo)]">
              Prescriptions
            </h1>
            <p className="text-muted-foreground">
              Manage and track your medications
            </p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Prescription
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Prescription</DialogTitle>
                  <DialogDescription>
                    Upload a prescription image or document
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 gap-2">
                    <Input type="file" accept="image/*,.pdf" />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Prescription
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search prescriptions..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prescriptions</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export List
            </Button>
          </div>
        </div>

        {/* Prescriptions List */}
        <div className="space-y-6">
          {filteredPrescriptions.map((prescription) => (
            <Card key={prescription.id} className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Pill className="h-5 w-5 text-primary" />
                  {prescription.medication}
                </CardTitle>
                <div className="flex items-center gap-4">
                  <Badge
                    variant={
                      prescription.status === "Active" ? "default" : "secondary"
                    }
                  >
                    {prescription.status}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Prescription</DropdownMenuItem>
                      <DropdownMenuItem>Download PDF</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      Dosage & Frequency
                    </div>
                    <p className="font-medium">
                      {prescription.dosage} - {prescription.frequency}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {prescription.instructions}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Dates
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm">
                        Prescribed:{" "}
                        <span className="font-medium">
                          {prescription.prescribed}
                        </span>
                      </p>
                      <p className="text-sm">
                        Next Refill:{" "}
                        <span className="font-medium">
                          {prescription.refillDate}
                        </span>
                      </p>
                      <p className="text-sm">
                        Remaining Refills:{" "}
                        <span className="font-medium">
                          {prescription.remainingRefills}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <User className="h-4 w-4" />
                        Prescribed By
                      </div>
                      <p className="font-medium">{prescription.doctor}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        Pharmacy
                      </div>
                      <p className="font-medium">{prescription.pharmacy}</p>
                    </div>
                  </div>
                </div>

                {prescription.status === "Active" &&
                  prescription.remainingRefills <= 1 && (
                    <div className="mt-4 flex items-center gap-2 text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm">Refill needed soon</span>
                    </div>
                  )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
