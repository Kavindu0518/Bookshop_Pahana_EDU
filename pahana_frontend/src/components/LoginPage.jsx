



import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await axios.post('http://localhost:8080/api/customers/login', null, {
        params: { email, password },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      console.log('API Response:', response);

      if (response.status === 200) {
        try {
          const allUsersResponse = await axios.get('http://localhost:8080/api/customers');
          const loggedInUser = allUsersResponse.data.find(user => user.email === email);
          
          if (loggedInUser) {
            localStorage.setItem('userId', loggedInUser.id);
            localStorage.setItem('userEmail', loggedInUser.email);
            localStorage.setItem('userName', loggedInUser.name);
            setSuccessMessage('Login successful! Redirecting...');
            setTimeout(() => {
              navigate('/home');
            }, 2000); // Redirect after 2 seconds to show the success message
          } else {
            setError('User data not found after login.');
          }
        } catch (fetchError) {
          console.error('Error fetching user data:', fetchError);
          setError('Login successful but failed to load user data.');
        }
      }
    } catch (err) {
      console.error('Error during login:', err);
      if (err.response && err.response.status === 401) {
        setError('Invalid password. Please try again.');
      } else if (err.response && err.response.status === 404) {
        setError('No account found with this email.');
      } else {
        setError('Login failed. Please check your credentials.');
      }
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

      {/* Login card */}
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md z-10 transform transition-all duration-300 hover:shadow-2xl border border-amber-100">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-800 mb-2 font-serif">WELCOME</h1>
          <p className="text-gray-600">Sign in to your bookshop account</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
              Username
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              placeholder="Enter your email"
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="text-right mb-4">
            <a href="#" className="text-sm text-amber-700 hover:text-amber-900 transition-colors">
              Forgot Password?
            </a>
          </div>
          
          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm">
              {successMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 px-4 rounded-lg text-white font-semibold transition-all duration-300 ${
              isLoading 
                ? 'bg-amber-400 cursor-not-allowed' 
                : 'bg-amber-600 hover:bg-amber-700 shadow-md hover:shadow-lg'
            }`}
          >
            {isLoading ? 'LOGGING IN...' : 'LOGIN'}
          </button>
        </form>
        
        <div className="text-center mt-6 pt-6 border-t border-gray-200">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-amber-700 font-semibold hover:text-amber-900 transition-colors">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
