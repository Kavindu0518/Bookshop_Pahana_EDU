

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  TrashIcon, 
  PlusIcon, 
  MinusIcon, 
  ArrowLeftIcon,
  ShoppingBagIcon
} from "@heroicons/react/24/outline";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateQuantity = (bookId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cart.map(item => 
      item.id === bookId ? { ...item, quantity: newQuantity } : item
    );
    
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (bookId) => {
    const updatedCart = cart.filter((book) => book.id !== bookId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, book) => total + (book.price * book.quantity), 0).toFixed(2);
  };

  const getItemCount = () => {
    return cart.reduce((total, book) => total + book.quantity, 0);
  };

  const getTaxAmount = () => {
    return (parseFloat(getTotalPrice()) * 0.008).toFixed(2); // 8% tax calculation
  };

  const handleCheckout = () => {
    if (cart.length > 0) {
      navigate("/checkout");
    } else {
      alert("Your cart is empty. Please add items to your cart before proceeding.");
    }
  };

  const continueShopping = () => {
    navigate("/home");
  };

  // Function to handle image loading errors
  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/80x100?text=No+Image";
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gray-50 py-8">
      {/* Background with bookshop theme */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 to-brown-900/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMiI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
      </div>

      {/* Decorative book elements */}
      <div className="absolute top-10 left-10 w-16 h-16 z-10 opacity-20">
        <div className="w-full h-full bg-amber-400 rounded-lg transform rotate-12 shadow-lg"></div>
      </div>
      <div className="absolute bottom-16 right-14 w-20 h-12 z-10 opacity-20">
        <div className="w-full h-full bg-red-600 rounded transform -rotate-6 shadow-lg"></div>
      </div>
      <div className="absolute top-1/3 right-1/4 w-14 h-10 z-10 opacity-20">
        <div className="w-full h-full bg-green-600 rounded transform rotate-45 shadow-lg"></div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl z-10">
        <div className="flex items-center mb-6">
          <button 
            onClick={continueShopping}
            className="flex items-center text-amber-700 hover:text-amber-900 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-1" />
            Continue Shopping
          </button>
          <h1 className="text-3xl font-bold text-amber-800 ml-4 font-serif">Your Shopping Cart</h1>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <ShoppingBagIcon className="h-16 w-16 text-amber-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-amber-600 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <button
              onClick={continueShopping}
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-amber-100">
                <div className="p-6 border-b border-amber-100 bg-amber-50">
                  <h2 className="text-xl font-semibold text-amber-800">Cart Items ({getItemCount()})</h2>
                </div>
                
                <div className="divide-y divide-amber-100">
                  {cart.map((book) => (
                    <div key={book.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center">
                      <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                        <img
                          src={`http://localhost:8080/api/books/uploads/${book.image}`}
                          alt={book.title}
                          className="w-20 h-24 object-cover rounded-lg shadow-sm border border-amber-200"
                          onError={handleImageError}
                        />
                      </div>
                      

                      <div className="flex-grow">
                        <h3 className="text-lg font-semibold text-amber-900">{book.title}</h3>
                        <p className="text-amber-700 text-sm">by {book.author}</p>
                        <p className="text-amber-600 font-bold mt-1">Rs.{book.price.toFixed(2)}</p>
                        
                        <div className="flex items-center mt-4">
                          <span className="text-sm text-amber-700 mr-4">Quantity:</span>
                          <div className="flex items-center border border-amber-300 rounded-lg">
                            <button
                              onClick={() => updateQuantity(book.id, book.quantity - 1)}
                              className="p-1 text-amber-700 hover:bg-amber-50 transition-colors"
                              disabled={book.quantity <= 1}
                            >
                              <MinusIcon className="h-4 w-4" />
                            </button>
                            <span className="px-3 py-1 text-amber-900">{book.quantity}</span>
                            <button
                              onClick={() => updateQuantity(book.id, book.quantity + 1)}
                              className="p-1 text-amber-700 hover:bg-amber-50 transition-colors"
                            >
                              <PlusIcon className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeFromCart(book.id)}
                            className="ml-6 flex items-center text-red-600 hover:text-red-800 transition-colors"
                          >
                            <TrashIcon className="h-5 w-5 mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                      

                      <div className="mt-4 sm:mt-0 sm:ml-6 text-right">
                        <p className="text-lg font-semibold text-amber-900">
                          RS.{(book.price * book.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-6 border border-amber-100">
                <h2 className="text-xl font-semibold mb-6 pb-4 border-b border-amber-100 text-amber-800">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-amber-700">Subtotal</span>
                    <span className="font-medium text-amber-900">Rs.{getTotalPrice()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-amber-700">Shipping</span>
                    <span className="font-medium text-amber-900">Rs.350.00</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-amber-700">Tax</span>
                    <span className="font-medium text-amber-900">Rs.{getTaxAmount()}</span>
                  </div>
                  
                  <div className="pt-4 border-t border-amber-100 flex justify-between text-lg font-semibold">
                    <span className="text-amber-800">Total</span>
                    <span className="text-amber-900">Rs.{(parseFloat(getTotalPrice()) + 350 + parseFloat(getTaxAmount())).toFixed(2)}</span>
                  </div>
                </div>
                
                <button
                  onClick={handleCheckout}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold transition-colors mb-4 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform duration-200"
                >
                  Proceed to Checkout
                </button>
                
                <p className="text-sm text-amber-600 text-center">
                  Free shipping on orders over Rs.350.00
                </p>
                
                <div className="mt-6 pt-6 border-t border-amber-100">
                  <h3 className="font-semibold mb-3 text-amber-800">You might also like</h3>
                  <ul className="text-sm text-amber-700 space-y-1">
                    <li><a href="#" className="hover:text-amber-900 hover:underline">Bestsellers</a></li>
                    <li><a href="#" className="hover:text-amber-900 hover:underline">New Releases</a></li>
                    <li><a href="#" className="hover:text-amber-900 hover:underline">Top Rated Books</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
