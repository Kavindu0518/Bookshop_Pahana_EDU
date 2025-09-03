import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { 
  DocumentArrowDownIcon, 
  CheckCircleIcon,
  ShoppingCartIcon,
  TruckIcon,
  CreditCardIcon,
  HomeIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";
import { useNavigate, useLocation } from "react-router-dom";

const DownloadPDFPage = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Get order data from location state or localStorage
  useEffect(() => {
    try {
      if (location.state && location.state.orderData) {
        const orderDataFromState = location.state.orderData;
        setOrderData(orderDataFromState);
        localStorage.setItem("lastOrder", JSON.stringify(orderDataFromState));
      } else {
        const savedOrder = localStorage.getItem("lastOrder");
        if (savedOrder) {
          setOrderData(JSON.parse(savedOrder));
        } else {
          // If no order data is found, show error
          setError("No order data found. Please complete a purchase first.");
        }
      }
    } catch (err) {
      console.error("Error loading order data:", err);
      setError("Failed to load order information. Please try again.");
    }
  }, [location.state]);

  // Function to safely extract data with fallbacks
  const getOrderData = () => {
    if (!orderData) return null;
    
    return {
      orderId: orderData.orderId || `#ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      orderDate: orderData.orderDate || new Date().toLocaleDateString(),
      items: orderData.cartItems || orderData.items || [
        { 
          title: "Unknown Product", 
          author: "Unknown Author", 
          price: 0.00, 
          quantity: 1 
        }
      ],
      shipping: orderData.shipping || {
        name: orderData.name || "Not provided",
        address: orderData.address || "Not provided",
        city: orderData.city || "",
        state: orderData.state || "",
        zipCode: orderData.zipCode || "",
        country: orderData.country || "Not provided",
        phone: orderData.phone || "Not provided",
        email: orderData.email || "Not provided"
      },
      payment: orderData.payment || {
        method: orderData.paymentMethod || "Not specified",
        cardType: orderData.cardType || "",
        lastFour: orderData.lastFour || "****"
      },
      subtotal: orderData.totalPrice || orderData.subtotal || 0,
      tax: orderData.taxAmount || orderData.tax || 0,
      shippingCost: orderData.shippingCost || orderData.shipping || 0,
      total: orderData.finalTotal || orderData.total || 0
    };
  };

  const dataToUse = getOrderData();

  const downloadPDF = () => {
    if (!dataToUse) {
      setError("Cannot generate PDF without order data");
      return;
    }
    
    setIsGenerating(true);
    setError(null);
    
    setTimeout(() => {
      try {
        const doc = new jsPDF();
        
        // Set styles
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.setTextColor(41, 128, 185);
        doc.text("ORDER CONFIRMATION", 105, 25, { align: "center" });
        
        // Order details header
        doc.setFontSize(12);
        doc.setTextColor(128, 128, 128);
        doc.text(`Order ID: ${dataToUse.orderId}`, 14, 40);
        doc.text(`Order Date: ${dataToUse.orderDate}`, 14, 47);
        
        // Divider line
        doc.setDrawColor(200, 200, 200);
        doc.line(14, 55, 196, 55);
        
        // Items table header
        doc.setFontSize(12);
        doc.setTextColor(41, 128, 185);
        doc.text("ITEMS", 14, 65);
        
        // Table headers
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text("Description", 14, 75);
        doc.text("Qty", 140, 75);
        doc.text("Price", 160, 75);
        doc.text("Total", 180, 75);
        
        // Items list
        let y = 85;
        dataToUse.items.forEach((item) => {
          doc.setFontSize(10);
          doc.setTextColor(50, 50, 50);
          doc.text(`${item.title || "Unknown Item"} by ${item.author || "Unknown Author"}`, 14, y);
          doc.text((item.quantity || 1).toString(), 140, y);
          doc.text(`$${(item.price || 0).toFixed(2)}`, 160, y);
          doc.text(`$${((item.price || 0) * (item.quantity || 1)).toFixed(2)}`, 180, y);
          y += 7;
        });
        
        // Divider line
        doc.line(14, y + 5, 196, y + 5);
        
        // Order summary
        y += 15;
        doc.setTextColor(100, 100, 100);
        doc.text("Subtotal:", 140, y);
        doc.text(`$${dataToUse.subtotal.toFixed(2)}`, 180, y);
        
        y += 7;
        doc.text("Tax:", 140, y);
        doc.text(`$${dataToUse.tax.toFixed(2)}`, 180, y);
        
        y += 7;
        doc.text("Shipping:", 140, y);
        doc.text(`$${dataToUse.shippingCost.toFixed(2)}`, 180, y);
        
        y += 7;
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(41, 128, 185);
        doc.text("Total:", 140, y);
        doc.text(`$${dataToUse.total.toFixed(2)}`, 180, y);
        
        // Shipping information
        y += 20;
        doc.setFontSize(12);
        doc.setTextColor(41, 128, 185);
        doc.text("SHIPPING INFORMATION", 14, y);
        
        y += 10;
        doc.setFontSize(10);
        doc.setTextColor(50, 50, 50);
        doc.text(dataToUse.shipping.name, 14, y);
        y += 7;
        doc.text(dataToUse.shipping.address, 14, y);
        y += 7;
        if (dataToUse.shipping.city && dataToUse.shipping.state) {
          doc.text(`${dataToUse.shipping.city}, ${dataToUse.shipping.state} ${dataToUse.shipping.zipCode || ""}`, 14, y);
          y += 7;
        }
        doc.text(dataToUse.shipping.country, 14, y);
        y += 7;
        doc.text(`Phone: ${dataToUse.shipping.phone}`, 14, y);
        y += 7;
        doc.text(`Email: ${dataToUse.shipping.email}`, 14, y);
        
        // Payment information
        y += 15;
        doc.setFontSize(12);
        doc.setTextColor(41, 128, 185);
        doc.text("PAYMENT METHOD", 14, y);
        
        y += 10;
        doc.setFontSize(10);
        doc.setTextColor(50, 50, 50);
        doc.text(`${dataToUse.payment.method}${dataToUse.payment.cardType ? ` (${dataToUse.payment.cardType})` : ""}`, 14, y);
        y += 7;
        if (dataToUse.payment.lastFour && dataToUse.payment.lastFour !== "****") {
          doc.text(`Ending in •••• ${dataToUse.payment.lastFour}`, 14, y);
        }
        
        // Thank you message
        doc.setFontSize(11);
        doc.setTextColor(100, 100, 100);
        doc.text("Thank you for your purchase!", 105, 270, { align: "center" });
        
        // Save the PDF
        doc.save(`order_${dataToUse.orderId}.pdf`);
        
        setIsGenerating(false);
        setDownloadSuccess(true);
        
        // Reset success message after 3 seconds
        setTimeout(() => setDownloadSuccess(false), 3000);
      } catch (err) {
        console.error("Error generating PDF:", err);
        setError("Failed to generate PDF. Please try again.");
        setIsGenerating(false);
      }
    }, 1500);
  };

  const continueShopping = () => {
    navigate("/");
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <ExclamationTriangleIcon className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={continueShopping}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (!dataToUse) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
            <DocumentArrowDownIcon className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-lg text-gray-600">Your order has been successfully placed</p>
          <p className="text-blue-600 font-medium mt-2">Order ID: {dataToUse.orderId}</p>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <CheckCircleIcon className="w-6 h-6 mr-2 text-green-500" />
              Order Summary
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Order Details */}
              <div>
                <h3 className="text-md font-medium text-gray-700 mb-3 flex items-center">
                  <ShoppingCartIcon className="w-5 h-5 mr-2 text-blue-500" />
                  Order Details
                </h3>
                <div className="space-y-2">
                  <p><span className="text-gray-600">Order ID:</span> <span className="font-medium">{dataToUse.orderId}</span></p>
                  <p><span className="text-gray-600">Order Date:</span> <span className="font-medium">{dataToUse.orderDate}</span></p>
                  <p><span className="text-gray-600">Items:</span> <span className="font-medium">{dataToUse.items.length}</span></p>
                </div>
              </div>
              
              {/* Payment Details */}
              <div>
                <h3 className="text-md font-medium text-gray-700 mb-3 flex items-center">
                  <CreditCardIcon className="w-5 h-5 mr-2 text-purple-500" />
                  Payment Details
                </h3>
                <div className="space-y-2">
                  <p><span className="text-gray-600">Method:</span> <span className="font-medium">{dataToUse.payment.method}</span></p>
                  {dataToUse.payment.cardType && (
                    <p><span className="text-gray-600">Card:</span> <span className="font-medium">{dataToUse.payment.cardType} •••• {dataToUse.payment.lastFour}</span></p>
                  )}
                  <p><span className="text-gray-600">Total:</span> <span className="font-medium text-green-600">${dataToUse.total.toFixed(2)}</span></p>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-700 mb-3 flex items-center">
                <TruckIcon className="w-5 h-5 mr-2 text-green-500" />
                Shipping Information
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start mb-3">
                  <UserIcon className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                  <p className="font-medium text-gray-900">{dataToUse.shipping.name}</p>
                </div>
                <div className="flex items-start mb-3">
                  <HomeIcon className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                  <p className="text-gray-600">{dataToUse.shipping.address}</p>
                </div>
                {(dataToUse.shipping.city || dataToUse.shipping.state) && (
                  <div className="flex items-start mb-3">
                    <HomeIcon className="w-5 h-5 text-gray-400 mr-3 mt-0.5 opacity-0" />
                    <p className="text-gray-600">
                      {dataToUse.shipping.city && `${dataToUse.shipping.city}, `}
                      {dataToUse.shipping.state} {dataToUse.shipping.zipCode}
                    </p>
                  </div>
                )}
                <div className="flex items-start mb-3">
                  <EnvelopeIcon className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                  <p className="text-gray-600">{dataToUse.shipping.email}</p>
                </div>
                <div className="flex items-start">
                  <PhoneIcon className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                  <p className="text-gray-600">{dataToUse.shipping.phone}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h3 className="text-md font-medium text-gray-700 mb-3">Order Items</h3>
              <div className="space-y-4">
                {dataToUse.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.title || "Unknown Product"}</p>
                      <p className="text-sm text-gray-500">by {item.author || "Unknown Author"}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.quantity || 1} × ${(item.price || 0).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Download Button */}
          <div className="bg-gray-50 px-6 py-5">
            <button
              onClick={downloadPDF}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center disabled:opacity-75 mb-4"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating PDF...
                </>
              ) : (
                <>
                  <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
                  Download Order Summary
                </>
              )}
            </button>

            <button
              onClick={continueShopping}
              className="w-full bg-white border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:bg-gray-50"
            >
              Continue Shopping
            </button>

            {/* Success Message */}
            {downloadSuccess && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
                <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
                <p className="text-green-700 font-medium">PDF downloaded successfully!</p>
              </div>
            )}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">What's Next?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                <TruckIcon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-800 mb-2">Order Processing</h3>
              <p className="text-sm text-gray-600">Your order is being processed and will be shipped soon.</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                <EnvelopeIcon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-800 mb-2">Email Confirmation</h3>
              <p className="text-sm text-gray-600">You'll receive an email with tracking information shortly.</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-3">
                <PhoneIcon className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-medium text-gray-800 mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600">Contact our support team if you have any questions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPDFPage;