"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CreditCard,
  Wallet,
  Building,
  Shield,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  Lock,
  CreditCard as CardIcon,
  Smartphone,
  Ban as Bank,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data
const savedCards = [
  {
    id: 1,
    type: "visa",
    last4: "4242",
    expiry: "12/24",
    name: "John Doe",
  },
  {
    id: 2,
    type: "mastercard",
    last4: "8888",
    expiry: "09/25",
    name: "John Doe",
  },
];

const paymentBreakdown = {
  subtotal: 150.0,
  tax: 13.5,
  discount: -20.0,
  total: 143.5,
};

export default function PaymentPage() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // Handle success/error state
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 font-[var(--font-logo)]">
            Payment
          </h1>
          <p className="text-muted-foreground">
            Complete your payment securely
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Payment Methods */}
          <div className="md:col-span-2 space-y-6">
            <Tabs defaultValue="card" className="w-full">
              <TabsList className="grid grid-cols-3 gap-4 mb-6">
                <TabsTrigger value="card" className="flex items-center gap-2">
                  <CardIcon className="h-4 w-4" />
                  Card
                </TabsTrigger>
                <TabsTrigger value="wallet" className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  Mobile Wallet
                </TabsTrigger>
                <TabsTrigger value="bank" className="flex items-center gap-2">
                  <Bank className="h-4 w-4" />
                  Bank Transfer
                </TabsTrigger>
              </TabsList>

              <TabsContent value="card">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                      Payment Card
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Saved Cards */}
                    {savedCards.length > 0 && (
                      <div className="space-y-4">
                        <Label>Saved Cards</Label>
                        <div className="space-y-2">
                          {savedCards.map((card) => (
                            <div
                              key={card.id}
                              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                                selectedCard === card.id
                                  ? "border-primary bg-primary/5"
                                  : "hover:border-primary/50"
                              }`}
                              onClick={() => setSelectedCard(card.id)}>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-md flex items-center justify-center text-primary-foreground">
                                    {card.type === "visa" ? "VISA" : "MC"}
                                  </div>
                                  <div>
                                    <p className="font-medium">
                                      •••• {card.last4}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      Expires {card.expiry}
                                    </p>
                                  </div>
                                </div>
                                {selectedCard === card.id && (
                                  <CheckCircle2 className="h-5 w-5 text-primary" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* New Card Form */}
                    <div className="space-y-4">
                      <Label>Add New Card</Label>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            className="mt-1"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              type="password"
                              maxLength={4}
                              placeholder="123"
                              className="mt-1"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="name">Name on Card</Label>
                          <Input
                            id="name"
                            placeholder="John Doe"
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="wallet">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Wallet className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        Mobile Wallet
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Pay using your preferred mobile wallet
                      </p>
                      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                        <Button variant="outline" className="h-16">
                          Apple Pay
                        </Button>
                        <Button variant="outline" className="h-16">
                          Google Pay
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bank">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Building className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        Bank Transfer
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Pay directly from your bank account
                      </p>
                      <Select>
                        <SelectTrigger className="w-full max-w-sm">
                          <SelectValue placeholder="Select your bank" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="chase">Chase Bank</SelectItem>
                          <SelectItem value="boa">Bank of America</SelectItem>
                          <SelectItem value="wells">Wells Fargo</SelectItem>
                          <SelectItem value="citi">Citibank</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Promo Code */}
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <Input
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button variant="outline">Apply</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${paymentBreakdown.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${paymentBreakdown.tax.toFixed(2)}</span>
                  </div>
                  {paymentBreakdown.discount !== 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>${paymentBreakdown.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${paymentBreakdown.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handlePayment}
                  disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Pay ${paymentBreakdown.total.toFixed(2)}
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Lock className="h-4 w-4" />
                  Secure payment
                </div>
              </CardContent>
            </Card>

            {/* Security Badges */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-2">
                  <Shield className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-semibold">Secure Payment</h3>
                  <p className="text-sm text-muted-foreground">
                    Your payment information is encrypted and secure
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Badge variant="secondary">SSL Secure</Badge>
                    <Badge variant="secondary">PCI Compliant</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
