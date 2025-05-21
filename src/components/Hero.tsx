
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-purple-100 to-purple-50">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Discover Quality Products for Your Lifestyle
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-md mx-auto md:mx-0">
              Explore our collection of premium products designed to enhance your everyday life with style and functionality.
            </p>
            <div className="mt-8 space-x-4">
              <Button asChild className="bg-purple-600 hover:bg-purple-700 px-6 py-6">
                <Link to="/products">
                  Shop Now
                </Link>
              </Button>
              <Button asChild variant="outline" className="px-6 py-6">
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1583744946564-b52d01a7b321?q=80&w=1600&auto=format&fit=crop" 
              alt="Shopping experience" 
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
