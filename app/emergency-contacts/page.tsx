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
import {
  Phone,
  Heart,
  Plus,
  Star,
  StarOff,
  Trash2,
  MessageCircle,
} from "lucide-react";

interface Contact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  address: string;
  isPrimary: boolean;
  notes: string;
}

export default function EmergencyContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newContact, setNewContact] = useState<Partial<Contact>>({});

  const addContact = () => {
    if (!newContact.name || !newContact.phone) return;

    const contact: Contact = {
      id: Math.random().toString(36).substring(7),
      name: newContact.name,
      phone: newContact.phone,
      relationship: newContact.relationship || "",
      address: newContact.address || "",
      isPrimary: false,
      notes: newContact.notes || "",
    };

    setContacts([...contacts, contact]);
    setNewContact({});
  };

  const togglePrimary = (id: string) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === id
          ? { ...contact, isPrimary: !contact.isPrimary }
          : contact
      )
    );
  };

  const deleteContact = (id: string) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  return (
    <div className="min-h-screen bg-background p-6 font-[var(--font-family)]">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-[var(--font-logo)] font-bold text-foreground">
              Emergency Contacts
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your emergency contacts and keep important information
              readily available
            </p>
          </div>
          <Heart className="w-10 h-10 text-primary" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-[var(--font-logo)]">
              Add New Contact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newContact.name || ""}
                    onChange={(e) =>
                      setNewContact({ ...newContact, name: e.target.value })
                    }
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={newContact.phone || ""}
                    onChange={(e) =>
                      setNewContact({ ...newContact, phone: e.target.value })
                    }
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div>
                  <Label htmlFor="relationship">Relationship</Label>
                  <Select
                    value={newContact.relationship}
                    onValueChange={(value) =>
                      setNewContact({ ...newContact, relationship: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="family">Family</SelectItem>
                      <SelectItem value="friend">Friend</SelectItem>
                      <SelectItem value="doctor">Doctor</SelectItem>
                      <SelectItem value="neighbor">Neighbor</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={newContact.address || ""}
                    onChange={(e) =>
                      setNewContact({ ...newContact, address: e.target.value })
                    }
                    placeholder="123 Main St, City, State"
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={newContact.notes || ""}
                    onChange={(e) =>
                      setNewContact({ ...newContact, notes: e.target.value })
                    }
                    placeholder="Medical conditions, special instructions, etc."
                  />
                </div>
                <Button
                  className="w-full mt-4"
                  onClick={addContact}
                  disabled={!newContact.name || !newContact.phone}
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Contact
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-[var(--font-logo)]">
              Your Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {contacts.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No emergency contacts added yet. Add your first contact
                    above.
                  </p>
                ) : (
                  contacts.map((contact) => (
                    <Card key={contact.id} className="relative">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="text-xl font-semibold">
                                {contact.name}
                              </h3>
                              {contact.isPrimary && (
                                <Badge variant="default" className="bg-primary">
                                  Primary
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-6 text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Phone className="w-4 h-4" />
                                {contact.phone}
                              </span>
                              {contact.relationship && (
                                <Badge variant="secondary">
                                  {contact.relationship}
                                </Badge>
                              )}
                            </div>
                            {contact.address && (
                              <p className="text-sm text-muted-foreground">
                                {contact.address}
                              </p>
                            )}
                            {contact.notes && (
                              <p className="text-sm text-muted-foreground mt-2">
                                {contact.notes}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => togglePrimary(contact.id)}
                            >
                              {contact.isPrimary ? (
                                <StarOff className="w-4 h-4" />
                              ) : (
                                <Star className="w-4 h-4" />
                              )}
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                window.location.href = `tel:${contact.phone}`;
                              }}
                            >
                              <Phone className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                window.location.href = `sms:${contact.phone}`;
                              }}
                            >
                              <MessageCircle className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => deleteContact(contact.id)}
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
      </div>
    </div>
  );
}
