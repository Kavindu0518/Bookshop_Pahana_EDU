import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/CreateCustomer';
import BookAdd from './components/BookAdd';
import BookList from './components/BookList';
import CartPage from './pages/Cart';
import CheckoutPage from './pages/CheckoutPage';
import DownloadPDFPage from './pages/DownloadPDFPage';
import BookEditDeletePage from './Admin/BookEditDeletePage';
import Allbook from './Admin/Allbook';
import Register from './Admin/Register';
import Login from './Admin/Login';
import AdminDashboard from './Admin/Dashboard';
import  UserProfile from './pages/UserProfile';
import AdminUserList from './Admin/AllUsers'; // Import the AdminUserList component
import Navbar from './components/Navbar';
import Home from './pages/Home'; // Assuming you have a Home component
import Aboutus from './pages/Aboutus';
import Footer from './components/Footer';
import EditBookPage from './Admin/Editbook';
import Bookview from './components/bookview';
import ContactUs from './components/contactus';
import Guide from './components/guide';
import EditUser from './Admin/EditUser';
import BookHome from './components/bookhome';





const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/addbook" element={<BookAdd />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/login" element={<LoginPage />} /> {/* Default route */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/download-pdf" element={<DownloadPDFPage />} />
        <Route path="/editorder" element={<BookEditDeletePage />} />
        <Route path="/allbooks" element={<Allbook />} />
        <Route path="/admin/register" element={<Register />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/admin/users" element={<AdminUserList />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/home" element={<Home />} /> {/* Assuming you have a Home component */}
        <Route path="/aboutus" element={<Aboutus />} /> {/* Assuming you have an Aboutus component */}
        <Route path="/footer" element={<Footer />} /> {/* Assuming you have a Footer component */}
        <Route path="/editbookview" element={<EditBookPage />} />
        <Route path="/bookview" element={<Bookview />} />  
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/admin/edit-user/:id" element={<EditUser />} />
        <Route path="/bookhome" element={<BookHome />} />
        
        
      </Routes>
    </Router>
  );
};

export default App;
