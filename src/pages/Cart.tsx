
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Trash2, PlusCircle, MinusCircle, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
  
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Your Cart</h1>
        <div className="text-center py-16">
          <div className="mb-6 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-700">Your cart is empty</h2>
          <p className="text-gray-500 mt-2 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Your Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cartItems.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b">
              <div className="w-full sm:w-24 h-24 bg-gray-100 rounded flex items-center justify-center mr-4 mb-4 sm:mb-0">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="h-16 w-16 object-contain"
                />
              </div>
              
              <div className="flex-1">
                <Link to={`/product/${item.id}`} className="font-medium text-gray-900 hover:text-purple-600 transition-colors">
                  {item.title}
                </Link>
                <p className="text-sm text-gray-500">
                  ${item.price.toFixed(2)} each
                </p>
              </div>
              
              <div className="flex items-center mt-4 sm:mt-0">
                <div className="flex items-center border rounded mr-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="font-semibold text-right w-20 mr-4">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              className="text-red-500 hover:text-red-700"
              onClick={clearCart}
            >
              Clear Cart
            </Button>
            
            <Button asChild variant="outline" className="text-purple-600">
              <Link to="/products">
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 bg-gray-50">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>FREE</span>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex justify-between font-semibold mb-6">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            
            <Button className="w-full bg-purple-600 hover:bg-purple-700 py-6">
              Proceed to Checkout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <div className="mt-4 text-xs text-gray-500 text-center">
              Secure checkout powered by Stripe
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
