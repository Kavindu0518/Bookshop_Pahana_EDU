
import React, { useState } from "react";

export default function Help() {
  const [activeSection, setActiveSection] = useState("guidelines");

  const faqItems = [
    {
      question: "How do I reset my password?",
      answer: "Go to your account settings and click 'Forgot Password'. You'll receive an email with instructions to reset it."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers for your convenience."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days. Express options are available at checkout."
    },
    {
      question: "Can I return a book?",
      answer: "Yes, we accept returns within 30 days of purchase with original packaging and receipt."
    },
    {
      question: "Do you have international shipping?",
      answer: "Yes, we ship to most countries. Shipping costs and times vary by location."
    }
  ];

  const guidelines = [
    {
      icon: (
        <svg className="h-6 w-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 极 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
        </svg>
      ),
      title: "Home Page",
      description: "Browse featured books, new arrivals, and special offers directly on the homepage."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      ),
      title: "Search",
      description: "Use the search bar to quickly find books by title, author, or category."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-amber-600" fill="none" stroke="current极" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      ),
      title: "Categories",
      description: "Navigate through categories to explore different genres like fiction, non-fiction, kids, and more."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 极 2 0 014 0z"></path>
        </svg>
      ),
      title: "Cart",
      description: "Add your favorite books to the cart and review them before checkout."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
        </svg>
      ),
      title: "Checkout",
      description: "Proceed with payment and confirm your order safely and easily."
    },
    {
      icon: (
        <svg className="h-6 w-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
        </svg>
      ),
      title: "Account",
      description: "Sign up or log in to manage your orders, wishlist, and profile settings."
    }
  ];

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-amber-100">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center space-x-3">
            <svg className="h-8 w-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h1 className="text-3xl font-bold text-amber-900 font-serif">Help & Support</h1>
          </div>
          <p className="text-amber-700 mt-2">Find answers to your questions and learn how to use our platform</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6 border border-amber-100">
              <h2 className="text-lg font-semibold text-amber-900 mb-4">Help Topics</h2>
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveSection("guidelines")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${activeSection === "guidelines" ? 'bg-amber-100 text-amber-700 font-medium' : 'text-amber-700 hover:bg-amber-50'}`}
                >
                  Platform Guidelines
                </button>
                <button
                  onClick={() => setActiveSection("faq")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${activeSection === "faq" ? 'bg-amber-100 text-amber-700 font-medium' : 'text-amber-700 hover:bg-amber-50'}`}
                >
                  Frequently Asked Questions
                </button>
                <button
                  onClick={() => setActiveSection("contact")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${activeSection === "contact" ? 'bg-amber-100 text-amber-700 font-medium' : 'text-amber-700 hover:bg-amber-50'}`}
                >
                  Contact Support
                </button>
              </nav>

              {/* Quick Support Card */}
              <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <h3 className="font-medium text-amber-800 mb-2">Need immediate help?</h3>
                <p className="text-amber-700 text-sm mb-3">Our support team is available 24/7</p>
                <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg text-sm transition-colors">
                  Live Chat Now
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:w-3/4">
            {/* Guidelines Section */}
            {activeSection === "guidelines" && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-amber-100">
                <div className="flex items-center mb-6">
                  <svg className="h-6 w-6 text-amber-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5极1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                  <h2 className="text-2xl font-semibold text-amber-900 font-serif">Platform Guidelines</h2>
                </div>
                <p className="text-amber-700 mb-8">Learn how to navigate and make the most of our book platform with these helpful guidelines.</p>
                
                <div className="grid grid-cols-1 md:极rid-cols-2 gap-6">
                  {guidelines.map((item, index) => (
                    <div key={index} className="bg-amber-50 rounded-xl p-5 hover:shadow-md transition-shadow border border-amber-100">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-amber-900 mb-2">{item.title}</h3>
                          <p className="text-amber-700 text-sm">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ Section */}
            {activeSection === "faq" && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-amber-100">
                <div className="flex items-center mb-6">
                  <svg className="h-6 w-6 text-amber-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 极z"></path>
                  </svg>
                  <h2 className="text-2xl font-semibold text-amber-900 font-serif">Frequently Asked Questions</h2>
                </div>
                <p className="text-amber-700 mb-8">Find quick answers to common questions about our services and policies.</p>
                
                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <div key={index} className="border border-amber-200 rounded-xl overflow-hidden">
                      <button className="flex justify-between items-center w-full p-4 bg-amber-50 text-left font-medium text-amber-900 hover:bg-amber-100 transition-colors">
                        <span>{item.question}</span>
                        <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <div className="p-4 bg-white">
                        <p className="text-amber-700">{item.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Section */}
            {activeSection === "contact" && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-amber-100">
                <div className="flex items-center mb-6">
                  <svg className="h-6 w-6 text-amber-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <h2 className="text-2xl font-semibold text-amber-900 font-serif">Contact Support</h2>
                </div>
                <p className="text-amber-700 mb-8">Get in touch with our support team through any of these channels.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
                    <div className="flex items-center mb-4">
                      <svg className="h-5 w-5 text-amber-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                      <h3 className="font-semibold text-amber-900">Phone Support</h3>
                    </div>
                    <p className="text-amber-700 mb-3">Speak directly with our support agents</p>
                    <p className="text-amber-600 font-medium">+1 (555) 123-4567</p>
                    <p className="text-amber-500 text-sm">Mon-Fri: 8am-8pm EST</p>
                  </div>
                  
                  <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
                    <div className="flex items-center mb-4">
                      <svg className="h-5 w-5 text-amber-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2极7a2 2 0 00-2-2H5a2 2 极 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      <h3 className="font-semibold text-amber-900">Email Support</h3>
                    </div>
                    <p className="text-amber-700 mb-3">Send us a message and we'll respond within 24 hours</p>
                    <p className="text-amber-600 font-medium">support@bookshop.com</p>
                  </div>
                  
                  <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
                    <div className="flex items-center mb-4">
                      <svg className="h-5 w-5 text-amber-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                      </svg>
                      <h3 className="font-semibold text-amber-900">Live Chat</h3>
                    </div>
                    <p className="text-amber-700 mb-3">Instant help from our support team</p>
                    <button className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg text-sm transition-colors">
                      Start Chat
                    </button>
                  </div>
                  
                  <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
                    <div className="flex items-center mb-4">
                      <svg className="h-5 w-5 text-amber-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      <h3 className="font-semibold text-amber-900">Help Center</h3>
                    </div>
                    <p className="text-amber-700 mb-3">Browse our comprehensive knowledge base</p>
                    <button className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg text-sm transition-colors">
                      Visit Help Center
                    </button>
                  </div>
                </div>
                
                {/* Contact Form */}
                <div className="border-t border-amber-200 pt-6">
                  <h3 className="text-lg font-semibold text-amber-900 mb-4">Send us a message</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-amber-700 mb-1">Name</label>
                        <input type="text" className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500" placeholder="Your name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-amber-700 mb-1">Email</label>
                        <input type="email" className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500" placeholder="Your email address" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-amber-700 mb-1">Subject</label>
                      <input type="text" className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500" placeholder="What is this regarding?" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-amber-700 mb-1">Message</label>
                      <textarea rows="4" className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500" placeholder="How can we help you?"></textarea>
                    </div>
                    <button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-lg font-medium transition-colors">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-amber-200 mt-12">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-amber-700">
            <p>© 2023 Bookshop. All rights reserved.</p>
            <p className="mt-2">We're here to help you with all your reading needs!</p>
          </div>
        </div>
      </footer>
    </div>
  );
}