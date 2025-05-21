
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="font-bold text-2xl text-purple-700">ElegantShop</Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors">Home</Link>
          <Link to="/products" className="text-gray-700 hover:text-purple-600 transition-colors">Products</Link>
          <Link to="/contact" className="text-gray-700 hover:text-purple-600 transition-colors">Contact</Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
            <ShoppingCart className="h-6 w-6 text-gray-700" />
            <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              0
            </span>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="p-2 md:hidden rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-purple-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="text-gray-700 hover:text-purple-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-purple-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
