
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  ShoppingCartIcon, 
  MagnifyingGlassIcon, 
  HeartIcon, 
  StarIcon,
  ArrowsPointingOutIcon,
  PhotoIcon,
  XMarkIcon,
  ShoppingBagIcon
} from "@heroicons/react/24/outline";
import { 
  HeartIcon as HeartSolidIcon, 
  StarIcon as StarSolidIcon 
} from "@heroicons/react/24/solid";

const AllBooksView = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [wishlist, setWishlist] = useState([]);
  const [sortOption, setSortOption] = useState("default");
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
      type === "success" ? "bg-amber-600" : 
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
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 relative overflow-hidden">
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

      {/* Header with Cart Button */}
      <div className="container mx-auto px-4 py-6 z-10 relative">
        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-md border border-amber-100">
          <h1 className="text-3xl font-bold text-amber-800 font-serif">Our Book Collection</h1>
          <button 
            onClick={goToCart}
            className="flex items-center bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform duration-200"
          >
            <ShoppingBagIcon className="h-5 w-5 mr-2" />
            Cart ({cart.length})
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-amber-100">
          <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-amber-500" />
              </div>
              <input
                type="text"
                placeholder="Search books by title, author, or description..."
                className="pl-10 pr-4 py-2 w-full border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <select
                className="px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select
                className="px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="default">Sort by</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="title">Title: A to Z</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="text-sm text-amber-700">
            Showing {filteredBooks.length} of {books.length} books
          </div>
        </div>

        {/* Books Grid - All books displayed at once */}
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
                      <div className="flex flex-col items-center justify-center text-amber-300">
                        <PhotoIcon className="h-12 w-12 mb-2" />
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
                        <HeartSolidIcon className="h-5 w-5 text-red-500" />
                      ) : (
                        <HeartIcon className="h-5 w-5 text-amber-600" />
                      )}
                    </button>
                    
                    <button
                      onClick={() => openQuickView(book)}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-amber-50 transition-colors border border-amber-100"
                    >
                      <ArrowsPointingOutIcon className="h-5 w-5 text-amber-600" />
                    </button>
                  </div>
                  
                  {/* Category badge */}
                  {book.category && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-amber-600 text-white text-xs font-medium rounded-full">
                        {book.category}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-amber-900 mb-1 line-clamp-1">{book.title}</h3>
                  <p className="text-amber-700 text-sm mb-2">by {book.author}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        star <= 4 ? (
                          <StarSolidIcon key={star} className="h-4 w-4 text-amber-400" />
                        ) : (
                          <StarIcon key={star} className="h-4 w-4 text-amber-400" />
                        )
                      ))}
                    </div>
                    <span className="text-xs text-amber-600 ml-1">(42)</span>
                  </div>
                  
                  <p className="text-amber-800 text-sm mb-4 line-clamp-2">{book.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-amber-600">Rs.{book.price.toFixed(2)}</span>
                    <button
                      onClick={() => addToCart(book)}
                      className="flex items-center bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform duration-200"
                    >
                      <ShoppingCartIcon className="h-4 w-4 mr-1" />
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
                  className="text-amber-600 hover:text-amber-800 p-1 rounded-full hover:bg-amber-100 transition-colors"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 flex items-center justify-center bg-amber-50 rounded-lg min-h-[300px] border border-amber-200">
                  {imageErrors[quickViewBook.id] ? (
                    <div className="flex flex-col items-center justify-center text-amber-300">
                      <PhotoIcon className="h-16 w-16 mb-2" />
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
                          <StarSolidIcon key={star} className="h-5 w-5 text-amber-400" />
                        ) : (
                          <StarIcon key={star} className="h-5 w-5 text-amber-400" />
                        )
                      ))}
                    </div>
                    <span className="text-sm text-amber-600 ml-2">(42 reviews)</span>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-amber-600">Rs.{quickViewBook.price.toFixed(2)}</span>
                  </div>
                  
                  <p className="text-amber-800 mb-6">{quickViewBook.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="text-sm font-medium text-amber-600">Publisher</h4>
                      <p className="text-amber-800">{quickViewBook.publisher || "Not specified"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-amber-600">Category</h4>
                      <p className="text-amber-800">{quickViewBook.category || "Not specified"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-amber-600">Language</h4>
                      <p className="text-amber-800">{quickViewBook.language || "Not specified"}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      onClick={() => {
                        addToCart(quickViewBook);
                        closeQuickView();
                      }}
                      className="flex-1 flex items-center justify-center bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform duration-200"
                    >
                      <ShoppingCartIcon className="h-5 w-5 mr-2" />
                      Add to Cart
                    </button>
                    
                    <button
                      onClick={() => toggleWishlist(quickViewBook)}
                      className="p-3 border border-amber-300 rounded-lg hover:bg-amber-50 transition-colors"
                    >
                      {wishlist.some(item => item.id === quickViewBook.id) ? (
                        <HeartSolidIcon className="h-6 w-6 text-red-500" />
                      ) : (
                        <HeartIcon className="h-6 w-6 text-amber-600" />
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