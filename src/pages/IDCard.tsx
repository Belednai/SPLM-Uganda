import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Printer, 
  User, 
  Calendar, 
  MapPin,
  Phone,
  Mail,
  IdCard
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import splmLogo from "@/assets/splm-uganda-logo.png";
import { Label } from "@/components/ui/label";

const IDCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mock member data - in real app this would come from API/database
  const memberData = {
    id: "UG-SPLM-2025-001234",
    name: "John Doe Mabior",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    membershipType: "Standard Membership",
    dateOfBirth: "1990-05-15",
    nationality: "South Sudan",
    phone: "+256 700 123 456",
    email: "john.doe@email.com",
    address: "Kampala, Uganda",
    registeredDate: "2025-01-15",
    expiryDate: "2026-01-15",
    status: "Active"
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    console.log("Downloading ID card as PDF...");
    alert("ID card download initiated. Check your downloads folder.");
  };

  const qrCodeData = `{
    "id": "${memberData.id}",
    "name": "${memberData.name}",
    "membership": "${memberData.membershipType}",
    "status": "${memberData.status}",
    "expires": "${memberData.expiryDate}",
    "verify": "https://splm-ug.org/verify/${memberData.id}"
  }`;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Membership <span className="text-primary">ID Card</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Your official SPLM Uganda Chapter membership identification
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mb-8">
            <Button onClick={handleDownload} variant="hero">
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
            <Button onClick={handlePrint} variant="outline">
              <Printer className="w-4 h-4" />
              Print Card
            </Button>
          </div>

          {/* ID Card */}
          <div className="flex justify-center">
            <div ref={cardRef} className="id-card-container">
              {/* Front Side */}
              <Card className="w-96 h-64 shadow-2xl border-2 border-primary/20 mb-6 print:mb-0">
                <CardContent className="p-0 h-full relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5"></div>
                  
                  {/* Header */}
                  <div className="bg-primary text-primary-foreground p-3 flex items-center space-x-3">
                    <img src={splmLogo} alt="SPLM" className="w-8 h-8 object-contain" />
                    <div>
                      <h3 className="font-bold text-sm">SPLM UGANDA CHAPTER</h3>
                      <p className="text-xs opacity-90">Member Identification Card</p>
                    </div>
                  </div>

                  {/* Member Info */}
                  <div className="p-4 flex space-x-4 h-full">
                    {/* Photo */}
                    <div className="w-20 h-24 bg-muted rounded-lg overflow-hidden border-2 border-border flex-shrink-0">
                      <img 
                        src={memberData.photo} 
                        alt={memberData.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 space-y-2">
                      <div>
                        <h4 className="font-bold text-lg text-foreground leading-tight">
                          {memberData.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {memberData.membershipType}
                        </p>
                      </div>
                      
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center space-x-2">
                          <IdCard className="w-3 h-3 text-primary" />
                          <span className="font-mono font-bold text-primary">
                            {memberData.id}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-3 h-3 text-muted-foreground" />
                          <span>Born: {memberData.dateOfBirth}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          <span>{memberData.nationality}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Badge variant="default" className="text-xs">
                          {memberData.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Expires: {memberData.expiryDate}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Back Side */}
              <Card className="w-96 h-64 shadow-2xl border-2 border-primary/20">
                <CardContent className="p-4 h-full flex flex-col">
                  {/* QR Code Section */}
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-muted rounded-lg border-2 border-border mb-4 flex items-center justify-center">
                        {/* QR Code Placeholder - in real app would use a QR code library */}
                        <div className="text-xs text-center p-2">
                          <div className="grid grid-cols-8 gap-1">
                            {Array.from({ length: 64 }).map((_, i) => (
                              <div
                                key={i}
                                className={`w-1 h-1 ${
                                  Math.random() > 0.5 ? 'bg-foreground' : 'bg-background'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Scan to verify membership
                      </p>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 text-xs border-t border-border pt-3">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-3 h-3 text-primary" />
                      <span>{memberData.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-3 h-3 text-primary" />
                      <span>{memberData.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-3 h-3 text-primary" />
                      <span>{memberData.address}</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="text-center text-xs text-muted-foreground mt-3 border-t border-border pt-2">
                    <p>This card is property of SPLM Uganda Chapter</p>
                    <p>Report if found: +256 700 000 000</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Member Details */}
          <Card className="mt-8 max-w-2xl mx-auto">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Member Details</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-muted-foreground">Full Name</Label>
                  <p className="font-medium">{memberData.name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Member ID</Label>
                  <p className="font-mono font-medium text-primary">{memberData.id}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Membership Type</Label>
                  <p className="font-medium">{memberData.membershipType}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Registration Date</Label>
                  <p className="font-medium">{memberData.registeredDate}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <Badge variant="default">{memberData.status}</Badge>
                </div>
                <div>
                  <Label className="text-muted-foreground">Valid Until</Label>
                  <p className="font-medium">{memberData.expiryDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .id-card-container,
          .id-card-container * {
            visibility: visible;
          }
          .id-card-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          @page {
            size: A4;
            margin: 1cm;
          }
        }
      `}</style>
    </div>
  );
};

export default IDCard; 