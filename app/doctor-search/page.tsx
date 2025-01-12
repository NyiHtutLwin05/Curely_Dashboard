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
import { Slider } from "@/components/ui/slider";
import {
  Search,
  MapPin,
  Star,
  Calendar,
  Clock,
  Heart,
  Video,
  Languages,
  Shield,
  Filter,
  ChevronDown,
} from "lucide-react";

// Mock data
const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    photo:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&h=200&auto=format&fit=crop",
    specialization: "Cardiologist",
    experience: "15 years",
    location: "New York Medical Center",
    distance: "2.5 miles",
    rating: 4.8,
    reviews: 127,
    nextAvailable: "Today",
    fee: "$150",
    languages: ["English", "Spanish"],
    education: "Harvard Medical School",
    acceptingNew: true,
    insurance: ["Blue Cross", "Aetna", "UnitedHealth"],
    virtualVisits: true,
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    photo:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&h=200&auto=format&fit=crop",
    specialization: "Neurologist",
    experience: "12 years",
    location: "Metropolitan Neurology Center",
    distance: "3.8 miles",
    rating: 4.9,
    reviews: 95,
    nextAvailable: "Tomorrow",
    fee: "$180",
    languages: ["English", "Mandarin"],
    education: "Stanford Medical School",
    acceptingNew: true,
    insurance: ["Cigna", "Aetna"],
    virtualVisits: true,
  },
  {
    id: 3,
    name: "Dr. Emily Williams",
    photo:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=200&h=200&auto=format&fit=crop",
    specialization: "Pediatrician",
    experience: "8 years",
    location: "Children's Wellness Center",
    distance: "1.2 miles",
    rating: 4.7,
    reviews: 156,
    nextAvailable: "Next Week",
    fee: "$120",
    languages: ["English", "French"],
    education: "Johns Hopkins University",
    acceptingNew: true,
    insurance: ["UnitedHealth", "Blue Cross"],
    virtualVisits: false,
  },
];

const specializations = [
  "All Specialties",
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Dermatology",
  "Orthopedics",
  "Gynecology",
  "Ophthalmology",
];

const insurances = [
  "All Insurance",
  "Blue Cross",
  "Aetna",
  "UnitedHealth",
  "Cigna",
  "Medicare",
  "Medicaid",
];

export default function FindDoctorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [selectedInsurance, setSelectedInsurance] = useState("All Insurance");
  const [distance, setDistance] = useState([10]);
  const [virtualOnly, setVirtualOnly] = useState(false);

  return (
    <div className="min-h-screen bg-background p-6 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 font-[var(--font-logo)]">
            Find Doctors
          </h1>
          <p className="text-muted-foreground">
            Search for the best healthcare professionals near you
          </p>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search doctors, specialties..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select
            value={selectedSpecialty}
            onValueChange={setSelectedSpecialty}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select specialty" />
            </SelectTrigger>
            <SelectContent>
              {specializations.map((specialty) => (
                <SelectItem key={specialty} value={specialty}>
                  {specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={selectedInsurance}
            onValueChange={setSelectedInsurance}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select insurance" />
            </SelectTrigger>
            <SelectContent>
              {insurances.map((insurance) => (
                <SelectItem key={insurance} value={insurance}>
                  {insurance}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center gap-4">
            <Button
              variant={virtualOnly ? "default" : "outline"}
              onClick={() => setVirtualOnly(!virtualOnly)}
              className="flex items-center gap-2"
            >
              <Video className="h-4 w-4" />
              Virtual Visits
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Distance Slider */}
        <div className="mb-8">
          <label className="text-sm font-medium mb-2 block">
            Distance: {distance}mi
          </label>
          <Slider
            value={distance}
            onValueChange={setDistance}
            max={50}
            step={1}
            className="w-full md:w-1/2"
          />
        </div>

        {/* Doctors List */}
        <div className="space-y-6">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Doctor Photo and Basic Info */}
                <div className="md:w-1/4 p-6 flex flex-col items-center text-center border-r">
                  <div className="relative mb-4">
                    <img
                      src={doctor.photo}
                      alt={doctor.name}
                      className="w-32 h-32 rounded-full object-cover"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-0 right-0 text-muted-foreground hover:text-primary"
                    >
                      <Heart className="h-5 w-5" />
                    </Button>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{doctor.name}</h3>
                  <p className="text-muted-foreground mb-2">
                    {doctor.specialization}
                  </p>
                  <div className="flex items-center gap-1 text-yellow-500 mb-2">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-medium">{doctor.rating}</span>
                    <span className="text-muted-foreground">
                      ({doctor.reviews})
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {doctor.experience} experience
                  </p>
                </div>

                {/* Details */}
                <div className="md:w-2/4 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-start gap-2 mb-3">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                        <div>
                          <p className="font-medium">{doctor.location}</p>
                          <p className="text-sm text-muted-foreground">
                            {doctor.distance}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 mb-3">
                        <Calendar className="h-4 w-4 text-muted-foreground mt-1" />
                        <div>
                          <p className="font-medium">Next Available</p>
                          <p className="text-sm text-muted-foreground">
                            {doctor.nextAvailable}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-start gap-2 mb-3">
                        <Languages className="h-4 w-4 text-muted-foreground mt-1" />
                        <div>
                          <p className="font-medium">Languages</p>
                          <p className="text-sm text-muted-foreground">
                            {doctor.languages.join(", ")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Shield className="h-4 w-4 text-muted-foreground mt-1" />
                        <div>
                          <p className="font-medium">Insurance</p>
                          <p className="text-sm text-muted-foreground">
                            {doctor.insurance.join(", ")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="md:w-1/4 p-6 bg-muted/20 flex flex-col justify-between">
                  <div>
                    <p className="text-lg font-semibold mb-1">{doctor.fee}</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      per visit
                    </p>
                    {doctor.virtualVisits && (
                      <Badge className="mb-4">
                        <Video className="h-3 w-3 mr-1" />
                        Virtual visits available
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full">Book Appointment</Button>
                    <Button variant="outline" className="w-full">
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
