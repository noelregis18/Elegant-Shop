
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  
  const [sortOption, setSortOption] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || "all");
  
  const categories = ["all", "electronics", "jewelery", "men's clothing", "women's clothing"];
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let url = 'https://fakestoreapi.com/products';
        
        if (selectedCategory && selectedCategory !== "all") {
          url = `https://fakestoreapi.com/products/category/${selectedCategory}`;
        }
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        let data = await response.json();
        
        // Apply sorting
        if (sortOption === "price-low-high") {
          data = data.sort((a: Product, b: Product) => a.price - b.price);
        } else if (sortOption === "price-high-low") {
          data = data.sort((a: Product, b: Product) => b.price - a.price);
        } else if (sortOption === "rating") {
          data = data.sort((a: Product, b: Product) => b.rating.rate - a.rating.rate);
        }
        
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [selectedCategory, sortOption]);
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    setSearchParams(searchParams);
  };
  
  // Skeleton loader for loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Products</h1>
        <div className="flex flex-wrap gap-4 mb-6">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="h-10 w-24" />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
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
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Products</h1>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-md text-sm ${
                selectedCategory === category 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category === "all" ? "All Products" : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="w-full sm:w-auto">
          <Select
            value={sortOption}
            onValueChange={(value) => setSortOption(value)}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price-low-high">Price: Low to High</SelectItem>
              <SelectItem value="price-high-low">Price: High to Low</SelectItem>
              <SelectItem value="rating">Best Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {products.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
