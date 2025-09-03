
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  CreditCardIcon, 
  TruckIcon, 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  HomeIcon,
  ArrowLeftIcon,
  LockClosedIcon
} from "@heroicons/react/24/outline";
import jsPDF from "jspdf";

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    shippingMethod: "standard",
    paymentMethod: "creditCard",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolderName: "",
  });
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({
      ...shippingInfo,
      [name]: value,
    });
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ""
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!shippingInfo.name) errors.name = "Name is required";
    if (!shippingInfo.address) errors.address = "Address is required";
    if (!shippingInfo.phone) errors.phone = "Phone number is required";
    if (!shippingInfo.email) errors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(shippingInfo.email)) errors.email = "Email is invalid";
    
    if (shippingInfo.paymentMethod === "creditCard") {
      if (!shippingInfo.cardNumber) errors.cardNumber = "Card number is required";
      if (!shippingInfo.expiryDate) errors.expiryDate = "Expiry date is required";
      if (!shippingInfo.cvv) errors.cvv = "CVV is required";
      if (!shippingInfo.cardHolderName) errors.cardHolderName = "Cardholder name is required";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const getTotalPrice = () => {
    return cart.reduce((total, book) => total + (book.price * (book.quantity || 1)), 0).toFixed(2);
  };

  const getShippingCost = () => {
    switch (shippingInfo.shippingMethod) {
      case "express": return 15.00;
      case "overnight": return 25.00;
      default: return 350.00;
    }
  };

  // const getTaxAmount = () => {
  //   return (parseFloat(getTotalPrice()) * 0.001).toFixed(2);
  // };

  const getTaxAmount = () => {
  return (parseFloat(getTotalPrice()) * 0.008).toFixed(2);
};

  const getFinalTotal = () => {
    return (parseFloat(getTotalPrice()) + parseFloat(getShippingCost()) + parseFloat(getTaxAmount())).toFixed(2);
  };

  const generateInvoicePDF = () => {
    const doc = new jsPDF();
    
    // Add company logo or title
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text("BOOKSTORE INVOICE", 105, 20, { align: "center" });
    
    // Add order details
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Order Date: ${new Date().toLocaleDateString()}`, 20, 35);
    doc.text(`Order ID: ${Math.floor(100000 + Math.random() * 900000)}`, 20, 42);
    
    // Add customer information
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text("Customer Information:", 20, 60);
    
    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);
    doc.text(`Name: ${shippingInfo.name}`, 20, 70);
    doc.text(`Email: ${shippingInfo.email}`, 20, 77);
    doc.text(`Phone: ${shippingInfo.phone}`, 20, 84);
    doc.text(`Address: ${shippingInfo.address}`, 20, 91);
    
    // Add shipping method
    doc.text(`Shipping Method: ${shippingInfo.shippingMethod}`, 20, 102);
    
    // Add payment method
    doc.text(`Payment Method: ${shippingInfo.paymentMethod}`, 20, 112);
    
    // Add order items header
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text("Order Items:", 20, 127);
    
    // Add order items
    let yPosition = 137;
    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);
    
    // Table headers
    doc.text("Item", 20, yPosition);
    doc.text("Qty", 100, yPosition);
    doc.text("Price", 140, yPosition);
    doc.text("Total", 180, yPosition);
    
    yPosition += 10;
    
    // Draw a line under headers
    doc.line(20, yPosition - 5, 190, yPosition - 5);
    
    // Order items
    cart.forEach((item) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      const itemTotal = (item.price * (item.quantity || 1)).toFixed(2);
      
      // Wrap text if title is too long
      const title = doc.splitTextToSize(item.title, 60);
      doc.text(title, 20, yPosition);
      doc.text(`${item.quantity || 1}`, 100, yPosition);
      doc.text(`Rs.${item.price.toFixed(2)}`, 140, yPosition);
      doc.text(`Rs.${itemTotal}`, 180, yPosition);
      
      yPosition += Math.max(10, title.length * 3);
    });
    
    // Add totals
    if (yPosition > 230) {
      doc.addPage();
      yPosition = 20;
    } else {
      yPosition += 10;
    }
    
    doc.line(20, yPosition, 190, yPosition);
    yPosition += 10;
    
    doc.text("Subtotal:", 150, yPosition);
    doc.text(`Rs.${getTotalPrice()}`, 180, yPosition, { align: "left" });
    yPosition += 10;
    
    doc.text("Shipping:", 150, yPosition);
    doc.text(`Rs.${getShippingCost()}`, 180, yPosition, { align: "left" });
    yPosition += 10;
    
    doc.text("Tax:", 150, yPosition);
    doc.text(`Rs.${getTaxAmount()}`, 180, yPosition, { align: "left" });
    yPosition += 10;
    
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text("Grand Total:", 150, yPosition);
    doc.text(`Rs.${getFinalTotal()}`, 180, yPosition, { align: "left" });
    
    // Add thank you message
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text("Thank you for your purchase!", 105, yPosition + 20, { align: "center" });
    
    // Save the PDF
    doc.save(`invoice-${new Date().getTime()}.pdf`);
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;
    
    setLoading(true);

    const checkoutData = {
      cartItems: cart,
      name: shippingInfo.name,
      address: shippingInfo.address,
      phone: shippingInfo.phone,
      email: shippingInfo.email,
      shippingMethod: shippingInfo.shippingMethod,
      paymentMethod: shippingInfo.paymentMethod,
      cardNumber: shippingInfo.cardNumber,
      expiryDate: shippingInfo.expiryDate,
      cvv: shippingInfo.cvv,
      cardHolderName: shippingInfo.cardHolderName,
      totalPrice: getTotalPrice(),
      shippingCost: getShippingCost(),
      taxAmount: getTaxAmount(),
      finalTotal: getFinalTotal()
    };

    try {
      await axios.post("http://localhost:8080/api/checkout", checkoutData);
      
      // Generate and download the invoice PDF
      generateInvoicePDF();
      
      // Show success message
      alert("Order placed successfully! Your invoice is downloading.");
      
      // Clear cart
      localStorage.removeItem("cart");
      setCart([]);
      setLoading(false);

      // Navigate to the Download PDF page after placing the order
      navigate("/home");
    } catch (error) {
      console.error("Error placing order", error);
      alert("Error placing the order. Please try again.");
      setLoading(false);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  // Function to handle image loading errors
  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/60x80?text=No+Image";
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center relative overflow-hidden">
        {/* Background with bookshop theme */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 to-brown-900/10"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMiI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8 text-center max-w-md border border-amber-100 z-10">
          <h2 className="text-2xl font-semibold text-amber-600 mb-4">Your cart is empty</h2>
          <p className="text-amber-700 mb-6">There's nothing to checkout. Add some books to your cart first.</p>
          <button
            onClick={() => navigate("/")}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform duration-200"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 py-8 relative overflow-hidden">
      {/* Background with bookshop theme */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 to-brown-900/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRo=" />
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

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <button 
          onClick={goBack}
          className="flex items-center text-amber-700 hover:text-amber-900 transition-colors mb-6"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Back to Cart
        </button>

        <h1 className="text-3xl font-bold text-amber-800 mb-8 font-serif">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Forms */}
          <div className="lg:w-2/3">
            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-amber-100">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-amber-800">
                <TruckIcon className="h-6 w-6 mr-2 text-amber-600" />
                Order Summary ({cart.length} {cart.length === 1 ? 'item' : 'items'})
              </h2>
              
              <div className="space-y-4">
                {cart.map((book) => (
                  <div key={book.id} className="flex items-center py-3 border-b border-amber-100 last:border-0">
                    <img
                      src={`http://localhost:8080/api/books/uploads/${book.image}`}
                      alt={book.title}
                      className="w-16 h-20 object-cover rounded-lg shadow-sm mr-4 border border-amber-200"
                      onError={handleImageError}
                    />
                    
                    <div className="flex-grow">
                      <h3 className="font-semibold text-amber-900">{book.title}</h3>
                      <p className="text-amber-700 text-sm">by {book.author}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-amber-600 font-bold">Rs.{book.price.toFixed(2)}</span>
                        <span className="text-amber-700">Qty: {book.quantity || 1}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-amber-100">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-amber-800">
                <UserIcon className="h-6 w-6 mr-2 text-amber-600" />
                Shipping Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-amber-700 mb-1">Full Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-400" />
                    <input
                      type="text"
                      name="name"
                      value={shippingInfo.name}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2 border ${formErrors.name ? 'border-red-500' : 'border-amber-200'} rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-amber-700 mb-1">Address</label>
                  <div className="relative">
                    <HomeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-400" />
                    <input
                      type="text"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2 border ${formErrors.address ? 'border-red-500' : 'border-amber-200'} rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500`}
                      placeholder="Enter your address"
                    />
                  </div>
                  {formErrors.address && <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-amber-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-400" />
                    <input
                      type="text"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2 border ${formErrors.phone ? 'border-red-500' : 'border-amber-200'} rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500`}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-amber-700 mb-1">Email Address</label>
                  <div className="relative">
                    <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-400" />
                    <input
                      type="email"
                      name="email"
                      value={shippingInfo.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2 border ${formErrors.email ? 'border-red-500' : 'border-amber-200'} rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500`}
                      placeholder="Enter your email address"
                    />
                  </div>
                  {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-amber-700 mb-1">Shipping Method</label>
                  <select
                    name="shippingMethod"
                    value={shippingInfo.shippingMethod}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="standard">Standard Shipping (Rs.350.00) - 5-7 business days</option>
                    <option value="express">Express Shipping (Rs.150.00) - 2-3 business days</option>
                    <option value="overnight">Overnight Shipping (Rs.500.00) - Next business day</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-amber-100">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-amber-800">
                <CreditCardIcon className="h-6 w-6 mr-2 text-amber-600" />
                Payment Information
              </h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-amber-700 mb-1">Payment Method</label>
                <select
                  name="paymentMethod"
                  value={shippingInfo.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="creditCard">Credit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="cashOnDelivery">Cash on Delivery</option>
                </select>
              </div>

              {shippingInfo.paymentMethod === "creditCard" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-amber-700 mb-1">Card Number</label>
                    <div className="relative">
                      <CreditCardIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-400" />
                      <input
                        type="text"
                        name="cardNumber"
                        value={shippingInfo.cardNumber}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-2 border ${formErrors.cardNumber ? 'border-red-500' : 'border-amber-200'} rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500`}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                      />
                    </div>
                    {formErrors.cardNumber && <p className="text-red-500 text-xs mt-1">{formErrors.cardNumber}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-amber-700 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={shippingInfo.expiryDate}
                      onChange={handleInputChange}
                      className={`w-full p-2 border ${formErrors.expiryDate ? 'border-red-500' : 'border-amber-200'} rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500`}
                      placeholder="MM/YY"
                      maxLength="5"
                    />
                    {formErrors.expiryDate && <p className="text-red-500 text-xs mt-1">{formErrors.expiryDate}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-amber-700 mb-1">CVV</label>
                    <div className="relative">
                      <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-400" />
                      <input
                        type="text"
                        name="cvv"
                        value={shippingInfo.cvv}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-2 border ${formErrors.cvv ? 'border-red-500' : 'border-amber-200'} rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500`}
                        placeholder="123"
                        maxLength="3"
                      />
                    </div>
                    {formErrors.cvv && <p className="text-red-500 text-xs mt-1">{formErrors.cvv}</p>}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-amber-700 mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      name="cardHolderName"
                      value={shippingInfo.cardHolderName}
                      onChange={handleInputChange}
                      className={`w-full p-2 border ${formErrors.cardHolderName ? 'border-red-500' : 'border-amber-200'} rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500`}
                      placeholder="Enter cardholder name"
                    />
                    {formErrors.cardHolderName && <p className="text-red-500 text-xs mt-1">{formErrors.cardHolderName}</p>}
                  </div>
                </div>
              )}
              
              {shippingInfo.paymentMethod === "paypal" && (
                <div className="bg-amber-50 p-4 rounded-lg text-center border border-amber-200">
                  <p className="text-amber-700">You will be redirected to PayPal to complete your payment</p>
                </div>
              )}
              
              {shippingInfo.paymentMethod === "cashOnDelivery" && (
                <div className="bg-amber-50 p-4 rounded-lg text-center border border-amber-200">
                  <p className="text-amber-700">You will pay when your order is delivered</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6 border border-amber-100">
              <h2 className="text-xl font-semibold mb-6 pb-4 border-b border-amber-200 text-amber-800">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-amber-700">Subtotal</span>
                  <span className="font-medium text-amber-900">Rs.{getTotalPrice()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-amber-700">Shipping</span>
                  <span className="font-medium text-amber-900">Rs.{getShippingCost()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-amber-700">Tax</span>
                  <span className="font-medium text-amber-900">Rs.{getTaxAmount()}</span>
                </div>
                
                <div className="pt-4 border-t border-amber-200 flex justify-between text-lg font-semibold">
                  <span className="text-amber-800">Total</span>
                  <span className="text-amber-900">Rs.{getFinalTotal()}</span>
                </div>
              </div>
              
              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className={`w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center ${loading ? 'opacity-50 cursor-not-allowed' : ''} shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform duration-200`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  `Place Order - Rs.${getFinalTotal()}`
                )}
              </button>
              
              <p className="text-xs text-amber-600 mt-4 text-center">
                By placing your order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;