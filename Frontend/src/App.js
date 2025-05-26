import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./component/LoginPage";
import SignupPage from "./component/SignupPage";
import NavbarComponent from "./component/Navbar";
import Home from "./component/Home";
import ItemPreview from "./component/ItemPreview";
import Footer from "./component/Footer";
import CartPage from "./component/CartPage";
import OrderDetails from "./component/orderdetails";
import OrderSummary from "./component/ordersummary";
import Orders from "./component/orders";
import SuccessPage from "./component/SuccessPage";
import About from "./component/About";
import FrontPage from "./component/FrontPage";

// Function to check authentication
const isAuthenticated = () => {
  return localStorage.getItem("token"); // Simulating user authentication
};

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <NavbarComponent />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          {/* Protected Routes */}
          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/orders" element={<ProtectedRoute element={<Orders />} />} />
          <Route path="/cartpage" element={<ProtectedRoute element={<CartPage />} />} />
          <Route path="/orderdetails" element={<ProtectedRoute element={<OrderDetails />} />} />
          <Route path="/ordersummary" element={<ProtectedRoute element={<OrderSummary />} />} />
          <Route path="/about" element={<About />} />

          {/* Other Routes */}
          <Route path="/item/:id" element={<ItemPreview />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
