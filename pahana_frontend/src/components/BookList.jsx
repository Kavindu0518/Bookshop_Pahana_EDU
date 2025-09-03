
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllBooksView = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [wishlist, setWishlist] = useState([]);
  const [sortOption] = useState("default");
  const [quickViewBook, setQuickViewBook] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const navigate = useNavigate();

  // Categories for filtering
  const categories = ["All", "Fiction", "Non-Fiction", "Science", "Technology", "Business", "Arts", "Biography"];

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/books");
        setBooks(response.data);
        setFilteredBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };

    fetchBooks();

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  // Filter and sort books
  useEffect(() => {
    let result = [...books];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory !== "All") {
      result = result.filter(book => book.category === selectedCategory);
    }
    
    // Apply sorting
    if (sortOption === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "title") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    setFilteredBooks(result);
  }, [books, searchTerm, selectedCategory, sortOption]);

  // Function to handle image loading errors
  const handleImageError = (bookId) => {
    setImageErrors(prev => ({ ...prev, [bookId]: true }));
  };

  // Function to get correct image URL
  const getImageUrl = (book) => {
    if (imageErrors[book.id]) {
      return "https://via.placeholder.com/300x400?text=No+Image";
    }
    
    if (book.image) {
      return `http://localhost:8080/api/books/uploads/${book.image}`;
    }
    
    return "https://via.placeholder.com/300x400?text=No+Image";
  };

  const addToCart = (book) => {
    const isBookInCart = cart.some((item) => item.id === book.id);
    
    if (!isBookInCart) {
      const updatedCart = [...cart, {...book, quantity: 1}];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      
      // Show success notification
      showNotification(`${book.title} added to cart!`, "success");
    } else {
      showNotification(`${book.title} is already in your cart`, "info");
    }
  };

  const toggleWishlist = (book) => {
    const isInWishlist = wishlist.some((item) => item.id === book.id);
    let updatedWishlist;
    
    if (isInWishlist) {
      updatedWishlist = wishlist.filter(item => item.id !== book.id);
      showNotification(`${book.title} removed from wishlist`, "info");
    } else {
      updatedWishlist = [...wishlist, book];
      showNotification(`${book.title} added to wishlist!`, "success");
    }
    
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const openQuickView = (book) => {
    setQuickViewBook(book);
  };

  const closeQuickView = () => {
    setQuickViewBook(null);
  };

  const showNotification = (message, type = "info") => {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg text-white ${
      type === "success" ? "bg-green-500" : 
      type === "error" ? "bg-red-500" : "bg-amber-500"
    }`;
    notification.textContent = message;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  const goToCart = () => {
    navigate("/cart");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header with Cart Button */}
      <div className="bg-white shadow-sm sticky top-0 z-10 border-b border-amber-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-amber-900 font-serif">Book Collection</h1>
            <p className="text-amber-700 text-sm">Discover our curated selection of books</p>
          </div>
          
          <button 
            onClick={goToCart}
            className="flex items-center bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            Cart ({cart.length})
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by title, author, or description..."
              className="block w-full pl-10 pr-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Results count */}
        <div className="mb-6 text-sm text-amber-700">
          Showing {filteredBooks.length} of {books.length} books
        </div>

        {/* Books Grid */}
        {filteredBooks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow border border-amber-100">
            <h2 className="text-xl font-semibold text-amber-600 mb-2">No books found</h2>
            <p className="text-amber-700">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <div key={book.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-amber-100">
                <div className="relative">
                  <div className="h-56 overflow-hidden bg-amber-50 flex items-center justify-center">
                    {imageErrors[book.id] ? (
                      <div className="flex flex-col items-center justify-center text-amber-400">
                        <svg className="h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <span className="text-sm">Image not available</span>
                      </div>
                    ) : (
                      <img
                        src={getImageUrl(book)}
                        alt={book.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        onError={() => handleImageError(book.id)}
                      />
                    )}
                  </div>
                  
                  {/* Action buttons */}
                  <div className="absolute top-3 right-3 flex flex-col space-y-2">
                    <button
                      onClick={() => toggleWishlist(book)}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors border border-amber-100"
                    >
                      {wishlist.some(item => item.id === book.id) ? (
                        <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 极 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                      ) : (
                        <svg className="h-5 w-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="极" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                      )}
                    </button>
                    
                    <button
                      onClick={() => openQuickView(book)}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-amber-50 transition-colors border border-amber-100"
                    >
                      <svg className="h-5 w-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                    </button>
                  </div>
                  
                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                      {book.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-amber-900 mb-1 line-clamp-1">{book.title}</h3>
                  <p className="text-amber-700 text-sm mb-2">by {book.author}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        star <= 4 ? (
                          <svg key={star} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                          </svg>
                        ) : (
                          <svg key={star} className="h-4 w-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 极 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 极 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                          </svg>
                        )
                      ))}
                    </div>
                    <span className="text-xs text-amber-500 ml-1">(42)</span>
                  </div>
                  
                  <p className="text-amber-700 text-sm mb-4 line-clamp-2">{book.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-amber-600">${book.price.toFixed(2)}</span>
                    <button
                      onClick={() => addToCart(book)}
                      className="flex items-center bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {quickViewBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-amber-100">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-amber-900 font-serif">{quickViewBook.title}</h2>
                <button 
                  onClick={closeQuickView}
                  className="text-amber-500 hover:text-amber-700 p-1 rounded-full hover:bg-amber-100"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 flex items-center justify-center bg-amber-50 rounded-lg min-h-[300px] border border-amber-100">
                  {imageErrors[quickViewBook.id] ? (
                    <div className="flex flex-col items-center justify-center text-amber-400">
                      <svg className="h-16 w-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 极m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <span className="text-sm">Image not available</span>
                    </div>
                  ) : (
                    <img
                      src={getImageUrl(quickViewBook)}
                      alt={quickViewBook.title}
                      className="w-full h-auto rounded-lg"
                      onError={() => handleImageError(quickViewBook.id)}
                    />
                  )}
                </div>
                
                <div className="md:w-2/3">
                  <p className="text-amber-700 mb-2">by {quickViewBook.author}</p>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        star <= 4 ? (
                          <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.极.922-.755 1.688-1.538 1.118极-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                          </svg>
                        ) : (
                          <svg key={star} className="h-5 w-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69极4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                          </svg>
                        )
                      ))}
                    </div>
                    <span className="text-sm text-amber-500 ml-2">(42 reviews)</span>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-amber-600">Rs.{quickViewBook.price.toFixed(2)}</span>
                  </div>
                  
                  <p className="text-amber-700 mb-6">{quickViewBook.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="text-sm font-medium text-amber-500">Publisher</h4>
                      <p className="text-amber-700">{quickViewBook.publisher}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-amber-500">Category</h4>
                      <p className="text-amber-700">{quickViewBook.category}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-amber-500">Language</h4>
                      <p className="text-amber-700">{quickViewBook.language}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      onClick={() => {
                        addToCart(quickViewBook);
                        closeQuickView();
                      }}
                      className="flex-1 flex items-center justify-center bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                      <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13极10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                      Add to Cart
                    </button>
                    
                    <button
                      onClick={() => toggleWishlist(quickViewBook)}
                      className="p-3 border border-amber-200 rounded-lg hover:bg-amber-50 transition-colors"
                    >
                      {wishlist.some(item => item.id === quickViewBook.id) ? (
                        <svg className="h-6 w-6 text-red-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                      ) : (
                        <svg className="h-6 w-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBooksView;