


import React, { useState, useEffect } from "react";
import axios from "axios";

const AllBooksEditDeletePage = () => {
  const [books, setBooks] = useState([]);
  const [editingBookId, setEditingBookId] = useState(null); // Tracks the book being edited
  const [currentBookData, setCurrentBookData] = useState({
    title: "",
    author: "",
    price: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all books
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/books");
        setBooks(response.data); // Set the list of books
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setError("Failed to fetch books");
      }
    };

    fetchBooks();
  }, []);

  const handleEditClick = (book) => {
    // When clicking the edit button, populate the edit form with the book details
    setEditingBookId(book.id);
    setCurrentBookData({
      title: book.title,
      author: book.author,
      price: book.price,
      description: book.description,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentBookData({
      ...currentBookData,
      [name]: value,
    });
  };

  const handleSaveEdit = async () => {
    if (editingBookId === null) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("title", currentBookData.title);
    formData.append("author", currentBookData.author);
    formData.append("price", currentBookData.price);
    formData.append("description", currentBookData.description);
    formData.append("language", currentBookData.language);
    formData.append("category", currentBookData.category);
    formData.append("publisher", currentBookData.publisher);

    // Only append image if it's selected
    if (currentBookData.image instanceof File) {
      formData.append("image", currentBookData.image);  // Attach image file
    }

    try {
      await axios.put(`http://localhost:8080/api/books/${editingBookId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
      setEditingBookId(null); // Exit edit mode
      alert("Book updated successfully!");
      // Fetch updated books list
      const updatedBooks = await axios.get("http://localhost:8080/api/books");
      setBooks(updatedBooks.data);
    } catch (error) {
      setLoading(false);
      console.error("Error updating book", error); // Log the error for debugging
      setError("Failed to update book details");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await axios.delete(`http://localhost:8080/api/books/${id}`);
        alert("Book deleted successfully!");
        // Fetch updated books list
        const updatedBooks = await axios.get("http://localhost:8080/api/books");
        setBooks(updatedBooks.data);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        alert("Failed to delete the book");
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-8">All Books</h2>
      {error && <div className="text-red-500">{error}</div>}

      {/* Edit Book Form */}
      {editingBookId && (
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Edit Book</h3>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label className="block text-lg">Title</label>
              <input
                type="text"
                name="title"
                value={currentBookData.title}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-lg">Author</label>
              <input
                type="text"
                name="author"
                value={currentBookData.author}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-lg">Price</label>
              <input
                type="number"
                name="price"
                value={currentBookData.price}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-lg">Description</label>
              <textarea
                name="description"
                value={currentBookData.description}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="text-center">
              <button
                onClick={handleSaveEdit}
                className={`bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={loading}
              >
                {loading ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* All Books List */}
      <div>
        {books.map((book) => (
          <div key={book.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-4">
            <div className="flex items-center">
              <img
                src={`http://localhost:8080/api/books/uploads/${book.image}`}
                alt={book.title}
                className="w-16 h-16 object-cover rounded-lg mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p className="text-gray-600">By {book.author}</p>
                <p className="text-gray-700">{`$${book.price.toFixed(2)}`}</p>
              </div>
            </div>
            <div className="space-x-4">
              <button
                onClick={() => handleEditClick(book)} // Enter edit mode for this book
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(book.id)} // Delete this book
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooksEditDeletePage;

