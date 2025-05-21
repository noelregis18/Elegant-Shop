
import { Product } from "@/types/product";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  return (
    <div className="group rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <Link to={`/product/${product.id}`} className="block aspect-square overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-contain p-4 transition-transform group-hover:scale-105"
          loading="lazy"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-lg font-medium text-gray-900 line-clamp-1 hover:text-purple-600 transition-colors">
            {product.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            {product.description}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <span className="font-semibold text-lg text-gray-900">${product.price.toFixed(2)}</span>
            <div className="flex items-center space-x-1">
              <span className="text-sm text-gray-500">
                {product.rating.rate} ★ ({product.rating.count})
              </span>
            </div>
          </div>
        </Link>
        <Button 
          className="w-full mt-4 bg-purple-600 hover:bg-purple-700"
          onClick={() => addToCart(product)}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
