import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  UserPlus, 
  CreditCard, 
  Camera, 
  Save, 
  ArrowLeft,
  RefreshCw,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Building,
  Users,
  IdCard,
  User,
  Shield,
  Flag
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { generateSplmUgId, memberStorage, isAdminAuthenticated } from "@/lib/utils";

const AdminRegistration = () => {
  const [formData, setFormData] = useState({
    // Personal Information
    surname: "",
    otherNames: "",
    occupation: "",
    academicStatus: "",
    professionalExperience: "",
    sex: "",
    maritalStatus: "",
    dateOfBirth: "",
    dateOfJoiningSplm: "",
    state: "",
    county: "",
    payam: "",
    boma: "",
    continent: "",
    address: "",
    telephone: "",
    
    // Membership Category
    membershipCategory: "Active",
    
    // Political Background
    previousPoliticalParty: "",
    whenLeftParty: "",
    reasonForLeaving: "",
    beliefInSplmObjectives: "",
    reasonForBelief: "",
    readyToServe: "",
    
    // Declaration
    applicantSignature: "",
    declarationDate: "",
    
    // For Official Use Only
    approvedBy: "",
    serialNumber: "",
    approvalDate: "",
    feesPaid: "30000",
    officerSignature: "",
    
    // Payment Details
    paymentMethod: "cash",
    paymentAmount: "30000",
    paymentDate: new Date().toISOString().split('T')[0],
    adminNotes: "",
    photo: null as File | null
  });

  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedId, setGeneratedId] = useState<string>("");
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check admin authentication
  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    // Generate initial ID
    setGeneratedId(generateSplmUgId());
  }, [navigate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please select a photo smaller than 5MB",
          variant: "destructive"
        });
        return;
      }

      setFormData(prev => ({ ...prev, photo: file }));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateNewId = () => {
    setGeneratedId(generateSplmUgId());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.surname || !formData.otherNames || !formData.telephone) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields (Surname, Other Names, Telephone)",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const memberId = generatedId;
      
      const memberData = {
        ...formData,
        memberId,
        registrationDate: new Date().toISOString(),
        paymentStatus: 'completed',
        paymentMethod: 'cash',
        adminRegistered: true,
        adminNotes: formData.adminNotes || 'Registered by admin - cash payment received'
      };

      memberStorage.save(memberId, memberData);
      
      toast({
        title: "Registration Successful!",
        description: `Member ${formData.surname} ${formData.otherNames} has been registered with ID: ${memberId}`,
      });

      // Reset form
      setFormData({
        // Personal Information
        surname: "",
        otherNames: "",
        occupation: "",
        academicStatus: "",
        professionalExperience: "",
        sex: "",
        maritalStatus: "",
        dateOfBirth: "",
        dateOfJoiningSplm: "",
        state: "",
        county: "",
        payam: "",
        boma: "",
        continent: "",
        address: "",
        telephone: "",
        
        // Membership Category
        membershipCategory: "Active",
        
        // Political Background
        previousPoliticalParty: "",
        whenLeftParty: "",
        reasonForLeaving: "",
        beliefInSplmObjectives: "",
        reasonForBelief: "",
        readyToServe: "",
        
        // Declaration
        applicantSignature: "",
        declarationDate: "",
        
                 // For Official Use Only
         approvedBy: "",
         serialNumber: "",
         approvalDate: "",
         feesPaid: "30000",
         officerSignature: "",
        
                 // Payment Details
         paymentMethod: "cash",
         paymentAmount: "30000",
         paymentDate: new Date().toISOString().split('T')[0],
        adminNotes: "",
        photo: null
      });
      setPhotoPreview("");
      setGeneratedId(generateSplmUgId());

      setTimeout(() => {
        navigate('/admin');
      }, 2000);

    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "An error occurred during registration. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAdminAuthenticated()) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Admin <span className="text-primary">Registration</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Register new members who have made cash payments
            </p>
            <div className="mt-4">
              <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700">
                <CreditCard className="w-3 h-3 mr-1" />
                CASH PAYMENT REGISTRATION
              </Badge>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-3 space-y-6">
                {/* Member ID Generation */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <IdCard className="w-5 h-5 text-primary" />
                      Member ID Generation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <Label className="text-sm font-medium">Generated Member ID</Label>
                        <div className="mt-2 p-3 bg-muted rounded-lg border">
                          <span className="font-mono text-lg font-bold text-primary">{generatedId}</span>
                        </div>
                      </div>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={generateNewId}
                        className="mt-6"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Generate New ID
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      This ID will be assigned to the member upon successful registration
                    </p>
                  </CardContent>
                </Card>

                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-primary" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="surname" className="text-sm font-medium">
                          Surname <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="surname"
                          value={formData.surname}
                          onChange={(e) => handleInputChange('surname', e.target.value)}
                          placeholder="Enter surname"
                          className="mt-2"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="otherNames" className="text-sm font-medium">
                          Other Names <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="otherNames"
                          value={formData.otherNames}
                          onChange={(e) => handleInputChange('otherNames', e.target.value)}
                          placeholder="Enter other names"
                          className="mt-2"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="occupation" className="text-sm font-medium">Occupation</Label>
                        <Input
                          id="occupation"
                          value={formData.occupation}
                          onChange={(e) => handleInputChange('occupation', e.target.value)}
                          placeholder="e.g., Engineer, Teacher, Business"
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="academicStatus" className="text-sm font-medium">Academic Status</Label>
                        <Select value={formData.academicStatus} onValueChange={(value) => handleInputChange('academicStatus', value)}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select academic status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="primary">Primary</SelectItem>
                            <SelectItem value="secondary">Secondary</SelectItem>
                            <SelectItem value="diploma">Diploma</SelectItem>
                            <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                            <SelectItem value="masters">Master's Degree</SelectItem>
                            <SelectItem value="phd">PhD</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="professionalExperience" className="text-sm font-medium">Professional/Experience</Label>
                      <Textarea
                        id="professionalExperience"
                        value={formData.professionalExperience}
                        onChange={(e) => handleInputChange('professionalExperience', e.target.value)}
                        placeholder="Describe your professional experience and background..."
                        className="mt-2"
                        rows={3}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="sex" className="text-sm font-medium">Sex</Label>
                        <Select value={formData.sex} onValueChange={(value) => handleInputChange('sex', value)}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select sex" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="maritalStatus" className="text-sm font-medium">Marital Status</Label>
                        <Select value={formData.maritalStatus} onValueChange={(value) => handleInputChange('maritalStatus', value)}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single">Single</SelectItem>
                            <SelectItem value="married">Married</SelectItem>
                            <SelectItem value="divorced">Divorced</SelectItem>
                            <SelectItem value="widowed">Widowed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="dateOfBirth" className="text-sm font-medium">Date of Birth</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="dateOfJoiningSplm" className="text-sm font-medium">Date of Joining SPLM</Label>
                        <Input
                          id="dateOfJoiningSplm"
                          type="date"
                          value={formData.dateOfJoiningSplm}
                          onChange={(e) => handleInputChange('dateOfJoiningSplm', e.target.value)}
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="state" className="text-sm font-medium">State</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          placeholder="e.g., Central Equatoria"
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="county" className="text-sm font-medium">County</Label>
                        <Input
                          id="county"
                          value={formData.county}
                          onChange={(e) => handleInputChange('county', e.target.value)}
                          placeholder="e.g., Juba County"
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="payam" className="text-sm font-medium">Payam</Label>
                        <Input
                          id="payam"
                          value={formData.payam}
                          onChange={(e) => handleInputChange('payam', e.target.value)}
                          placeholder="Enter Payam"
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="boma" className="text-sm font-medium">Boma</Label>
                        <Input
                          id="boma"
                          value={formData.boma}
                          onChange={(e) => handleInputChange('boma', e.target.value)}
                          placeholder="Enter Boma"
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="continent" className="text-sm font-medium">Continent</Label>
                        <Select value={formData.continent} onValueChange={(value) => handleInputChange('continent', value)}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select continent" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="africa">Africa</SelectItem>
                            <SelectItem value="europe">Europe</SelectItem>
                            <SelectItem value="asia">Asia</SelectItem>
                            <SelectItem value="north-america">North America</SelectItem>
                            <SelectItem value="south-america">South America</SelectItem>
                            <SelectItem value="australia">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="telephone" className="text-sm font-medium">
                          Telephone <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="telephone"
                          value={formData.telephone}
                          onChange={(e) => handleInputChange('telephone', e.target.value)}
                          placeholder="+256 700 000 000"
                          className="mt-2"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address" className="text-sm font-medium">Address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Enter full address"
                        className="mt-2"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Membership Category */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-primary" />
                      Membership Category
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground mb-4">
                        You must choose and tick one:
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="active"
                            name="membershipCategory"
                            value="Active"
                            checked={formData.membershipCategory === "Active"}
                            onChange={(e) => handleInputChange('membershipCategory', e.target.value)}
                            className="w-4 h-4 text-primary"
                          />
                          <Label htmlFor="active" className="text-sm font-medium">Active</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="ordinary"
                            name="membershipCategory"
                            value="Ordinary"
                            checked={formData.membershipCategory === "Ordinary"}
                            onChange={(e) => handleInputChange('membershipCategory', e.target.value)}
                            className="w-4 h-4 text-primary"
                          />
                          <Label htmlFor="ordinary" className="text-sm font-medium">Ordinary</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="supporter"
                            name="membershipCategory"
                            value="Supporter"
                            checked={formData.membershipCategory === "Supporter"}
                            onChange={(e) => handleInputChange('membershipCategory', e.target.value)}
                            className="w-4 h-4 text-primary"
                          />
                          <Label htmlFor="supporter" className="text-sm font-medium">Supporter</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="sympathizer"
                            name="membershipCategory"
                            value="Sympathizer"
                            checked={formData.membershipCategory === "Sympathizer"}
                            onChange={(e) => handleInputChange('membershipCategory', e.target.value)}
                            className="w-4 h-4 text-primary"
                          />
                          <Label htmlFor="sympathizer" className="text-sm font-medium">Sympathizer</Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Political Background */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <Building className="w-5 h-5 text-primary" />
                      Political Background
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="previousPoliticalParty" className="text-sm font-medium">Previous Political Party</Label>
                      <Input
                        id="previousPoliticalParty"
                        value={formData.previousPoliticalParty}
                        onChange={(e) => handleInputChange('previousPoliticalParty', e.target.value)}
                        placeholder="e.g., SPLM-IO, Other party name"
                        className="mt-2"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="whenLeftParty" className="text-sm font-medium">When you left that party</Label>
                        <Input
                          id="whenLeftParty"
                          type="date"
                          value={formData.whenLeftParty}
                          onChange={(e) => handleInputChange('whenLeftParty', e.target.value)}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="reasonForLeaving" className="text-sm font-medium">Why you left that party</Label>
                        <Textarea
                          id="reasonForLeaving"
                          value={formData.reasonForLeaving}
                          onChange={(e) => handleInputChange('reasonForLeaving', e.target.value)}
                          placeholder="Explain your reasons for leaving..."
                          className="mt-2"
                          rows={2}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="beliefInSplmObjectives" className="text-sm font-medium">Do you believe in SPLM objectives?</Label>
                        <Select value={formData.beliefInSplmObjectives} onValueChange={(value) => handleInputChange('beliefInSplmObjectives', value)}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="readyToServe" className="text-sm font-medium">Are you ready to serve SPLM when called upon?</Label>
                        <Select value={formData.readyToServe} onValueChange={(value) => handleInputChange('readyToServe', value)}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {formData.beliefInSplmObjectives === 'yes' && (
                      <div>
                        <Label htmlFor="reasonForBelief" className="text-sm font-medium">Why do you believe in SPLM objectives?</Label>
                        <Textarea
                          id="reasonForBelief"
                          value={formData.reasonForBelief}
                          onChange={(e) => handleInputChange('reasonForBelief', e.target.value)}
                          placeholder="Explain your belief in SPLM objectives..."
                          className="mt-2"
                          rows={3}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Declaration */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <Flag className="w-5 h-5 text-primary" />
                      Declaration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="applicantSignature" className="text-sm font-medium">Applicant Signature</Label>
                      <Input
                        id="applicantSignature"
                        value={formData.applicantSignature}
                        onChange={(e) => handleInputChange('applicantSignature', e.target.value)}
                        placeholder="Type your full name as signature"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="declarationDate" className="text-sm font-medium">Date</Label>
                      <Input
                        id="declarationDate"
                        type="date"
                        value={formData.declarationDate}
                        onChange={(e) => handleInputChange('declarationDate', e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* For Official Use Only */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-primary" />
                      For Official Use Only
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="approvedBy" className="text-sm font-medium">Approved by</Label>
                        <Input
                          id="approvedBy"
                          value={formData.approvedBy}
                          onChange={(e) => handleInputChange('approvedBy', e.target.value)}
                          placeholder="Name of approving officer"
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="serialNumber" className="text-sm font-medium">Serial Number</Label>
                        <Input
                          id="serialNumber"
                          value={formData.serialNumber}
                          onChange={(e) => handleInputChange('serialNumber', e.target.value)}
                          placeholder="Official serial number"
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="approvalDate" className="text-sm font-medium">Date</Label>
                        <Input
                          id="approvalDate"
                          type="date"
                          value={formData.approvalDate}
                          onChange={(e) => handleInputChange('approvalDate', e.target.value)}
                          className="mt-2"
                        />
                      </div>
                                             <div>
                         <Label htmlFor="feesPaid" className="text-sm font-medium">Fees Paid (UGX)</Label>
                         <Input
                           id="feesPaid"
                           value={formData.feesPaid}
                           onChange={(e) => handleInputChange('feesPaid', e.target.value)}
                           placeholder="30000"
                           className="mt-2"
                         />
                       </div>
                    </div>

                    <div>
                      <Label htmlFor="officerSignature" className="text-sm font-medium">Officer's Signature</Label>
                      <Input
                        id="officerSignature"
                        value={formData.officerSignature}
                        onChange={(e) => handleInputChange('officerSignature', e.target.value)}
                        placeholder="Name of processing officer"
                        className="mt-2"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Photo Upload */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <Camera className="w-5 h-5 text-primary" />
                      Photo Upload
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-6">
                      <div>
                        <Label htmlFor="photo" className="text-sm font-medium">Member Photo</Label>
                        <Input
                          id="photo"
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="mt-2"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Upload a photo with red background (max 5MB)
                        </p>
                      </div>
                      {photoPreview && (
                        <div className="w-24 h-28 bg-red-600 rounded border-2 border-red-700 overflow-hidden">
                          <img 
                            src={photoPreview} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Admin Notes */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-primary" />
                      Admin Notes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Label htmlFor="adminNotes" className="text-sm font-medium">Additional Notes</Label>
                      <Textarea
                        id="adminNotes"
                        value={formData.adminNotes}
                        onChange={(e) => handleInputChange('adminNotes', e.target.value)}
                        placeholder="Enter any additional notes about this registration..."
                        className="mt-2"
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar - Payment & Summary */}
              <div className="space-y-6">
                {/* Payment Information */}
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <CreditCard className="w-5 h-5 text-primary" />
                      Payment Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="paymentMethod" className="text-sm font-medium">Payment Method</Label>
                      <Select value={formData.paymentMethod} onValueChange={(value) => handleInputChange('paymentMethod', value)}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">Cash Payment</SelectItem>
                          <SelectItem value="bank">Bank Transfer</SelectItem>
                          <SelectItem value="check">Check</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                                         <div>
                       <Label htmlFor="paymentAmount" className="text-sm font-medium">Payment Amount (UGX)</Label>
                       <Input
                         id="paymentAmount"
                         value={formData.paymentAmount}
                         onChange={(e) => handleInputChange('paymentAmount', e.target.value)}
                         placeholder="30000"
                         className="mt-2"
                       />
                     </div>

                    <div>
                      <Label htmlFor="paymentDate" className="text-sm font-medium">Payment Date</Label>
                      <Input
                        id="paymentDate"
                        type="date"
                        value={formData.paymentDate}
                        onChange={(e) => handleInputChange('paymentDate', e.target.value)}
                        className="mt-2"
                      />
                    </div>

                                         <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                       <div className="flex items-center space-x-2">
                         <CreditCard className="w-4 h-4 text-green-600" />
                         <div>
                           <h5 className="text-sm font-semibold text-green-800">Cash Payment Received</h5>
                           <p className="text-xs text-green-600">
                             Member has already paid UGX 30,000 in cash
                           </p>
                         </div>
                       </div>
                     </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full"
                        variant="hero"
                        size="lg"
                      >
                        {isSubmitting ? (
                          <>
                            <Save className="w-4 h-4 animate-spin" />
                            Registering Member...
                          </>
                        ) : (
                          <>
                            <UserPlus className="w-4 h-4" />
                            Complete Registration
                          </>
                        )}
                      </Button>
                      
                      <Link to="/admin">
                        <Button variant="outline" size="sm" className="w-full">
                          <ArrowLeft className="w-4 h-4" />
                          Back to Dashboard
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminRegistration;
