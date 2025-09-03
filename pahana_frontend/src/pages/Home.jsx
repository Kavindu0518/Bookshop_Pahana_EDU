



// src/components/Home.jsx
import React from "react";
import { Link } from 'react-router-dom';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Aboutus from "./Aboutus";
import Bookview from "../components/bookview";
import Contactus from "../components/contactus";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      {/* Navbar */}
      <Navbar/>
      
      {/* Hero Section */}
      <main className="flex-grow">
        <section className="relative py-20 text-center overflow-hidden">
          {/* Background with bookshop theme */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 to-brown-900/10"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMiI+PHBhdGggZD0iTTAgMGh2NjBoNjBWMHoiLz48L2c+PC9zdmc+')] opacity-5"></div>
          </div>
          
          {/* Decorative book elements */}
          <div className="absolute top-10 left-10 w-16 h-16 z-10 opacity-20">
            <div className="w-full h-full bg-amber-400 rounded-lg transform rotate-12 shadow-lg"></div>
          </div>
          <div className="absolute bottom-16 right-14 w-20 h-12 z-10 opacity-20">
            <div className="w-full h-full bg-red-600 rounded transform -rotate-6 shadow-lg"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-5xl font-bold text-amber-900 font-serif mb-6">
              Welcome to Pahana Bookshop
            </h1>
            <p className="mt-4 text-xl text-amber-700 max-w-2xl mx-auto">
              Discover a world of knowledge and stories. Browse your favorite books today!
            </p>
            <Link to="/books">
              <button className="mt-8 px-8 py-3 bg-amber-600 text-white rounded-lg shadow-lg hover:bg-amber-700 transition-colors text-lg font-medium">
                Explore Books
              </button>
            </Link>
          </div>
          
          {/* Book icons in background */}
          <div className="absolute bottom-10 left-20 text-amber-800/20 z-0">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/>
            </svg>
          </div>
        </section>
      </main>

      {/* Components */}
      <Bookview/>
      <Aboutus/>
      <Contactus/>

      <Footer/>
      
      <style jsx>{`
        .bg-brown-900 {
          background-color: #3c2a1e;
        }
      `}</style>
    </div>
  );
}