
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  // Define category images with more reliable links
  const categoryImages = {
    'electronics': "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=300&auto=format&fit=crop",
    'jewelry': "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=300&auto=format&fit=crop",
    'men\'s clothing': "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=300&auto=format&fit=crop",
    'women\'s clothing': "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=300&auto=format&fit=crop"
  };

  return (
    <main>
      <Hero />
      <FeaturedProducts />
      
      {/* Categories Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(categoryImages).map(([category, imageUrl]) => (
              <Link 
                to={`/products?category=${category}`} 
                key={category}
                className="group relative rounded-lg overflow-hidden h-40 bg-gray-200"
              >
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all z-10 flex items-center justify-center">
                  <h3 className="text-white font-semibold text-lg capitalize text-center px-2">
                    {category}
                  </h3>
                </div>
                <img 
                  src={imageUrl} 
                  alt={category}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter signup */}
      <section className="py-16 bg-purple-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-purple-100 max-w-md mx-auto mb-6">
            Subscribe to our newsletter for exclusive offers and latest updates.
          </p>
          <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 rounded-md px-4 py-2 border border-transparent focus:outline-none"
              required
            />
            <Button className="bg-white text-purple-700 hover:bg-purple-100">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Index;
