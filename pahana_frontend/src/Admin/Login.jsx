
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      // Simulate login API call
      setTimeout(() => {
        setMessage('Admin Login successful');
        // Redirect to admin dashboard after successful login
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 1000);
      }, 1000);
    } catch (error) {
      setMessage('Error logging in: ' + (error.response?.data || 'Invalid credentials'));
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

      {/* Admin Login card */}
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md z-10 transform transition-all duration-300 hover:shadow-2xl border border-amber-100">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-800 mb-2 font-serif">ADMIN ACCESS</h1>
          <p className="text-gray-600">Administrator login portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
              Admin Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 px-4 rounded-lg text-white font-semibold transition-all duration-300 ${
              isLoading ? 'bg-amber-400 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-700 shadow-md hover:shadow-lg'
            }`}
          >
            {isLoading ? 'LOGGING IN...' : 'ADMIN LOGIN'}
          </button>
        </form>

        {message && (
          <div className={`mt-4 p-3 rounded-lg text-center text-sm ${
            message.includes('successful')
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-700'
          }`}>
            {message}
          </div>
        )}

        <div className="text-center mt-6 pt-6 border-t border-gray-200">
          <p className="text-gray-600 text-sm">
            Return to <a href="/" className="text-amber-700 font-semibold hover:text-amber-900 transition-colors">Bookstore Home</a>
          </p>
        </div>
      </div>

      {/* Book icons in background */}
      <div className="absolute bottom-10 left-20 text-amber-800/30 z-0">
        <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/>
        </svg>
      </div>

      <div className="absolute top-20 right-24 text-amber-900/20 z-0">
        <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/>
        </svg>
      </div>

      <style jsx>{`
        .bg-brown-900 {
          background-color: #3c2a1e;
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;
