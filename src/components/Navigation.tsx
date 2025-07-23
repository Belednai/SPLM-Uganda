import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, UserPlus, Home, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-card/95 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src={logo} 
              alt="SPLM Uganda Chapter" 
              className="h-10 w-10 object-contain"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-primary">SPLM Uganda</h1>
              <p className="text-xs text-muted-foreground">Liberation Movement</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === '/' ? 'text-primary' : 'text-foreground'
            }`}>
              <Home className="w-4 h-4 inline mr-2" />
              Home
            </Link>
            <a href="#history" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              History
            </a>
            <a href="#mission" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Mission
            </a>
            <a href="#membership" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Membership
            </a>
            <Link to="/register" className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === '/register' ? 'text-primary' : 'text-foreground'
            }`}>
              Register
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/register">
              <Button variant="splm" size="sm">
                <UserPlus className="w-4 h-4" />
                Join Now
            </Button>
            </Link>
            <Link to="/admin/login">
              <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
              Admin
            </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-card/95 backdrop-blur-md">
            {/* Mobile Navigation Links */}
            <div className="space-y-4 pt-6 px-2 pb-3">
              <Link 
                to="/" 
                className={`block px-3 py-2 text-base font-medium transition-colors hover:text-primary ${
                  location.pathname === '/' ? 'text-primary' : 'text-foreground'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="w-4 h-4 inline mr-2" />
                Home
              </Link>
              <a 
                href="#history" 
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                History
              </a>
              <a 
                href="#mission" 
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Mission
              </a>
              <a 
                href="#membership" 
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Membership
              </a>
              <Link 
                to="/register" 
                className={`block px-3 py-2 text-base font-medium transition-colors hover:text-primary ${
                  location.pathname === '/register' ? 'text-primary' : 'text-foreground'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </div>

            {/* Mobile CTA */}
            <div className="pt-6 mt-6 border-t border-border px-2 pb-3 space-y-2">
              <Link to="/register">
                <Button variant="hero" className="w-full" onClick={() => setIsMenuOpen(false)}>
                  <UserPlus className="w-4 h-4" />
                  Join SPLM Uganda Chapter
                </Button>
              </Link>
              <Link to="/admin/login">
                <Button variant="outline" className="w-full" onClick={() => setIsMenuOpen(false)}>
                  <Settings className="w-4 h-4" />
                  Admin Login
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;