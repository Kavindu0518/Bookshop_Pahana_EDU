

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AdminRegister = () => {
  const [adminName, setAdminName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('adminName', adminName);
    formData.append('email', email);
    formData.append('password', password);

    try {
      const response = await axios.post('http://localhost:8080/api/admins', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        setMessage('Admin registered successfully! Redirecting...');
        setTimeout(() => {
          navigate('/admin/login'); // Redirect to login after successful registration
        }, 2000);
      }
    } catch (error) {
      setMessage('Error registering admin: ' + (error.response?.data || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background with bookshop theme */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/70 to-brown-900/80"></div>
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

      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden z-10 border border-amber-100">
        {/* Left Panel - Bookshop Illustration */}
        <div className="w-full md:w-2/5 bg-gradient-to-br from-amber-700 to-amber-900 text-white p-8 flex flex-col justify-center">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 font-serif">Bookshop Admin</h1>
            <p className="text-amber-100">Manage your bookstore with ease</p>
          </div>
          
          <div className="mb-6">
            <div className="w-16 h-1 bg-amber-300 rounded-full mb-2"></div>
            <h2 className="text-xl font-semibold mb-2">Inventory Management</h2>
            <p className="text-amber-200 text-sm">Track and manage your book inventory with our comprehensive dashboard.</p>
          </div>
          
          <div className="mb-6">
            <div className="w-16 h-1 bg-amber-300 rounded-full mb-2"></div>
            <h2 className="text-xl font-semibold mb-2">Customer Management</h2>
            <p className="text-amber-200 text-sm">Efficiently manage customer accounts, orders, and preferences.</p>
          </div>
          
          <div>
            <div className="w-16 h-1 bg-amber-300 rounded-full mb-2"></div>
            <h2 className="text-xl font-semibold mb-2">Sales Analytics</h2>
            <p className="text-amber-200 text-sm">Gain insights with detailed sales analytics and reports.</p>
          </div>

          {/* Book icon decoration */}
          <div className="mt-8 text-amber-300/40">
            <svg className="w-24 h-24 mx-auto" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/>
            </svg>
          </div>
        </div>

        {/* Right Panel - Registration Form */}
        <div className="w-full md:w-3/5 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-amber-800 font-serif">Admin Registration</h2>
            <p className="text-gray-500 mt-2">Create your bookstore administrator account</p>
          </div>
          
          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label htmlFor="adminName" className="block text-sm font-medium text-gray-700 mb-1 uppercase tracking-wide">Admin Name</label>
              <input
                type="text"
                id="adminName"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200"
                placeholder="Enter your full name"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 uppercase tracking-wide">Email Address</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 uppercase tracking-wide">Password</label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 text-white font-medium rounded-lg transition duration-200 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 shadow-md ${
                isLoading 
                  ? 'bg-amber-400 cursor-not-allowed' 
                  : 'bg-amber-600 hover:bg-amber-700 hover:-translate-y-0.5 hover:shadow-lg'
              }`}
            >
              {isLoading ? 'REGISTERING...' : 'REGISTER ACCOUNT'}
            </button>
          </form>
          
          {message && (
            <div className={`mt-6 p-3 rounded-lg text-center ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {message}
            </div>
          )}
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Already have an account? <Link to="/admin/login" className="text-amber-700 hover:text-amber-900 font-medium transition-colors">Sign in</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
