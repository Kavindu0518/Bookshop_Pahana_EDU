
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookManagementPage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    author: '',
    price: '',
    description: '',
    language: '',
    category: '',
    publisher: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Categories for dropdown
  const categories = [
    "Fiction", "Non-Fiction", "Science", "Technology", 
    "Business", "Arts", "Biography", "Children", "Fantasy",
    "Mystery", "Romance", "History", "Self-Help", "Travel"
  ];

  // Languages for dropdown
  const languages = [
    "Sinhala", "English", "Spanish", "French", "German", "Chinese",
    "Japanese", "Korean", "Arabic", "Hindi", "Other"
  ];

  // Fetch all books from the backend
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/books');
      setBooks(response.data);
      setFilteredBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter books based on search term
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(book =>
        book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  }, [searchTerm, books]);

  // Handle Edit button click, populate form with book details
  const handleEditClick = (book) => {
    setEditingBook(book.id);
    setFormData({
      id: book.id,
      title: book.title || '',
      author: book.author || '',
      price: book.price || '',
      description: book.description || '',
      language: book.language || '',
      category: book.category || '',
      publisher: book.publisher || '',
      image: null
    });
    setImagePreview(book.image ? `http://localhost:8080/api/books/uploads/${book.image}` : null);
    setFormErrors({});
    setSuccessMessage('');
  };

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.title) errors.title = "Title is required";
    if (!formData.author) errors.author = "Author is required";
    if (!formData.price || formData.price <= 0) errors.price = "Valid price is required";
    if (!formData.description) errors.description = "Description is required";
    if (!formData.language) errors.language = "Language is required";
    if (!formData.category) errors.category = "Category is required";
    if (!formData.publisher) errors.publisher = "Publisher is required";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission to update book details
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const updatedFormData = new FormData();
    updatedFormData.append('title', formData.title);
    updatedFormData.append('author', formData.author);
    updatedFormData.append('price', formData.price);
    updatedFormData.append('description', formData.description);
    updatedFormData.append('language', formData.language);
    updatedFormData.append('category', formData.category);
    updatedFormData.append('publisher', formData.publisher);
    if (formData.image) {
      updatedFormData.append('image', formData.image);
    }

    try {
      await axios.put(`http://localhost:8080/api/books/${formData.id}`, updatedFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setSuccessMessage('Book updated successfully!');
      fetchBooks();
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
        setEditingBook(null);
      }, 3000);
    } catch (error) {
      console.error('Error updating book:', error);
      setFormErrors({ submit: 'Error updating book. Please try again.' });
    }
  };

  // Delete a book with confirmation
  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) return;
    
    try {
      await axios.delete(`http://localhost:8080/api/books/${id}`);
      setSuccessMessage('Book deleted successfully!');
      fetchBooks();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting book:', error);
      setFormErrors({ submit: 'Error deleting book. Please try again.' });
    }
  };

  // Reset form and exit edit mode
  const cancelEdit = () => {
    setEditingBook(null);
    setFormData({
      id: '',
      title: '',
      author: '',
      price: '',
      description: '',
      language: '',
      category: '',
      publisher: '',
      image: null
    });
    setImagePreview(null);
    setFormErrors({});
    setSuccessMessage('');
  };

  // Fetch books when component mounts
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-amber-50 p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background with bookshop theme */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 to-brown-900/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMiI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIvPjwvZz48L3N2Zz4=')] opacity-5"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <svg className="h-8 w-8 text-amber-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            <h1 className="text-3xl font-bold text-amber-900 font-serif">Book Management</h1>
          </div>
          <p className="text-amber-700">Manage your book inventory, update details, and delete books</p>
        </div>

        {/* Search and Stats */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-amber-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search books by title, author, or category..."
                className="block w-full pl-10 pr-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="bg-amber-100 rounded-lg px-4 py-2 border border-amber-200">
              <p className="text-sm text-amber-800">
                {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'} found
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">{successMessage}</p>
            </div>
          </div>
        )}

        {formErrors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{formErrors.submit}</p>
            </div>
          </div>
        )}

        {/* Edit Book Form */}
        {editingBook && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-amber-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-amber-900">Edit Book Details</h2>
              <button
                onClick={cancelEdit}
                className="text-amber-500 hover:text-amber-700 p-1 rounded-full hover:bg-amber-100 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} encType="multipart/form-data" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-amber-700 mb-1 uppercase tracking-wide">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full p-2 border ${formErrors.title ? 'border-red-500' : 'border-amber-200'} rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500`}
                  />
                  {formErrors.title && <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-700 mb-1 uppercase tracking-wide">Author *</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className={`w-full p-2 border ${formErrors.author ? 'border-red-500' : 'border-amber-200'} rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500`}
                  />
                  {formErrors.author && <p className="text-red-500 text-xs mt-1">{formErrors.author}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-700 mb-1 uppercase tracking-wide">Price ($) *</label>
                  <input
                    type="number"
                    name="price"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={handleChange}
                    className={`w-full p-2 border ${formErrors.price ? 'border-red-500' : 'border-amber-200'} rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500`}
                  />
                  {formErrors.price && <p className="text-red-500 text-xs mt-1">{formErrors.price}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-700 mb-1 uppercase tracking-wide">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full p-2 border ${formErrors.category ? 'border-red-500' : 'border-amber-200'} rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500`}
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {formErrors.category && <p className="text-red-500 text-xs mt-1">{formErrors.category}</p>}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-amber-700 mb-1 uppercase tracking-wide">Language *</label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    className={`w-full p-2 border ${formErrors.language ? 'border-red-500' : 'border-amber-200'} rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500`}
                  >
                    <option value="">Select a language</option>
                    {languages.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                  {formErrors.language && <p className="text-red-500 text-xs mt-1">{formErrors.language}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-700 mb-1 uppercase tracking-wide">Publisher *</label>
                  <input
                    type="text"
                    name="publisher"
                    value={formData.publisher}
                    onChange={handleChange}
                    className={`w-full p-2 border ${formErrors.publisher ? 'border-red-500' : 'border-amber-200'} rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500`}
                  />
                  {formErrors.publisher && <p className="text-red-500 text-xs mt-1">{formErrors.publisher}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-700 mb-1 uppercase tracking-wide">Book Cover Image</label>
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-1">
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="w-full p-2 border border-amber-200 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors flex items-center justify-between">
                        <span className="text-amber-600 truncate">
                          {formData.image ? formData.image.name : "Choose an image"}
                        </span>
                        <svg className="h-5 w-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                    </div>
                    
                    {imagePreview && (
                      <div className="w-16 h-16 rounded-lg border border-amber-200 overflow-hidden">
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

              {/* Full Width Description Field */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-amber-700 mb-1 uppercase tracking-wide">Description *</label>
                <textarea
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full p-2 border ${formErrors.description ? 'border-red-500' : 'border-amber-200'} rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500`}
                  placeholder="Enter a detailed description of the book..."
                />
                {formErrors.description && <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>}
              </div>

              {/* Form Actions */}
              <div className="md:col-span-2 flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-4 py-2 border border-amber-200 rounded-lg text-amber-700 hover:bg-amber-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Book List Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8 border border-amber-100">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <svg className="animate-spin h-8 w-8 text-amber-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                <p className="text-amber-700">Loading books...</p>
              </div>
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="text-center py-12">
              <svg className="h-12 w-12 text-amber-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
              <h3 className="text-lg font-medium text-amber-900 mb-2">No books found</h3>
              <p className="text-amber-700">
                {searchTerm ? 'Try adjusting your search term' : 'No books available in the database'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-amber-50">
                  <tr>
                    <th className="py-4 px-6 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">Cover</th>
                    <th className="py-4 px-6 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">Title & Author</th>
                    <th className="py-4 px-6 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">Category</th>
                    <th className="py-4 px-6 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">Price</th>
                    <th className="py-4 px-6 text-right text-xs font-medium text-amber-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-amber-100">
                  {filteredBooks.map((book) => (
                    <tr key={book.id} className="hover:bg-amber-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="h-16 w-12 flex-shrink-0 overflow-hidden rounded-md border border-amber-200">
                          {book.image ? (
                            <img
                              src={`http://localhost:8080/api/books/uploads/${book.image}`}
                              alt={book.title}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.target.src = "https://via.placeholder.com/48x64?text=No+Image";
                              }}
                            />
                          ) : (
                            <div className="h-full w-full bg-amber-100 flex items-center justify-center">
                              <svg className="h-6 w-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                              </svg>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm font-medium text-amber-900">{book.title}</div>
                        <div className="text-sm text-amber-600">{book.author}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-800">
                          {book.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-amber-900">Rs.{book.price}</td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleEditClick(book)}
                            className="text-amber-600 hover:text-amber-900 p-2 rounded-lg hover:bg-amber-100 transition-colors"
                            title="Edit Book"
                          >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(book.id, book.title)}
                            className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                            title="Delete Book"
                          >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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

export default BookManagementPage;