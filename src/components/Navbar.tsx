
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    // Scroll to top when route changes
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Pre-cache critical pages for faster navigation
  useEffect(() => {
    // Create link prefetch elements for main routes
    const routes = ["/", "/tips", "/schedules", "/reviews", "/faq", "/learn-more"];
    
    // Create a hidden prefetch link for each route
    routes.forEach(route => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = route;
      link.as = 'document';
      document.head.appendChild(link);
    });
    
    // Set page transition style to prevent white flash
    const style = document.createElement('style');
    style.textContent = `
      body { 
        transition: opacity 0.2s ease;
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      // Clean up
      document.querySelectorAll('link[rel="prefetch"]').forEach(el => el.remove());
      style.remove();
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to handle navigation and ensure quick page transitions
  const handleNavigation = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Only apply transition if navigating to a different page
    if (location.pathname !== path) {
      // Set opacity to 1 immediately to prevent flash
      document.body.style.opacity = '1';
      
      navigate(path);
      window.scrollTo(0, 0);
    }
  };

  // Function for the get started button
  const handleGetStarted = (e: React.MouseEvent) => {
    e.preventDefault();
    document.body.style.opacity = '1';
    navigate("/schedules");
    window.scrollTo(0, 0);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center cursor-pointer transition-transform hover:scale-105"
              onClick={handleNavigation("/")}
            >
              <Clock className="h-8 w-8 text-clockify-blue" />
              <span className="ml-2 text-xl font-bold text-clockify-darkBlue">
                clockifyy
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link 
              to="/" 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-clockify-blue transition-all hover:scale-105"
              onClick={handleNavigation("/")}
            >
              Home
            </Link>
            <Link 
              to="/tips" 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-clockify-blue transition-all hover:scale-105"
              onClick={handleNavigation("/tips")}
            >
              Tips
            </Link>
            <Link 
              to="/schedules" 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-clockify-blue transition-all hover:scale-105"
              onClick={handleNavigation("/schedules")}
            >
              Schedules
            </Link>
            <Link 
              to="/reviews" 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-clockify-blue transition-all hover:scale-105"
              onClick={handleNavigation("/reviews")}
            >
              Reviews
            </Link>
            <Link 
              to="/faq" 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-clockify-blue transition-all hover:scale-105"
              onClick={handleNavigation("/faq")}
            >
              FAQ
            </Link>
            <Button 
              className="ml-4 bg-clockify-blue hover:bg-clockify-darkBlue transition-all transform hover:scale-105"
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 transition-colors hover:text-clockify-blue"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                /* Icon when menu is open */
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-clockify-blue transition-colors"
              onClick={handleNavigation("/")}
            >
              Home
            </Link>
            <Link 
              to="/tips" 
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-clockify-blue transition-colors"
              onClick={handleNavigation("/tips")}
            >
              Tips
            </Link>
            <Link 
              to="/schedules" 
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-clockify-blue transition-colors"
              onClick={handleNavigation("/schedules")}
            >
              Schedules
            </Link>
            <Link 
              to="/reviews" 
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-clockify-blue transition-colors"
              onClick={handleNavigation("/reviews")}
            >
              Reviews
            </Link>
            <Link 
              to="/faq" 
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-clockify-blue transition-colors"
              onClick={handleNavigation("/faq")}
            >
              FAQ
            </Link>
            <Link
              to="/learn-more"
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-clockify-blue transition-colors"
              onClick={handleNavigation("/learn-more")}
            >
              Learn More
            </Link>
            <Button 
              className="w-full mt-4 bg-clockify-blue hover:bg-clockify-darkBlue transition-transform hover:scale-105"
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
