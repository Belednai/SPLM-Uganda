import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  MapPin, 
  FileText, 
  Camera, 
  CreditCard, 
  Shield,
  CheckCircle,
  ArrowLeft,
  ArrowRight
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link, useNavigate } from "react-router-dom";

const registrationSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  middleName: z.string().optional(),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  nationality: z.string().min(1, "Nationality is required"),
  constituency: z.string().min(1, "Constituency is required"),
  phoneNumber: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  address: z.string().min(10, "Complete address is required"),
  occupation: z.string().min(2, "Occupation is required"),
  membershipType: z.string().min(1, "Please select a membership type"),
  emergencyContact: z.string().min(10, "Emergency contact is required"),
  emergencyPhone: z.string().min(10, "Emergency phone is required"),
  politicalExperience: z.string().optional(),
  skills: z.string().optional(),
  motivation: z.string().min(20, "Please explain your motivation (minimum 20 characters)"),
  agreeToTerms: z.boolean().refine(value => value === true, "You must agree to terms and conditions"),
  agreeToDataProcessing: z.boolean().refine(value => value === true, "You must consent to data processing"),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

const Registration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: "onChange"
  });

  const membershipTypes = [
    { value: "standard", label: "Standard Membership", price: "UGX 50,000", description: "Full membership with all benefits" },
    { value: "supporter", label: "Supporter Membership", price: "UGX 25,000", description: "Limited participation rights" },
    { value: "lifetime", label: "Lifetime Membership", price: "UGX 200,000", description: "Permanent membership with exclusive benefits" }
  ];

  const constituencies = [
    "Kampala Central", "Kampala East", "Kampala West", "Kampala North", "Kampala South",
    "Wakiso", "Mukono", "Entebbe", "Jinja", "Mbale", "Gulu", "Arua", "Other"
  ];

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Photo must be smaller than 5MB",
          variant: "destructive"
        });
        return;
      }

      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof RegistrationFormData)[] = [];
    
    switch (currentStep) {
      case 1:
        fieldsToValidate = ["firstName", "lastName", "dateOfBirth", "nationality"];
        break;
      case 2:
        fieldsToValidate = ["phoneNumber", "email", "address", "constituency"];
        break;
      case 3:
        fieldsToValidate = ["occupation", "membershipType", "emergencyContact", "emergencyPhone"];
        break;
      case 4:
        fieldsToValidate = ["motivation", "agreeToTerms", "agreeToDataProcessing"];
        break;
    }

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: RegistrationFormData) => {
    if (!photoFile) {
      toast({
        title: "Photo required",
        description: "Please upload your photo before submitting",
        variant: "destructive"
      });
      return;
    }

    console.log("Registration data:", data);
    console.log("Photo file:", photoFile);
    
    toast({
      title: "Registration Submitted Successfully!",
      description: "Please proceed to payment. Your ID will be ready for pickup from our Kampala office within 5-7 business days after payment confirmation.",
    });

    // Redirect to payment page
    setTimeout(() => {
      navigate('/payment');
    }, 2000);
  };

  const selectedMembershipType = membershipTypes.find(type => type.value === watch("membershipType"));

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Join <span className="text-primary">SPLM Uganda Chapter</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Complete your membership registration to become part of our liberation legacy
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="shadow-xl border-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                {currentStep === 1 && <><User className="w-5 h-5 text-primary" /> Personal Information</>}
                {currentStep === 2 && <><MapPin className="w-5 h-5 text-primary" /> Contact Details</>}
                {currentStep === 3 && <><FileText className="w-5 h-5 text-primary" /> Membership Details</>}
                {currentStep === 4 && <><CheckCircle className="w-5 h-5 text-primary" /> Review & Agreement</>}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit(onSubmit)}>
                
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          {...register("firstName")}
                          className="mt-2"
                          placeholder="Enter your first name"
                        />
                        {errors.firstName && (
                          <p className="text-destructive text-sm mt-1">{errors.firstName.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          {...register("lastName")}
                          className="mt-2"
                          placeholder="Enter your last name"
                        />
                        {errors.lastName && (
                          <p className="text-destructive text-sm mt-1">{errors.lastName.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="middleName">Middle Name (Optional)</Label>
                      <Input
                        id="middleName"
                        {...register("middleName")}
                        className="mt-2"
                        placeholder="Enter your middle name"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          {...register("dateOfBirth")}
                          className="mt-2"
                        />
                        {errors.dateOfBirth && (
                          <p className="text-destructive text-sm mt-1">{errors.dateOfBirth.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="nationality">Nationality *</Label>
                        <Select onValueChange={(value) => setValue("nationality", value)}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select nationality" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="south-sudan">South Sudan</SelectItem>
                            <SelectItem value="uganda">Uganda</SelectItem>
                            <SelectItem value="sudan">Sudan</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.nationality && (
                          <p className="text-destructive text-sm mt-1">{errors.nationality.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label>Passport Photo *</Label>
                      <div className="mt-2 flex items-center space-x-6">
                        <div className="w-32 h-32 border-2 border-dashed border-primary/30 rounded-lg flex items-center justify-center overflow-hidden">
                          {photoPreview ? (
                            <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <Camera className="w-8 h-8 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="hidden"
                            id="photo-upload"
                          />
                          <Label htmlFor="photo-upload" className="cursor-pointer">
                            <Button type="button" variant="outline" asChild>
                              <span>
                                <Camera className="w-4 h-4" />
                                Upload Photo
                              </span>
                            </Button>
                          </Label>
                          <p className="text-sm text-muted-foreground mt-2">
                            JPG, PNG up to 5MB. Passport-style photo preferred.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phoneNumber">Phone Number *</Label>
                        <Input
                          id="phoneNumber"
                          {...register("phoneNumber")}
                          className="mt-2"
                          placeholder="+256 700 000 000"
                        />
                        {errors.phoneNumber && (
                          <p className="text-destructive text-sm mt-1">{errors.phoneNumber.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register("email")}
                          className="mt-2"
                          placeholder="your.email@example.com"
                        />
                        {errors.email && (
                          <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Complete Address *</Label>
                      <Textarea
                        id="address"
                        {...register("address")}
                        className="mt-2"
                        rows={3}
                        placeholder="Enter your complete address including city and postal code"
                      />
                      {errors.address && (
                        <p className="text-destructive text-sm mt-1">{errors.address.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="constituency">Constituency *</Label>
                      <Select onValueChange={(value) => setValue("constituency", value)}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select your constituency" />
                        </SelectTrigger>
                        <SelectContent>
                          {constituencies.map((constituency) => (
                            <SelectItem key={constituency} value={constituency}>
                              {constituency}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.constituency && (
                        <p className="text-destructive text-sm mt-1">{errors.constituency.message}</p>
                      )}
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="occupation">Occupation *</Label>
                      <Input
                        id="occupation"
                        {...register("occupation")}
                        className="mt-2"
                        placeholder="Enter your current occupation"
                      />
                      {errors.occupation && (
                        <p className="text-destructive text-sm mt-1">{errors.occupation.message}</p>
                      )}
                    </div>

                    <div>
                      <Label>Membership Type *</Label>
                      <div className="mt-4 space-y-4">
                        {membershipTypes.map((type) => (
                          <div key={type.value} className="border rounded-lg p-4 cursor-pointer hover:border-primary/50 transition-colors"
                               onClick={() => setValue("membershipType", type.value)}>
                            <div className="flex items-center space-x-3">
                              <input
                                type="radio"
                                {...register("membershipType")}
                                value={type.value}
                                className="text-primary"
                              />
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-semibold">{type.label}</h4>
                                  <Badge variant="outline" className="font-bold text-primary">
                                    {type.price}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {errors.membershipType && (
                        <p className="text-destructive text-sm mt-1">{errors.membershipType.message}</p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="emergencyContact">Emergency Contact Name *</Label>
                        <Input
                          id="emergencyContact"
                          {...register("emergencyContact")}
                          className="mt-2"
                          placeholder="Full name of emergency contact"
                        />
                        {errors.emergencyContact && (
                          <p className="text-destructive text-sm mt-1">{errors.emergencyContact.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="emergencyPhone">Emergency Contact Phone *</Label>
                        <Input
                          id="emergencyPhone"
                          {...register("emergencyPhone")}
                          className="mt-2"
                          placeholder="+256 700 000 000"
                        />
                        {errors.emergencyPhone && (
                          <p className="text-destructive text-sm mt-1">{errors.emergencyPhone.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="politicalExperience">Political Experience (Optional)</Label>
                      <Textarea
                        id="politicalExperience"
                        {...register("politicalExperience")}
                        className="mt-2"
                        rows={3}
                        placeholder="Describe any relevant political experience or involvement"
                      />
                    </div>

                    <div>
                      <Label htmlFor="skills">Skills & Expertise (Optional)</Label>
                      <Textarea
                        id="skills"
                        {...register("skills")}
                        className="mt-2"
                        rows={3}
                        placeholder="List skills that could benefit the SPLM Uganda Chapter"
                      />
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="motivation">Why do you want to join SPLM Uganda Chapter? *</Label>
                      <Textarea
                        id="motivation"
                        {...register("motivation")}
                        className="mt-2"
                        rows={4}
                        placeholder="Please explain your motivation for joining and how you can contribute to our mission"
                      />
                      {errors.motivation && (
                        <p className="text-destructive text-sm mt-1">{errors.motivation.message}</p>
                      )}
                    </div>

                    {selectedMembershipType && (
                      <Card className="border-primary/20">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center">
                            <CreditCard className="w-5 h-5 mr-2" />
                            Selected Membership
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-semibold">{selectedMembershipType.label}</h4>
                              <p className="text-sm text-muted-foreground">{selectedMembershipType.description}</p>
                            </div>
                            <Badge variant="default" className="text-lg px-4 py-2">
                              {selectedMembershipType.price}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Updated ID Pickup Information */}
                    <Card className="border-primary/20 bg-primary/5">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <MapPin className="w-5 h-5 text-primary mt-1" />
                          <div>
                            <h4 className="font-semibold text-primary">ID Card Pickup Information</h4>
                            <div className="text-sm text-muted-foreground mt-2 space-y-2">
                              <p>
                                <strong>Your membership ID card will be ready for pickup from our Kampala office within 5-7 business days after payment confirmation.</strong>
                              </p>
                              <div className="bg-white/50 p-3 rounded border">
                                <p className="font-medium text-foreground">SPLM Uganda Chapter Office:</p>
                                <p>Plot 123, Kampala Road</p>
                                <p>Kampala Central, Uganda</p>
                                <p><strong>Office Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM</p>
                                <p><strong>Contact:</strong> +256 700 000 000</p>
                              </div>
                              <p className="text-xs">
                                You will receive an SMS notification when your ID is ready for collection. 
                                Please bring a copy of your payment receipt and a valid national ID for verification.
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Terms and Conditions */}
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="agreeToTerms"
                          onCheckedChange={(checked) => setValue("agreeToTerms", checked as boolean)}
                        />
                        <div>
                          <Label htmlFor="agreeToTerms" className="text-sm font-medium cursor-pointer">
                            I agree to the Terms and Conditions *
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            I agree to abide by SPLM Uganda Chapter constitution and regulations, and understand that my membership ID must be collected from the Kampala office.
                          </p>
                        </div>
                      </div>
                      {errors.agreeToTerms && (
                        <p className="text-destructive text-sm">{errors.agreeToTerms.message}</p>
                      )}

                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="agreeToDataProcessing"
                          onCheckedChange={(checked) => setValue("agreeToDataProcessing", checked as boolean)}
                        />
                        <div>
                          <Label htmlFor="agreeToDataProcessing" className="text-sm font-medium cursor-pointer">
                            I consent to data processing and pickup notifications *
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Your data will be used for membership management and you will be notified via SMS when your ID is ready for pickup.
                          </p>
                        </div>
                      </div>
                      {errors.agreeToDataProcessing && (
                        <p className="text-destructive text-sm">{errors.agreeToDataProcessing.message}</p>
                      )}
                    </div>

                    <Card className="border-primary/20 bg-primary/5">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <Shield className="w-5 h-5 text-primary mt-1" />
                          <div>
                            <h4 className="font-semibold text-primary">Data Security Notice</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Your information is encrypted and securely stored. We follow international data protection standards 
                              and will never share your information with third parties without your consent.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                <div className="flex justify-between pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                  </Button>

                  {currentStep < totalSteps ? (
                    <Button type="button" onClick={nextStep}>
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button type="submit" variant="hero">
                      <CheckCircle className="w-4 h-4" />
                      Submit Registration
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Registration; 