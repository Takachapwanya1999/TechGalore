import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthCartProvider } from './context/AuthCartContext';

import Navbar from './components/Navbar';

import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/Dashboard';
import NotFound from './pages/NotFound';
import Buy from './pages/buy/Buy';
import Sell from './pages/sell/Sell';
import Finance from './pages/finance/Finance';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Cart from './pages/cart/Cart';
import Checkout from './pages/checkout/Checkout';
import PaymentSuccess from './pages/PaymentSuccess';
import Orders from './pages/orders/Orders';
import Locations from './pages/locations/Locations';
import OurStory from './pages/ourstory/OurStory';

// Main App component with routing
// This is the main entry point for the application
// It sets up the router and defines all the routes for the app
// Each route corresponds to a different page in the application
// The Navbar component is included on every page for navigation
// The NotFound component is displayed for any unmatched routes
// This structure allows for easy navigation and organization of the app's pages
// Each page component is imported from its respective file in the pages directory
// The app uses React Router for client-side routing, enabling smooth transitions between pages
// The Navbar provides links to all major sections of the site, enhancing user experience
// The Home page serves as the landing page with options to buy or sell laptops
// The Dashboard is accessible for logged-in users to manage their accounts and view orders
// The Buy and Sell pages allow users to browse available laptops or list their own for sale
// The Finance page provides information on financing options and support services
// The About and Contact pages give users insight into the company and how to get in touch
// The Signup and Login pages handle user authentication
// The Cart and Checkout pages manage the shopping experience for users purchasing laptops
// The Orders page allows users to view their past orders and track current ones
// The Locations page helps users find physical store locations if applicable
// This modular approach keeps the code organized and maintainable, making it easy to add new features or pages in the future
// The app is designed to be responsive and user-friendly, catering to a wide audience interested in technology and laptops
// Overall, this structure provides a solid foundation for an e-commerce platform focused on laptops in South Africa

const App = () => {
  return (
    <AuthCartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/ourstory" element={<OurStory />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
                  <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthCartProvider>
  );
}

export default App;
