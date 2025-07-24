import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  CreditCard, 
  Smartphone, 
  Shield, 
  Clock, 
  CheckCircle,
  ArrowLeft,
  DollarSign,
  Receipt,
  IdCard,
  Eye,
  User
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { memberStorage } from "@/lib/utils";
import splmLogo from "@/assets/splm-uganda-logo.png";
import flagLogo from "@/assets/flag-logo.png";
import logo from "@/assets/logo.png";

const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [processing, setProcessing] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [memberData, setMemberData] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Load member data from storage
  useEffect(() => {
    const currentMember = memberStorage.getCurrentMember();
    if (!currentMember) {
      toast({
        title: "No Registration Found",
        description: "Please complete registration first",
        variant: "destructive"
      });
      navigate('/register');
      return;
    }
    setMemberData(currentMember);
  }, [navigate, toast]);

  const paymentMethods = [
    {
      id: "mobile-money",
      name: "Mobile Money",
      description: "Pay with MTN Mobile Money, Airtel Money, or other mobile payment services",
      icon: Smartphone,
      providers: ["MTN Mobile Money", "Airtel Money", "M-Sente", "Centenary Mobile"]
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      description: "Pay securely with Visa, MasterCard, or other major cards",
      icon: CreditCard,
      providers: ["Visa", "MasterCard", "American Express"]
    },
    {
      id: "paypal",
      name: "PayPal",
      description: "Pay with your PayPal account for international transactions",
      icon: DollarSign,
      providers: ["PayPal Account", "PayPal Credit"]
    },
    {
      id: "bank-transfer",
      name: "Bank Transfer",
      description: "Direct bank transfer to SPLM Uganda Chapter account",
      icon: Receipt,
      providers: ["Local Bank Transfer", "Swift Transfer"]
    }
  ];

  const handlePayment = async () => {
    if (!selectedMethod) {
      toast({
        title: "Payment Method Required",
        description: "Please select a payment method to continue",
        variant: "destructive"
      });
      return;
    }

    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Update member payment status
      const updatedMemberData = {
        ...memberData,
        paymentStatus: 'completed',
        paymentDate: new Date().toISOString(),
        paymentMethod: selectedMethod
      };
      
      memberStorage.save(memberData.memberId, updatedMemberData);
      setMemberData(updatedMemberData);
      setPaymentCompleted(true);
      
      toast({
        title: "Payment Successful!",
        description: "Your membership has been activated. Your ID preview is now available below.",
      });
      setProcessing(false);
    }, 3000);
  };

  const selectedPaymentMethod = paymentMethods.find(method => method.id === selectedMethod);

    // ID Preview Component
  const IDPreview = ({ memberData }: { memberData: any }) => (
    <Card className="shadow-2xl border-gray-300 mb-8">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3 text-center justify-center">
          <IdCard className="w-5 h-5 text-primary" />
          Membership ID Preview
        </CardTitle>
        <div className="text-center">
          <Badge variant="outline" className="bg-red-50 border-red-200 text-red-700">
            <Eye className="w-3 h-3 mr-1" />
            UNOFFICIAL VIEW ONLY
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <div className="w-[400px] h-[250px] bg-white border-2 border-gray-400 rounded-lg overflow-hidden relative shadow-lg">
            {/* Header with Logos */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-1.5 px-2 flex flex-col items-center relative">
              {/* Corner Logos */}
              <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
                <img src={logo} alt="SPLM Logo" className="w-12 h-12 object-contain filter brightness-0 invert" />
              </div>
              <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                <img src={logo} alt="SPLM Logo" className="w-12 h-12 object-contain filter brightness-0 invert" />
              </div>
              
              {/* Center Content */}
              <div className="flex flex-col items-center space-y-0.5">
                {/* Flag at top */}
                <img src={flagLogo} alt="SPLM Flag" className="w-10 h-6 object-contain" />
                
                {/* Text below flag */}
                <div className="text-center">
                  <h3 className="font-bold text-xs leading-tight">SPLM UGANDA CHAPTER</h3>
                  <p className="text-xs opacity-90 leading-none">Member Identification Card</p>
                </div>
              </div>
            </div>

            {/* Main Content - Two Column Layout */}
            <div className="p-3 bg-gray-50 grid grid-cols-3 gap-4 h-full">
              {/* Left Column - Photo */}
              <div className="col-span-1 flex justify-center">
                <div className="w-24 h-28 bg-red-600 rounded border-2 border-red-700 overflow-hidden">
                  {memberData.photo ? (
                    <img 
                      src={memberData.photo} 
                      alt={`${memberData.surname} ${memberData.otherNames}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-red-600 flex items-center justify-center">
                      <User className="w-8 h-8 text-white" />
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Member Details */}
              <div className="col-span-2 space-y-0.5 text-black pt-1">
                {/* Name */}
                <div className="">
                  <div className="text-[10px] text-gray-600 font-semibold leading-tight">Name:</div>
                  <h4 className="font-bold text-xs leading-tight text-black">
                    {memberData.surname?.toUpperCase()} {memberData.otherNames?.toUpperCase()}
                  </h4>
                </div>
                {/* Member ID */}
                <div className="">
                  <span className="text-[10px] text-gray-600 font-semibold leading-tight">Member ID:</span>
                  <span className="ml-1 font-mono text-red-700 font-bold text-xs leading-tight">{memberData.memberId}</span>
                </div>
                {/* Two-column details */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-[10px] mt-1">
                  <div>
                    <span className="text-gray-600 font-semibold">Sex:</span>
                    <span className="ml-1 capitalize">{memberData.sex}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 font-semibold">Profession:</span>
                    <span className="ml-1">{memberData.occupation}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 font-semibold">DOB:</span>
                    <span className="ml-1">{memberData.dateOfBirth}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 font-semibold">DOJ:</span>
                    <span className="ml-1">{memberData.dateOfJoiningSplm}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 font-semibold">DOI:</span>
                    <span className="ml-1">{new Date().toLocaleDateString('en-GB')}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 font-semibold">EXP:</span>
                    <span className="ml-1">{new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB')}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 font-semibold">Status:</span>
                    <span className="ml-1 font-bold text-green-700 uppercase">{memberData.membershipCategory}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 bg-red-600 text-white text-center py-1">
              <p className="text-xs font-semibold">SPLM -Uganda Chapter Chairperson</p>
            </div>

            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-red-200 text-6xl font-bold transform rotate-45 opacity-20 select-none">
                PREVIEW
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p className="font-semibold text-red-600 mb-2">⚠️ This is an unofficial preview only</p>
          <p>Your official membership ID card will be available for collection from our Kampala office.</p>
          <p>You will be contacted with pickup instructions within 5-7 business days.</p>
        </div>
      </CardContent>
    </Card>
  );

  if (!memberData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Clock className="w-16 h-16 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading member information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {paymentCompleted ? (
                <>Membership <span className="text-primary">Activated!</span></>
              ) : (
                <>Complete Your <span className="text-primary">Payment</span></>
              )}
            </h1>
            <p className="text-xl text-muted-foreground">
              {paymentCompleted 
                ? "Your SPLM Uganda Chapter membership is now active"
                : "Secure payment processing for your SPLM Uganda Chapter membership"
              }
            </p>
          </div>

          {/* Show ID Preview after payment completion */}
          {paymentCompleted && <IDPreview memberData={memberData} />}

          {!paymentCompleted && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Payment Methods */}
              <div className="lg:col-span-2">
                <Card className="shadow-xl border-primary/10">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-primary" />
                      Payment Methods
                    </CardTitle>
                  </CardHeader>
                <CardContent className="space-y-4">
                  {paymentMethods.map((method) => {
                    const IconComponent = method.icon;
                    return (
                      <div
                        key={method.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                          selectedMethod === method.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/30'
                        }`}
                        onClick={() => setSelectedMethod(method.id)}
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`p-3 rounded-lg ${
                            selectedMethod === method.id ? 'bg-primary/10' : 'bg-muted'
                          }`}>
                            <IconComponent className={`w-6 h-6 ${
                              selectedMethod === method.id ? 'text-primary' : 'text-muted-foreground'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-foreground">{method.name}</h3>
                              <input
                                type="radio"
                                checked={selectedMethod === method.id}
                                onChange={() => setSelectedMethod(method.id)}
                                className="text-primary"
                              />
                            </div>
                            <p className="text-sm text-muted-foreground mt-1 mb-2">
                              {method.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {method.providers.map((provider) => (
                                <Badge key={provider} variant="outline" className="text-xs">
                                  {provider}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Payment Form */}
              {selectedMethod && (
                <Card className="mt-6 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {selectedPaymentMethod?.name} Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedMethod === "mobile-money" && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="provider">Mobile Money Provider</Label>
                          <Select>
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Select your provider" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mtn">MTN Mobile Money</SelectItem>
                              <SelectItem value="airtel">Airtel Money</SelectItem>
                              <SelectItem value="msente">M-Sente</SelectItem>
                              <SelectItem value="centenary">Centenary Mobile</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            placeholder="+256 700 000 000"
                            className="mt-2"
                          />
                        </div>
                      </div>
                    )}

                    {selectedMethod === "card" && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            className="mt-2"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              className="mt-2"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="cardName">Cardholder Name</Label>
                          <Input
                            id="cardName"
                            placeholder="Full name on card"
                            className="mt-2"
                          />
                        </div>
                      </div>
                    )}

                    {selectedMethod === "paypal" && (
                      <div className="text-center py-8">
                        <div className="mb-4">
                          <DollarSign className="w-16 h-16 text-primary mx-auto mb-4" />
                          <h3 className="text-lg font-semibold mb-2">PayPal Payment</h3>
                          <p className="text-muted-foreground">
                            You will be redirected to PayPal to complete your payment securely
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedMethod === "bank-transfer" && (
                      <div className="space-y-4">
                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-semibold mb-3">Bank Details</h4>
                          <div className="space-y-2 text-sm">
                            <div><strong>Bank:</strong> Stanbic Bank Uganda</div>
                            <div><strong>Account Name:</strong> SPLM Uganda Chapter</div>
                            <div><strong>Account Number:</strong> 9030012345678</div>
                            <div><strong>Swift Code:</strong> SBICUGKX</div>
                            <div><strong>Reference:</strong> {memberData.memberId}</div>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="reference">Transaction Reference</Label>
                          <Input
                            id="reference"
                            placeholder="Enter transaction reference from your bank"
                            className="mt-2"
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="shadow-xl border-primary/20 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground">{memberData.surname} {memberData.otherNames}</h4>
                    <p className="text-sm text-muted-foreground">Member ID: {memberData.memberId}</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Membership Type:</span>
                    <span className="font-medium capitalize">{memberData.membershipCategory} Member</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Processing Fee:</span>
                    <span className="font-medium">Free</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount:</span>
                    <span className="text-primary">$40 USD</span>
                  </div>

                  <div className="space-y-3 pt-4">
                    <Button
                      onClick={handlePayment}
                      disabled={!selectedMethod || processing}
                      className="w-full"
                      variant="hero"
                      size="lg"
                    >
                      {processing ? (
                        <>
                          <Clock className="w-4 h-4 animate-spin" />
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Pay $40 USD
                        </>
                      )}
                    </Button>
                    
                    <Link to="/register">
                      <Button variant="outline" size="sm" className="w-full">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Registration
                      </Button>
                    </Link>
                  </div>

                  {/* Security Notice */}
                  <div className="bg-primary/5 p-3 rounded-lg border border-primary/20 mt-4">
                    <div className="flex items-start space-x-2">
                      <Shield className="w-4 h-4 text-primary mt-0.5" />
                      <div>
                        <h5 className="text-sm font-semibold text-primary">Secure Payment</h5>
                        <p className="text-xs text-muted-foreground">
                          Your payment is protected by bank-level encryption
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          )}

          {/* Post-payment success message */}
          {paymentCompleted && (
            <div className="text-center mt-8">
              <Card className="max-w-2xl mx-auto">
                <CardContent className="p-6">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">Welcome to SPLM Uganda Chapter!</h3>
                  <p className="text-muted-foreground mb-4">
                    Your membership registration is now complete. Thank you for joining our liberation movement.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Link to="/">
                      <Button variant="hero">
                        Return to Home
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Payment; 