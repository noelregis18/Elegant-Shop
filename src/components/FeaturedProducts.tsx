
import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products?limit=4');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  // Skeleton loader for loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <Skeleton className="h-64 w-full mb-4" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
