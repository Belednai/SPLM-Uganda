import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  UserPlus, 
  CreditCard, 
  IdCard, 
  Download, 
  CheckCircle, 
  Clock, 
  Shield,
  Users,
  Globe,
  FileText
} from "lucide-react";

const MembershipSection = () => {
  const [selectedPlan, setSelectedPlan] = useState("standard");

  const membershipPlans = [
    {
      id: "standard",
      name: "Standard Membership",
      price: "UGX 50,000",
      period: "Annual",
      description: "Full SPLM Uganda Chapter membership with all benefits",
      features: [
        "Official SPLM membership ID card",
        "Access to all chapter meetings",
        "Voting rights in chapter elections",
        "Digital membership certificate",
        "Access to member resources",
        "Newsletter and updates"
      ],
      badge: "Most Popular",
      highlight: true
    },
    {
      id: "supporter",
      name: "Supporter Membership",
      price: "UGX 25,000",
      period: "Annual",
      description: "Support the movement with limited participation rights",
      features: [
        "Supporter ID card",
        "Access to public meetings",
        "Newsletter and updates",
        "Digital certificate",
        "Community network access"
      ],
      badge: null,
      highlight: false
    },
    {
      id: "lifetime",
      name: "Lifetime Membership",
      price: "UGX 200,000",
      period: "One-time",
      description: "Permanent membership with exclusive benefits",
      features: [
        "Premium membership ID card",
        "Lifetime voting rights",
        "Priority in chapter positions",
        "Exclusive member events",
        "Historical documentation access",
        "Legacy member recognition",
        "Transfer to family members"
      ],
      badge: "Premium",
      highlight: false
    }
  ];

  const registrationSteps = [
    {
      step: 1,
      title: "Complete Registration",
      description: "Fill out the membership application form with your personal details and upload your photo",
      icon: UserPlus,
      status: "pending"
    },
    {
      step: 2,
      title: "Make Payment",
      description: "Secure payment via mobile money, bank transfer, or card payment",
      icon: CreditCard,
      status: "pending"
    },
    {
      step: 3,
      title: "ID Generation",
      description: "Your unique membership ID is automatically generated upon payment confirmation",
      icon: IdCard,
      status: "pending"
    },
    {
      step: 4,
      title: "Download Credentials",
      description: "Receive your official membership card and certificate via email",
      icon: Download,
      status: "pending"
    }
  ];

  const memberBenefits = [
    {
      icon: Shield,
      title: "Official Recognition",
      description: "Recognized SPLM member status with official documentation"
    },
    {
      icon: Users,
      title: "Community Network",
      description: "Connect with fellow SPLM members across Uganda and beyond"
    },
    {
      icon: Globe,
      title: "Pan-African Links",
      description: "Access to broader SPLM network and African liberation movements"
    },
    {
      icon: FileText,
      title: "Historical Archives",
      description: "Access to SPLM historical documents and educational materials"
    }
  ];

  return (
    <section id="membership" className="py-20 bg-gradient-to-b from-muted to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Join the <span className="text-primary">Movement</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Become an official member of SPLM Uganda Chapter and help continue 
            the legacy of liberation and democratic progress.
          </p>
        </div>

        {/* Membership Plans */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">
            Choose Your <span className="text-secondary">Membership</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {membershipPlans.map((plan) => (
              <Card 
                key={plan.id}
                className={`relative cursor-pointer transition-all duration-300 hover:shadow-xl ${
                  selectedPlan === plan.id 
                    ? 'border-primary shadow-xl scale-105' 
                    : plan.highlight 
                      ? 'border-primary/30 shadow-lg' 
                      : 'border-border hover:border-primary/20'
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge variant="secondary" className="bg-secondary text-secondary-foreground px-4 py-1">
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-foreground">
                    {plan.name}
                  </CardTitle>
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-primary">
                      {plan.price}
                    </div>
                    <div className="text-muted-foreground">
                      {plan.period}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {plan.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant={selectedPlan === plan.id ? "default" : "outline"} 
                    className="w-full mt-6"
                    size="lg"
                    asChild
                  >
                    <Link to="/register">
                      {selectedPlan === plan.id ? "Register Now" : "Select & Register"}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Registration Process */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">
            Registration <span className="text-primary">Process</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {registrationSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-8 h-8 text-primary" />
                      </div>
                      <div className="text-2xl font-bold text-primary mb-2">
                        Step {step.step}
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">
                      {step.title}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Member Benefits */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">
            Member <span className="text-secondary">Benefits</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {memberBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-secondary" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-3">
                    {benefit.title}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto border-primary/20 shadow-xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Ready to Join SPLM Uganda Chapter?
              </h3>
              <p className="text-muted-foreground mb-6">
                Start your membership registration today and become part of our historic movement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                <Button variant="hero" size="lg">
                  <UserPlus className="w-5 h-5" />
                  Start Registration
                </Button>
                </Link>
                <a href="#history">
                <Button variant="outline" size="lg">
                  <Clock className="w-5 h-5" />
                  Learn More
                </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MembershipSection;