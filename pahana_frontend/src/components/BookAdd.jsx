
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookAdd = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('');
  const [category, setCategory] = useState('');
  const [publisher, setPublisher] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const categories = [
    "Fiction", 
    "Non-Fiction", 
    "Science", 
    "Technology", 
    "Business", 
    "Arts", 
    "Biography",
    "History",
    "Fantasy",
    "Mystery",
    "Romance",
    "Children's"
  ];

  const languages = [
    "Sinhala",
    "English", 
    "Spanish", 
    "French", 
    "German", 
    "Chinese", 
    "Japanese", 
    "Other"
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');

    const formData = new FormData();
    formData.append('author', author);
    formData.append('title', title);
    formData.append('price', price);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }
    formData.append('language', language);
    formData.append('category', category);
    formData.append('publisher', publisher);

    try {
      await axios.post('http://localhost:8080/api/books', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Set success message
      setSuccessMessage('Book added successfully!');
      
      // Clear form fields
      setTitle('');
      setAuthor('');
      setPrice('');
      setDescription('');
      setLanguage('');
      setCategory('');
      setPublisher('');
      setImage(null);
      setImagePreview(null);
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate('/editbookview');
      }, 2000);
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Error adding book. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 py-8 p-4 relative overflow-hidden">
      {/* Background with bookshop theme */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 to-brown-900/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMiI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIvPjwvZz48L3N2Zz4=')] opacity-5"></div>
      </div>
      
      {/* Decorative book elements */}
      <div className="absolute top-10 left-10 w-16 h-16 z-10 opacity-20">
        <div className="w-full h-full bg-amber-400 rounded-lg transform rotate-12 shadow-lg"></div>
      </div>
      <div className="absolute bottom-16 right-14 w-20 h-12 z-10 opacity-20">
        <div className="w-full h-full bg-red-600 rounded transform -rotate-6 shadow-lg"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="font-medium">{successMessage}</span>
            </div>
            <div className="text-sm mt-1">Redirecting to book list...</div>
          </div>
        )}
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-amber-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-amber-800 p-6 text-white">
            <div className="flex items-center space-x-3">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
              <h1 className="text-3xl font-bold font-serif">Add New Book</h1>
            </div>
            <p className="mt-2 opacity-90">Fill in the details below to add a new book to the collection</p>
          </div>

          {/* Form */}
          <form onSubmit={handleAddBook} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="Enter book title"
                  />
                </div>

                <div>
                  <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                    Author *
                  </label>
                  <input
                    type="text"
                    id="author"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                    placeholder="Enter author name"
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    id="price"
                    min="0"
                    step="0.01"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label htmlFor="publisher" className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                    Publisher *
                  </label>
                  <input
                    type="text"
                    id="publisher"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                    required
                    placeholder="Enter publisher name"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                    Category *
                  </label>
                  <select
                    id="category"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                    Language *
                  </label>
                  <select
                    id="language"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    required
                  >
                    <option value="">Select a language</option>
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                    Book Cover Image *
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-1">
                      <input
                        type="file"
                        id="image"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleImageChange}
                        accept="image/*"
                        required
                      />
                      <div className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between">
                        <span className="text-gray-600 truncate">
                          {image ? image.name : "Choose an image"}
                        </span>
                        <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                      </div>
                    </div>
                    
                    {imagePreview && (
                      <div className="w-16 h-16 rounded-lg border border-gray-300 overflow-hidden">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                Description *
              </label>
              <textarea
                id="description"
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Enter a detailed description of the book..."
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/admin/dashboard')}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center disabled:opacity-50"
                disabled={isSubmitting || successMessage}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Add Book
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Book icons in background */}
      <div className="absolute bottom-10 left-20 text-amber-800/20 z-0">
        <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
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

export default BookAdd;