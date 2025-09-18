import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { SlArrowDown } from 'react-icons/sl';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [inputValue, setInputValue] = useState("");
  const [basketCount, setBasketCount] = useState(0); // Basket item count
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for toggling mobile menu

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    // Fetch basket data from localStorage
    const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
    
    // Calculate total quantity
    const totalQuantity = storedBasket.reduce((acc, item) => acc + item.quantity, 0);
    setBasketCount(totalQuantity); // Update basket count
  }, []); // Run once when the component mounts

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); // Toggle the state for mobile menu visibility
  };

  return (
    <div>
      {/* Sign up section */}
      <section className="signup">
        <p>
          Sign up and get 20% off to your first order.
          <a href="">Sign Up Now</a>
        </p>
      </section>   

      {/* Header */}
      <header className="header">
        <h1 className="brand-title">SHOP.CO</h1>
        <nav className="navbar">
          {/* Hamburger Icon for Mobile */}
          <div className="hamburger-icon" onClick={toggleMobileMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>

          {/* Navbar Links */}
          <ul className={isMobileMenuOpen ? "active" : ""}>
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/shop" 
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Shop <SlArrowDown />
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/onsale" 
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                On Sale
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/newarrivals" 
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                New Arrivals
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/brands" 
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Brands
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="input-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search for products"
          />
        </div>

        <div className="user-actions">
          {/* Shopping cart icon */}
          <NavLink 
            to="/basket" 
            className={({ isActive }) => (isActive ? 'active-icon' : '')}
          >
            <FiShoppingCart />
            {/* Display basket count if it's more than 0 */}
            {basketCount > 0 && (
              <span className="basket-count">{basketCount}</span>
            )}
          </NavLink>
          <IoPersonCircleOutline />
        </div>
      </header>
    </div>
  );
};

export default Header;
