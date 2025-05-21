
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MinusCircle, PlusCircle, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchProduct();
    }
  }, [id]);
  
  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-96 w-full rounded-lg" />
          <div>
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/4 mb-6" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-6" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="text-red-500 mb-4">{error || "Product not found"}</div>
        <Button asChild>
          <Link to="/products">Back to Products</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link to="/products" className="text-purple-600 hover:underline">
          ← Back to Products
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg p-8 border border-gray-200 flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.title} 
            className="max-h-80 object-contain"
          />
        </div>
        
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
          
          <div className="mt-4 flex items-center">
            <div className="text-xl font-semibold text-gray-900">
              ${product.price.toFixed(2)}
            </div>
            <div className="ml-4 flex items-center text-sm text-yellow-500">
              {Array.from({ length: 5 }).map((_, index) => (
                <span key={index} className={index < Math.round(product.rating.rate) ? "text-yellow-400" : "text-gray-300"}>
                  ★
                </span>
              ))}
              <span className="ml-1 text-gray-600">({product.rating.count} reviews)</span>
            </div>
          </div>
          
          <p className="mt-6 text-gray-700">{product.description}</p>
          
          <div className="mt-6">
            <div className="text-sm font-medium text-gray-500 mb-1">Category</div>
            <div className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm capitalize">
              {product.category}
            </div>
          </div>
          
          <div className="mt-6">
            <div className="text-sm font-medium text-gray-900 mb-2">Quantity</div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                <MinusCircle className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                <PlusCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Button 
            className="mt-8 w-full bg-purple-600 hover:bg-purple-700 py-6 text-lg"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
