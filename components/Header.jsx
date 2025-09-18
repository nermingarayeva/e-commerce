import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [inputValue, setInputValue] = useState("");
  const [basketCount, setBasketCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
    const totalQuantity = storedBasket.reduce((acc, item) => acc + item.quantity, 0);
    setBasketCount(totalQuantity);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); // Menü açılıb-bağlanma funksiyası
  };

  return (
    <div>
      <section className="signup">
        <p>
          Sign up and get 20% off on your first order.
          <a href="">Sign Up Now</a>
        </p>
      </section>

      <header className="header">
        <h1 className="brand-title">SHOP.CO</h1>
        <nav className="navbar">
          <div className="hamburger-icon" onClick={toggleMobileMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>

          <ul className={isMobileMenuOpen ? "active" : ""}>
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop" className={({ isActive }) => (isActive ? 'active' : '')}>
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink to="/onsale" className={({ isActive }) => (isActive ? 'active' : '')}>
                On Sale
              </NavLink>
            </li>
            <li>
              <NavLink to="/newarrivals" className={({ isActive }) => (isActive ? 'active' : '')}>
                New Arrivals
              </NavLink>
            </li>
            <li>
              <NavLink to="/brands" className={({ isActive }) => (isActive ? 'active' : '')}>
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
          <NavLink to="/basket" className={({ isActive }) => (isActive ? 'active-icon' : '')}>
            <FiShoppingCart />
            {basketCount > 0 && <span className="basket-count">{basketCount}</span>}
          </NavLink>
          <IoPersonCircleOutline />
        </div>
      </header>
    </div>
  );
};
export default Header;