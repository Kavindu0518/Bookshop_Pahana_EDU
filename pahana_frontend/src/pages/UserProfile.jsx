

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    name: '',
    email: '',
    contactNumber: '',
    // address: ''
    password: ''
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Load user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get user ID from localStorage (set during login)
        const userId = localStorage.getItem('userId');
        
        if (!userId) {
          setMessage('Please login first');
          navigate('/login');
          return;
        }

        // Fetch user data from backend
        const response = await axios.get(`http://localhost:8080/api/customers/${userId}`);
        
        if (response.status === 200) {
          setUser(response.data);
          setUpdatedUser({
            name: response.data.name || '',
            email: response.data.email || '',
            contactNumber: response.data.contactNumber || '',
            // address: response.data.address || ''
            password: ''
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setMessage('Failed to load user data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Handle input changes for edit form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle profile update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.put(`http://localhost:8080/api/customers/${userId}`, updatedUser);
      
      if (response.status === 200) {
        setUser(response.data);
        setIsEditing(false);
        setMessage('Profile updated successfully!');
        
        // Clear message after 3 seconds
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    
    // Redirect to login page
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-amber-50 relative overflow-hidden">
        {/* Background with bookshop theme */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 to-brown-900/10"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMiI+PHBathIGQ9Ik0wIDBoNjB2NjBIMHoiLz48L2c+PC9zdmc+')] opacity-10"></div>
        </div>
        <div className="text-xl text-amber-700 z-10">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 py-8 px-4 relative overflow-hidden">
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

      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-amber-100 relative z-10">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-800 p-6 text-white">
          <h1 className="text-2xl font-bold font-serif">User Profile</h1>
          <p className="mt-2 text-amber-100">Manage your account information</p>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`p-4 mx-6 mt-6 rounded-lg border ${
            message.includes('success') 
              ? 'bg-amber-100 text-amber-700 border-amber-200' 
              : 'bg-red-100 text-red-700 border-red-200'
          }`}>
            {message}
          </div>
        )}

        {/* Profile Content */}
        <div className="p-6">
          {!isEditing ? (
            /* View Mode */
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4 text-amber-800 font-serif">Personal Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-amber-700">Full Name</label>
                    <p className="mt-1 p-2 bg-amber-50 rounded-md border border-amber-100 text-amber-900">{user?.name || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-amber-700">Email Address</label>
                    <p className="mt-1 p-2 bg-amber-50 rounded-md border border-amber-100 text-amber-900">{user?.email || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-amber-700">Contact Number</label>
                    <p className="mt-1 p-2 bg-amber-50 rounded-md border border-amber-100 text-amber-900">{user?.contactNumber || 'Not provided'}</p>
                  </div>
                  {/* <div>
                    <label className="block text-sm font-medium text-amber-700">Address</label>
                    <p className="mt-1 p-2 bg-amber-50 rounded-md border border-amber-100 text-amber-900">{user?.address || 'Not provided'}</p>
                  </div> */}
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform duration-200"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform duration-200"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            /* Edit Mode */
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <h2 className="text-xl font-semibold mb-4 text-amber-800 font-serif">Edit Personal Information</h2>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-amber-700">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={updatedUser.name}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 border border-amber-200 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-amber-700">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={updatedUser.email}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 border border-amber-200 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="contactNumber" className="block text-sm font-medium text-amber-700">Contact Number</label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={updatedUser.contactNumber}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 border border-amber-200 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
              
              {/* <div>
                <label htmlFor="address" className="block text-sm font-medium text-amber-700">Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={updatedUser.address}
                  onChange={handleChange}
                  rows="3"
                  className="mt-1 w-full p-2 border border-amber-200 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div> */}
              
              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 disabled:opacity-50 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform duration-200"
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-amber-100 text-amber-700 rounded-md hover:bg-amber-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;