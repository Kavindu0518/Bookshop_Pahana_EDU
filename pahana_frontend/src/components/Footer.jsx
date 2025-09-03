import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo / About */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3">MyWebsite</h2>
          <p className="text-sm">
            Building modern web experiences with React & Tailwind.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
            <li><Link to="/about" className="hover:text-blue-400">About</Link></li>
            <li><Link to="/services" className="hover:text-blue-400">Services</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400">Contact</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            {/* Social Media Icons removed */}
            <a href="https://facebook.com" className="hover:text-blue-400" aria-label="Facebook">
              Facebook
            </a>
            <a href="https://twitter.com" className="hover:text-blue-400" aria-label="Twitter">
              Twitter
            </a>
            <a href="https://instagram.com" className="hover:text-blue-400" aria-label="Instagram">
              Instagram
            </a>
            <a href="https://linkedin.com" className="hover:text-blue-400" aria-label="LinkedIn">
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-6">
        © {new Date().getFullYear()} MyWebsite. All rights reserved.
      </div>
    </footer>
  );
}
