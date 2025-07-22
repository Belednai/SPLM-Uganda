import { Button } from "@/components/ui/button";
import { UserPlus, BookOpen, Users } from "lucide-react";
import { Link } from "react-router-dom";
import splmHero from "@/assets/splm-hero.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={splmHero} 
          alt="SPLM Unity" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                SPLM
                <span className="block text-secondary">Uganda Chapter</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl">
                Continuing the Legacy of Liberation, Unity, and Democratic Progress
              </p>
            </div>

            {/* Founding Information */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <p className="text-white/95 text-lg leading-relaxed">
                <span className="font-semibold text-secondary">Founded May 16, 1983</span> by 
                John Garang and Joseph Oduho, the Sudan People's Liberation Movement continues 
                its mission of democratic governance, human rights, and unity across borders.
              </p>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start">
              <Link to="/register">
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  <UserPlus className="w-5 h-5" />
                  Become a Member
                </Button>
              </Link>
              <a href="#history">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white"
                >
                  <BookOpen className="w-5 h-5" />
                  Learn Our History
                </Button>
              </a>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-secondary">1983</div>
                <div className="text-white/80 text-sm">Founded</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-secondary">42+</div>
                <div className="text-white/80 text-sm">Years Strong</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-secondary">Uganda</div>
                <div className="text-white/80 text-sm">Chapter</div>
              </div>
            </div>
          </div>

          {/* Right side content could include additional imagery or information */}
          <div className="hidden lg:block">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Join the Movement</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-white/90">
                    <Users className="w-5 h-5 text-secondary" />
                    <span>Connect with fellow SPLM members in Uganda</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/90">
                    <UserPlus className="w-5 h-5 text-secondary" />
                    <span>Register online and receive your official ID</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/90">
                    <BookOpen className="w-5 h-5 text-secondary" />
                    <span>Access exclusive member resources</span>
                  </div>
                </div>
                <Link to="/register">
                  <Button variant="splm" className="w-full" size="lg">
                    Start Registration
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;