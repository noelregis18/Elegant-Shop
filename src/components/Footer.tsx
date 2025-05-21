
import { Github, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { 
      name: "LinkedIn", 
      icon: <Linkedin className="h-5 w-5" />, 
      url: "https://www.linkedin.com/in/noel-regis-aa07081b1/" 
    },
    { 
      name: "GitHub", 
      icon: <Github className="h-5 w-5" />, 
      url: "https://github.com/noelregis18" 
    },
    { 
      name: "Twitter", 
      icon: <Twitter className="h-5 w-5" />, 
      url: "https://x.com/NoelRegis8" 
    },
    { 
      name: "Email", 
      icon: <Mail className="h-5 w-5" />, 
      url: "mailto:noel.regis04@gmail.com" 
    },
    { 
      name: "Phone", 
      icon: <Phone className="h-5 w-5" />, 
      url: "tel:+917319546900" 
    },
    { 
      name: "Location", 
      icon: <MapPin className="h-5 w-5" />, 
      url: "https://www.google.com/maps/place/Asansol,+West+Bengal,+India" 
    },
  ];

  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="font-bold text-2xl text-purple-700">ElegantShop</Link>
            <p className="mt-4 text-gray-600 max-w-md">
              Discover our curated collection of premium products designed to elevate your everyday experience.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/" className="text-gray-600 hover:text-purple-600">Home</Link>
              <Link to="/products" className="text-gray-600 hover:text-purple-600">Products</Link>
              <Link to="/contact" className="text-gray-600 hover:text-purple-600">Contact</Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Reach Out</h3>
            <div className="flex flex-col space-y-4">
              {socialLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
                >
                  {link.icon}
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-6 text-center text-gray-500">
          <p>&copy; {currentYear} ElegantShop. All rights reserved.</p>
          <p className="mt-2">
            <a 
              href="http://topmate.io/noel_regis" 
              target="_blank" 
              rel="noreferrer"
              className="text-purple-600 hover:underline"
            >
              Connect on Topmate
            </a>
          </p>
          <p className="mt-2 text-gray-600">
            Designed and Developed by Noel Regis
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
