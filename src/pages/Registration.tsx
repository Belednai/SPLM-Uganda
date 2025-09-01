import { useState, useEffect } from "react";
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
import { generateSplmUgId, createRedBackgroundPlaceholder, memberStorage } from "@/lib/utils";

const registrationSchema = z.object({
  surname: z.string().min(2, "Surname must be at least 2 characters"),
  otherNames: z.string().min(2, "Other names must be at least 2 characters"),
  occupation: z.string().min(2, "Occupation is required"),
  academicStatus: z.string().min(2, "Academic status is required"),
  professionalExperience: z.string().min(2, "Professional experience is required"),
  sex: z.string().min(1, "Sex is required"),
  maritalStatus: z.string().min(1, "Marital status is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  dateOfJoiningSplm: z.string().min(1, "Date of joining SPLM is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  payam: z.string().min(1, "Payam is required"),
  boma: z.string().min(1, "Boma is required"),
  continent: z.string().min(1, "Continent is required"),
  diasporaCountry: z.string().min(1, "Current country is required"),
  address: z.string().min(10, "Complete address is required"),
  telephone: z.string().min(10, "Valid phone number is required"),
  membershipCategory: z.string().min(1, "Please select a membership category"),
  previousPoliticalParty: z.string().optional(),
  reasonForLeavingParty: z.string().optional(),
  splmObjectivesBelief: z.string().min(20, "Please explain your belief in SPLM objectives"),
  readyToServe: z.string().min(1, "Please indicate if you are ready to serve SPLM"),
  agreeToTerms: z.boolean().refine(value => value === true, "You must agree to terms and conditions"),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

const Registration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [memberId, setMemberId] = useState<string>("");
  const { toast } = useToast();
  const navigate = useNavigate();

  // Initialize red background placeholder on component mount
  useEffect(() => {
    if (!photoPreview) {
      setPhotoPreview(createRedBackgroundPlaceholder());
    }
  }, [photoPreview]);

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

  const membershipCategories = [
    { value: "member", label: "SPLM Uganda Chapter Member" }
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

      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file",
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

      toast({
        title: "Photo uploaded successfully",
        description: "Please ensure your photo has a red background as required",
      });
    }
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof RegistrationFormData)[] = [];
    
    switch (currentStep) {
      case 1:
        fieldsToValidate = ["surname", "otherNames", "sex", "maritalStatus"];
        break;
      case 2:
        fieldsToValidate = ["academicStatus", "occupation", "dateOfBirth", "dateOfJoiningSplm"];
        break;
      case 3:
        fieldsToValidate = ["state", "country", "payam", "boma", "continent", "diasporaCountry", "address", "telephone"];
        break;
      case 4:
        fieldsToValidate = ["membershipCategory", "previousPoliticalParty", "reasonForLeavingParty", "splmObjectivesBelief", "readyToServe", "agreeToTerms"];
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

    // Generate unique SPLM-UG ID
    const newMemberId = generateSplmUgId();
    setMemberId(newMemberId);

    // Store member data for payment and ID generation
    const memberData = {
      ...data,
      memberId: newMemberId,
      photo: photoPreview, // Store the photo preview for ID card
      submissionDate: new Date().toISOString(),
      paymentStatus: 'pending'
    };

    // Save to storage and set as current member
    memberStorage.save(newMemberId, memberData);
    memberStorage.setCurrentMember(newMemberId);

    console.log("Registration data:", memberData);
    
    toast({
      title: "Registration Submitted Successfully!",
      description: "Please proceed to payment to complete your membership registration.",
    });

    // Redirect to payment page after short delay
    setTimeout(() => {
      navigate('/payment');
    }, 2000);
  };

  const selectedMembershipType = membershipCategories.find(type => type.value === watch("membershipCategory"));

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

          <Card className="shadow-xl border-primary/10 bg-gradient-to-br from-background via-background to-primary/5">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-3 text-xl">
                {currentStep === 1 && <><User className="w-6 h-6 text-primary" /> Personal Information</>}
                {currentStep === 2 && <><FileText className="w-6 h-6 text-primary" /> Professional Details</>}
                {currentStep === 3 && <><MapPin className="w-6 h-6 text-primary" /> Location Information</>}
                {currentStep === 4 && <><CheckCircle className="w-6 h-6 text-primary" /> Membership & Agreement</>}
              </CardTitle>
              <div className="text-sm text-muted-foreground">
                {currentStep === 1 && "Provide your basic personal information"}
                {currentStep === 2 && "Tell us about your professional background"}
                {currentStep === 3 && "Provide your location and contact details"}
                {currentStep === 4 && "Choose membership type and agree to terms"}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit(onSubmit)}>
                
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="surname">Surname *</Label>
                        <Input
                          id="surname"
                          {...register("surname")}
                          className="mt-2"
                          placeholder="Enter your surname"
                        />
                        {errors.surname && (
                          <p className="text-destructive text-sm mt-1">{errors.surname.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="otherNames">Other Names *</Label>
                        <Input
                          id="otherNames"
                          {...register("otherNames")}
                          className="mt-2"
                          placeholder="Enter your other names"
                        />
                        {errors.otherNames && (
                          <p className="text-destructive text-sm mt-1">{errors.otherNames.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="sex">Sex *</Label>
                        <Select onValueChange={(value) => setValue("sex", value)}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select sex" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.sex && (
                          <p className="text-destructive text-sm mt-1">{errors.sex.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="maritalStatus">Marital Status *</Label>
                        <Select onValueChange={(value) => setValue("maritalStatus", value)}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select marital status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single">Single</SelectItem>
                            <SelectItem value="married">Married</SelectItem>
                            <SelectItem value="divorced">Divorced</SelectItem>
                            <SelectItem value="widowed">Widowed</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.maritalStatus && (
                          <p className="text-destructive text-sm mt-1">{errors.maritalStatus.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label>Passport Photo * (Red Background Required)</Label>
                      <div className="mt-2 flex items-center space-x-6">
                        <div className="w-32 h-40 border-2 border-dashed border-primary/30 rounded-lg flex items-center justify-center overflow-hidden bg-red-500/10 relative">
                          {photoPreview ? (
                            <>
                            <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                              {!photoFile && (
                                <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                                  <div className="text-center">
                                    <p className="text-xs text-white font-semibold bg-red-600 px-2 py-1 rounded">
                                      PLACEHOLDER
                                    </p>
                                  </div>
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="text-center p-4">
                              <Camera className="w-8 h-8 text-red-600 mx-auto mb-2" />
                              <p className="text-xs text-red-700 font-medium">Red background required</p>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
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
                                <Camera className="w-4 h-4 mr-2" />
                                {photoFile ? 'Change Photo' : 'Upload Photo'}
                              </span>
                            </Button>
                          </Label>
                          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-800 font-medium mb-1">📷 Photo Requirements:</p>
                            <ul className="text-xs text-red-700 space-y-1">
                              <li>• Must have a <strong>red background</strong></li>
                              <li>• Passport-style photo (head and shoulders)</li>
                              <li>• Clear, recent photo</li>
                              <li>• Maximum file size: 5MB</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="academicStatus">Academic Status *</Label>
                        <Input
                          id="academicStatus"
                          {...register("academicStatus")}
                          className="mt-2"
                          placeholder="Your highest academic qualification"
                        />
                        {errors.academicStatus && (
                          <p className="text-destructive text-sm mt-1">{errors.academicStatus.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="occupation">Occupation *</Label>
                        <Input
                          id="occupation"
                          {...register("occupation")}
                          className="mt-2"
                          placeholder="Your current occupation"
                        />
                        {errors.occupation && (
                          <p className="text-destructive text-sm mt-1">{errors.occupation.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="professionalExperience">Professional Experience *</Label>
                      <Textarea
                        id="professionalExperience"
                        {...register("professionalExperience")}
                        className="mt-2"
                        rows={3}
                        placeholder="Describe your professional experience"
                      />
                      {errors.professionalExperience && (
                        <p className="text-destructive text-sm mt-1">{errors.professionalExperience.message}</p>
                      )}
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
                        <Label htmlFor="dateOfJoiningSplm">Date of Joining SPLM *</Label>
                        <Input
                          id="dateOfJoiningSplm"
                          type="date"
                          {...register("dateOfJoiningSplm")}
                          className="mt-2"
                        />
                        {errors.dateOfJoiningSplm && (
                          <p className="text-destructive text-sm mt-1">{errors.dateOfJoiningSplm.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          {...register("state")}
                          className="mt-2"
                          placeholder="Your state in South Sudan"
                        />
                        {errors.state && (
                          <p className="text-destructive text-sm mt-1">{errors.state.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="country">County *</Label>
                        <Input
                          id="country"
                          {...register("country")}
                          className="mt-2"
                          placeholder="Your county in South Sudan"
                        />
                        {errors.country && (
                          <p className="text-destructive text-sm mt-1">{errors.country.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="payam">Payam *</Label>
                        <Input
                          id="payam"
                          {...register("payam")}
                          className="mt-2"
                          placeholder="Your payam"
                        />
                        {errors.payam && (
                          <p className="text-destructive text-sm mt-1">{errors.payam.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="boma">Boma *</Label>
                        <Input
                          id="boma"
                          {...register("boma")}
                          className="mt-2"
                          placeholder="Your boma"
                        />
                        {errors.boma && (
                          <p className="text-destructive text-sm mt-1">{errors.boma.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="continent">Continent *</Label>
                        <Select onValueChange={(value) => setValue("continent", value)}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select continent" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="africa">Africa</SelectItem>
                            <SelectItem value="asia">Asia</SelectItem>
                            <SelectItem value="europe">Europe</SelectItem>
                            <SelectItem value="north-america">North America</SelectItem>
                            <SelectItem value="south-america">South America</SelectItem>
                            <SelectItem value="australia">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.continent && (
                          <p className="text-destructive text-sm mt-1">{errors.continent.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="diasporaCountry">Current Country *</Label>
                        <Input
                          id="diasporaCountry"
                          {...register("diasporaCountry")}
                          className="mt-2"
                          placeholder="Your current country of residence"
                        />
                        {errors.diasporaCountry && (
                          <p className="text-destructive text-sm mt-1">{errors.diasporaCountry.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Address *</Label>
                      <Textarea
                        id="address"
                        {...register("address")}
                        className="mt-2"
                        rows={2}
                        placeholder="Your current address"
                      />
                      {errors.address && (
                        <p className="text-destructive text-sm mt-1">{errors.address.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="telephone">Telephone *</Label>
                      <Input
                        id="telephone"
                        {...register("telephone")}
                        className="mt-2"
                        placeholder="+256 XXX XXX XXX"
                      />
                      {errors.telephone && (
                        <p className="text-destructive text-sm mt-1">{errors.telephone.message}</p>
                      )}
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <Label>Membership Category *</Label>
                      <div className="mt-4">
                        <div className="flex items-center space-x-3 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                          <input
                            type="radio"
                            {...register("membershipCategory")}
                            value="member"
                            className="text-primary"
                            defaultChecked
                          />
                          <Label className="font-medium">SPLM Uganda Chapter Member</Label>
                        </div>
                      </div>
                      {errors.membershipCategory && (
                        <p className="text-destructive text-sm mt-1">{errors.membershipCategory.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="previousPoliticalParty">Previous Political Party (if any)</Label>
                      <Input
                        id="previousPoliticalParty"
                        {...register("previousPoliticalParty")}
                        className="mt-2"
                        placeholder="Name of previous political party"
                      />
                    </div>

                    <div>
                      <Label htmlFor="reasonForLeavingParty">When did you leave that party and why?</Label>
                      <Textarea
                        id="reasonForLeavingParty"
                        {...register("reasonForLeavingParty")}
                        className="mt-2"
                        rows={2}
                        placeholder="Explain when and why you left your previous party"
                      />
                    </div>

                    <div>
                      <Label htmlFor="splmObjectivesBelief">Did you or do you believe in SPLM Objectives, and why? *</Label>
                      <Textarea
                        id="splmObjectivesBelief"
                        {...register("splmObjectivesBelief")}
                        className="mt-2"
                        rows={3}
                        placeholder="Explain your belief in SPLM objectives"
                      />
                      {errors.splmObjectivesBelief && (
                        <p className="text-destructive text-sm mt-1">{errors.splmObjectivesBelief.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="readyToServe">Are you ready to serve the SPLM at any time you are called upon? *</Label>
                      <Select onValueChange={(value) => setValue("readyToServe", value)}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select your answer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.readyToServe && (
                        <p className="text-destructive text-sm mt-1">{errors.readyToServe.message}</p>
                      )}
                    </div>

                    <Card className="border-primary/20 bg-primary/5">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <Shield className="w-5 h-5 text-primary mt-1" />
                          <div>
                            <h4 className="font-semibold text-primary">Application Fee</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Registration fee: UGX 30,000
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              Your membership ID card will be ready for pickup from our Kampala office after approval and payment confirmation.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="agreeToTerms"
                        onCheckedChange={(checked) => setValue("agreeToTerms", checked as boolean)}
                      />
                      <div>
                        <Label htmlFor="agreeToTerms" className="text-sm font-medium cursor-pointer">
                          Declaration *
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          I hereby declare that the information provided is true and correct. I understand that any false statements may result in denial or revocation of membership.
                        </p>
                      </div>
                    </div>
                    {errors.agreeToTerms && (
                      <p className="text-destructive text-sm">{errors.agreeToTerms.message}</p>
                    )}
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