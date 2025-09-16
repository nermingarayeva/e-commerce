import React, { useState } from "react";
import "../styles/global.scss";
import { FiShoppingCart } from "react-icons/fi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { SlArrowDown } from "react-icons/sl";

const Home = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  return (
    <div className="shop-page">
      {/* Sign up */}

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
          <ul>
            <li>
              <a href="#">
                Shop <SlArrowDown />
              </a>
            </li>
            <li>
              <a href="#">On Sale</a>
            </li>
            <li>
              <a href="#">New Arrivals</a>
            </li>
            <li>
              <a href="#">Brands</a>
            </li>
          </ul>
        </nav>
        <div className="input-container">
          <FaSearch className="search-icon" /> {/* İkonu daxil etdik */}
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search for products"
          />
        </div>
        <div className="user-actions">
          <FiShoppingCart />
          <IoPersonCircleOutline />
        </div>
      </header>

      {/* Main Banner */}
      <section className="main-banner">
        <h2>FIND CLOTHES THAT MATCHES YOUR STYLE</h2>
        <h4>
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.
        </h4>
        <button className="shop-now">Shop Now</button>
        <div class="stats-container">
  <div class="stat-item">
    <span class="stat-number">200+</span>
    <span class="stat-label">International Brands</span>
  </div>
  <div class="stat-item">
    <span class="stat-number">2,000+</span>
    <span class="stat-label">High-Quality Products</span>
  </div>
  <div class="stat-item">
    <span class="stat-number">30,000+</span>
    <span class="stat-label">Happy Customers</span>
  </div>
</div>

      </section>

      {/* Brand Section */}
      <section className="brands">
        <ul>
          <li>
            <img src="brand-logo1.png" alt="Versace" />
          </li>
          <li>
            <img src="brand-logo2.png" alt="Zara" />
          </li>
          <li>
            <img src="brand-logo3.png" alt="Gucci" />
          </li>
          <li>
            <img src="brand-logo4.png" alt="Prada" />
          </li>
          <li>
            <img src="brand-logo5.png" alt="Calvin Klein" />
          </li>
        </ul>
      </section>

      {/* New Arrivals */}
      <section className="new-arrivals">
        <h3>NEW ARRIVALS</h3>
        <div className="product-grid">
          {/* Mock Products */}
          <div className="product-card">
            <img src="product1.jpg" alt="T-shirt" />
            <h4>Trendy T-shirt</h4>
            <p>$70</p>
          </div>
          <div className="product-card">
            <img src="product2.jpg" alt="Jeans" />
            <h4>Blue Jeans</h4>
            <p>$620</p>
          </div>
          {/* Add more products here */}
        </div>
      </section>

      {/* Top Selling */}
      <section className="top-selling">
        <h3>TOP SELLING</h3>
        <div className="product-grid">
          {/* Mock Products */}
          <div className="product-card">
            <img src="product1.jpg" alt="T-shirt" />
            <h4>Vertical Striped Shirt</h4>
            <p>$122</p>
          </div>
          <div className="product-card">
            <img src="product2.jpg" alt="Jeans" />
            <h4>Orange Graphic T-shirt</h4>
            <p>$142</p>
          </div>
          {/* Add more products here */}
        </div>
      </section>

      {/* Browse by Dress Style */}
      <section className="browse-style">
        <h3>BROWSE BY DRESS STYLE</h3>
        <div className="styles">
          <div className="style-card">
            <img src="casual.jpg" alt="Casual" />
            <p>Casual</p>
          </div>
          <div className="style-card">
            <img src="formal.jpg" alt="Formal" />
            <p>Formal</p>
          </div>
          <div className="style-card">
            <img src="gym.jpg" alt="Gym" />
            <p>Gym</p>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="customer-reviews">
        <h3>OUR HAPPY CUSTOMERS</h3>
        <div className="reviews">
          <div className="review">
            <p>"Great service and fast shipping!" - John D.</p>
          </div>
          <div className="review">
            <p>"Loved the clothes. Amazing quality." - Sarah S.</p>
          </div>
          {/* Add more reviews here */}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <form className="newsletter">
          <label>Stay up to date about our latest offers:</label>
          <input type="email" placeholder="Your email" />
          <button type="submit">Subscribe</button>
        </form>
        <div className="footer-links">
          <ul>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">Terms</a>
            </li>
          </ul>
        </div>
        <div className="social-links">
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
          <a href="#">Twitter</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
