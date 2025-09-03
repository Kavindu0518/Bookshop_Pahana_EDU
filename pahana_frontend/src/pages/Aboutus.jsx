

import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-amber-50 py-12">
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

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 z-10 border border-amber-100">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-amber-800 mb-8 text-center font-serif">About Our Bookshop</h1>

        {/* Intro Section */}
        <p className="text-amber-700 mb-8 leading-relaxed text-lg text-center">
          Welcome to <span className="font-semibold text-amber-900">Pahana EDU Bookshop</span>!  
          We are dedicated to providing literature lovers with a curated collection of books 
          that combine timeless classics with contemporary works. Our mission is to foster 
          a love for reading and create a community around the written word.
        </p>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="About our bookshop"
              className="rounded-2xl shadow-lg border-4 border-amber-100"
            />
            <div className="absolute -bottom-4 -right-4 bg-amber-600 text-white px-4 py-2 rounded-lg shadow-md">
              Since 2015
            </div>
          </div>

          {/* Text Content */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-amber-800 font-serif">Who We Are</h2>
            <p className="text-amber-700 leading-relaxed mb-6">
              Our team consists of passionate bibliophiles, literary experts, and 
              dedicated booksellers who work together to create a welcoming space for 
              readers of all ages. With expertise in diverse genres from classic literature 
              to contemporary fiction, we ensure our collection has something for everyone.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-amber-800 font-serif">Our Vision</h2>
            <p className="text-amber-700 leading-relaxed mb-6">
              We believe in the transformative power of books to educate, inspire, and 
              bring people together. Our goal is to be more than just a bookstore—we aim 
              to be a community hub where readers can discover new worlds, share ideas, 
              and celebrate the written word.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4 text-amber-800 font-serif">Our Collection</h2>
            <p className="text-amber-700 leading-relaxed">
              From rare first editions to the latest bestsellers, our carefully curated 
              collection includes fiction, non-fiction, children's literature, academic 
              texts, and special interest books. We take pride in supporting independent 
              publishers and local authors.
            </p>
          </div>
        </div>

        {/* Additional Section */}
        <div className="mt-12 pt-8 border-t border-amber-100">
          <h2 className="text-2xl font-semibold mb-6 text-amber-800 text-center font-serif">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-amber-50 p-6 rounded-xl text-center border border-amber-100">
              <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="font-semibold text-amber-800 mb-2">Curated Selection</h3>
              <p className="text-amber-700 text-sm">Every book in our collection is hand-picked by our expert staff</p>
            </div>
            
            <div className="bg-amber-50 p-6 rounded-xl text-center border border-amber-100">
              <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-amber-800 mb-2">Community Focus</h3>
              <p className="text-amber-700 text-sm">We host book clubs, author events, and reading programs</p>
            </div>
            
            <div className="bg-amber-50 p-6 rounded-xl text-center border border-amber-100">
              <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-amber-800 mb-2">Secure Shopping</h3>
              <p className="text-amber-700 text-sm">Your privacy and security are our top priorities</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-amber-800 font-serif">Visit Us Today</h2>
          <p className="text-amber-700 mb-6">Experience the difference of a bookshop created by readers, for readers</p>
          <Link to="/bookview">
            <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform duration-200">
              Explore Our Collection
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
