import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import splmLogo from "@/assets/splm-uganda-logo.png";

const Footer = () => {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Organization Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src={splmLogo} 
                alt="SPLM Uganda Chapter" 
                className="h-12 w-12 object-contain bg-white/10 rounded-lg p-2"
              />
              <div>
                <h3 className="text-xl font-bold">SPLM Uganda Chapter</h3>
                <p className="text-primary-foreground/80 text-sm">Sudan People's Liberation Movement</p>
              </div>
            </div>
            <p className="text-primary-foreground/90 leading-relaxed mb-6">
              Continuing the legacy of liberation and democratic progress. Join our community 
              of South Sudanese diaspora in Uganda working towards unity, justice, and development.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-primary-foreground/90">
                <MapPin className="w-5 h-5 text-secondary" />
                <span>Kampala, Uganda</span>
              </div>
              <div className="flex items-center space-x-3 text-primary-foreground/90">
                <Phone className="w-5 h-5 text-secondary" />
                <span>+256 XXX XXX XXX</span>
              </div>
              <div className="flex items-center space-x-3 text-primary-foreground/90">
                <Mail className="w-5 h-5 text-secondary" />
                <span>info@splm-uganda.org</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#history" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Our History
                </a>
              </li>
              <li>
                <a href="#mission" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Mission & Values
                </a>
              </li>
              <li>
                <a href="#membership" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Membership
                </a>
              </li>
              <li>
                <a href="#contact" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/admin" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Admin Portal
                </a>
              </li>
            </ul>
          </div>

          {/* Membership & Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              <li>
                <span className="text-primary-foreground/80">Member Registration</span>
              </li>
              <li>
                <span className="text-primary-foreground/80">ID Card Generation</span>
              </li>
              <li>
                <span className="text-primary-foreground/80">Community Events</span>
              </li>
              <li>
                <span className="text-primary-foreground/80">Diaspora Support</span>
              </li>
              <li>
                <span className="text-primary-foreground/80">Educational Resources</span>
              </li>
            </ul>
            <div className="mt-6">
              <Button variant="secondary" size="sm" className="w-full">
                Join Today
              </Button>
            </div>
          </div>
        </div>

        {/* Social Media & Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-primary-foreground/80 text-sm">
              © 2025 SPLM Uganda Chapter. All rights reserved.
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-secondary p-2">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-secondary p-2">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-secondary p-2">
                <Instagram className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-primary-foreground/60 text-xs">
              Founded May 16, 1983 | John Garang de Mabior & Joseph Oduho | Unity, Peace, Progress
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;