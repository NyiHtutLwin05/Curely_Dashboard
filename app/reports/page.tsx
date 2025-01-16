"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Search,
  Upload,
  Download,
  Calendar,
  Filter,
  Share2,
  Plus,
  FileBarChart,
  Microscope,
  Stethoscope,
  Heart,
  Activity,
  Dna,
  Syringe,
  Pill,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data
const labResults = [
  {
    id: "1",
    name: "Complete Blood Count (CBC)",
    date: "2024-01-15",
    category: "Blood Test",
    doctor: "Dr. Sarah Johnson",
    status: "Normal",
    facility: "Central Lab",
    urgent: false,
  },
  {
    id: "2",
    name: "Lipid Panel",
    date: "2024-01-10",
    category: "Blood Test",
    doctor: "Dr. Michael Chen",
    status: "Attention Needed",
    facility: "HealthCare Lab",
    urgent: true,
  },
  {
    id: "3",
    name: "Chest X-Ray",
    date: "2023-12-20",
    category: "Imaging",
    doctor: "Dr. Emily Williams",
    status: "Normal",
    facility: "City Hospital",
    urgent: false,
  },
];

const categories = [
  { value: "all", label: "All Reports" },
  { value: "blood", label: "Blood Tests" },
  { value: "imaging", label: "Imaging" },
  { value: "pathology", label: "Pathology" },
  { value: "cardiology", label: "Cardiology" },
];

const healthMetrics = [
  {
    name: "Blood Pressure",
    value: "120/80 mmHg",
    date: "2024-01-18",
    status: "normal",
  },
  {
    name: "Blood Sugar",
    value: "95 mg/dL",
    date: "2024-01-18",
    status: "normal",
  },
  {
    name: "Cholesterol",
    value: "190 mg/dL",
    date: "2024-01-10",
    status: "attention",
  },
  {
    name: "Heart Rate",
    value: "72 bpm",
    date: "2024-01-18",
    status: "normal",
  },
];

export default function MedicalReportsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div className="min-h-screen bg-background p-6 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2 font-[var(--font-logo)]">
              Medical Reports
            </h1>
            <p className="text-muted-foreground">
              View and manage your health records and lab results
            </p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Report
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Medical Report</DialogTitle>
                  <DialogDescription>
                    Upload medical reports, lab results, or health documents
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Input type="file" accept=".pdf,.jpg,.png" />
                  </div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </DialogContent>
            </Dialog>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Results
            </Button>
          </div>
        </div>

        {/* Health Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {healthMetrics.map((metric, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  {metric.name === "Blood Pressure" && (
                    <Heart className="h-5 w-5 text-primary" />
                  )}
                  {metric.name === "Blood Sugar" && (
                    <Activity className="h-5 w-5 text-primary" />
                  )}
                  {metric.name === "Cholesterol" && (
                    <FileBarChart className="h-5 w-5 text-primary" />
                  )}
                  {metric.name === "Heart Rate" && (
                    <Activity className="h-5 w-5 text-primary" />
                  )}
                  <Badge
                    variant={
                      metric.status === "normal" ? "outline" : "destructive"
                    }
                    className="text-xs"
                  >
                    {metric.status}
                  </Badge>
                </div>
                <h3 className="font-semibold text-lg mb-1">{metric.value}</h3>
                <p className="text-sm text-muted-foreground">{metric.name}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Last updated: {metric.date}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reports..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Reports
            </Button>
          </div>
        </div>

        {/* Reports List */}
        <Card>
          <CardHeader>
            <CardTitle>Lab Results & Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Test Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Facility</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {labResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {result.urgent && (
                          <Badge
                            variant="destructive"
                            className="h-1.5 w-1.5 rounded-full p-0"
                          />
                        )}
                        {result.name}
                      </div>
                    </TableCell>
                    <TableCell>{result.date}</TableCell>
                    <TableCell>{result.category}</TableCell>
                    <TableCell>{result.doctor}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          result.status === "Normal" ? "outline" : "destructive"
                        }
                      >
                        {result.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{result.facility}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
