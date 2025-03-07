
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-clockify-darkBlue text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center">
              <Clock className="h-8 w-8 text-white" />
              <span className="ml-2 text-xl font-bold text-white">Clockify</span>
            </Link>
            <p className="mt-4 text-sm text-gray-300">
              Smart time management for teens, helping you balance school, hobbies, and rest.
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Navigation</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/tips" className="text-gray-300 hover:text-white">Tips</Link>
              </li>
              <li>
                <Link to="/schedules" className="text-gray-300 hover:text-white">Schedules</Link>
              </li>
              <li>
                <Link to="/reviews" className="text-gray-300 hover:text-white">Reviews</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white">FAQ</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Blog</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Support</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Terms of Service</a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Connect</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Twitter</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Instagram</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Facebook</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">TikTok</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-600 pt-8 flex justify-between items-center">
          <p className="text-sm text-gray-300">
            © {new Date().getFullYear()} Clockify. All rights reserved.
          </p>
          <p className="text-sm text-gray-300">
            Designed for teenagers 13-18
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
