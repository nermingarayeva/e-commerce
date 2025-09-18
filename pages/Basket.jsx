import React, { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import "../styles/global.scss";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "../components/Layout";

const Basket = () => {
  const [basket, setBasket] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation
  const location = useLocation(); // Get current location

  // `localStorage`-dən basket məlumatını alırıq
  useEffect(() => {
    const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
    setBasket(storedBasket);
  }, []); // Bu `useEffect` yalnız komponent mount olduqda işə düşəcək

  // Basketi `localStorage`-ə yazırıq
  useEffect(() => {
    if (basket.length > 0) {
      localStorage.setItem("basket", JSON.stringify(basket));
    }
  }, [basket]); // basket state dəyişdikcə localStorage yenilənir

  // Sayı artırmaq və azaltmaq
  const updateQuantity = (productId, action) => {
    setBasket((prevBasket) => {
      const updatedBasket = prevBasket.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity:
                action === "increase"
                  ? item.quantity + 1
                  : item.quantity > 1
                  ? item.quantity - 1
                  : 1,
            }
          : item
      );

      // LocalStorage-i yeniləyirik
      localStorage.setItem("basket", JSON.stringify(updatedBasket));

      return updatedBasket;
    });
  };

  // Məhsulu silmək
  const removeFromBasket = (productId) => {
    setBasket((prevBasket) => {
      const updatedBasket = prevBasket.filter((item) => item.id !== productId);

      // LocalStorage-i yeniləyirik
      localStorage.setItem("basket", JSON.stringify(updatedBasket));

      return updatedBasket;
    });
  };
  const generateKey = (item) => `${item.id}-${item.quantity}`;

  // Qiymətlər
  const subtotal = basket.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const discount = subtotal * 0.2; // 20% endirim
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;
  
  // Go to checkout (or previous page)
  const goToCheckout = () => {
    const previousPage = location.state?.from || "/shop"; // "from" state ilə əvvəlki səhifə məlumatını alırıq
    navigate(previousPage); // Navigate to the previous page or default '/shop'
  };

  return (
    <div>
      <Layout />
      <div className="cart-page">
        <div className="cart-items">
          <h2>Your Cart</h2>
          {basket.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            basket.map((item) => (
              <div key={generateKey(item)} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Size: {item.size}</p>
                  <p>Color: {item.color}</p>
                  <p className="price">${item.price}</p>
                </div>
                <div className="quantity">
                  <button onClick={() => updateQuantity(item.id, "decrease")}>
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, "increase")}>
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromBasket(item.id)}
                  className="remove-btn"
                >
                  <FiTrash2 />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="row">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <div className="row discount">
            <span>Discount (-20%)</span>
            <span>-${discount.toFixed(0)}</span>
          </div>
          <div className="row">
            <span>Delivery Fee</span>
            <span>${deliveryFee}</span>
          </div>
          <hr />
          <div className="row total">
            <span>Total</span>
            <span>${total.toFixed(0)}</span>
          </div>

          <div className="promo">
            <input type="text" placeholder="Add promo code" />
            <button>Apply</button>
          </div>

          <button className="checkout-btn" onClick={goToCheckout}>
            Go to Checkout →
          </button>
        </div>
      </div>
       <section className="newsletter">
        <div className="newsletter-content">
          <h2>STAY UPTO DATE ABOUT OUR LATEST OFFERS</h2>
          <form>
            <input type="email" placeholder="Enter your email address" />
            <button type="submit">Subscribe to Newsletter</button>
          </form>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-logo-desc">
            <h3>SHOP.CO</h3>
            <p>
              We have clothes that suits your style and which you’re proud to
              wear. From women to men.
            </p>
            <div className="social-icons">
              <a href="#">
                <i
                  style={{ color: "black", backgroundColor: "black" }}
                  className="fab fa-twitter"
                ></i>
              </a>
              <a href="#">
                <i
                  style={{ color: "black", backgroundColor: "white" }}
                  className="fab fa-facebook-f"
                ></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>COMPANY</h4>
              <ul>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Features</a>
                </li>
                <li>
                  <a href="#">Works</a>
                </li>
                <li>
                  <a href="#">Career</a>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>HELP</h4>
              <ul>
                <li>
                  <a href="#">Customer Support</a>
                </li>
                <li>
                  <a href="#">Delivery Details</a>
                </li>
                <li>
                  <a href="#">Terms & Conditions</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>FAQ</h4>
              <ul>
                <li>
                  <a href="#">Account</a>
                </li>
                <li>
                  <a href="#">Manage Deliveries</a>
                </li>
                <li>
                  <a href="#">Orders</a>
                </li>
                <li>
                  <a href="#">Payments</a>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>RESOURCES</h4>
              <ul>
                <li>
                  <a href="#">Free eBooks</a>
                </li>
                <li>
                  <a href="#">Development Tutorial</a>
                </li>
                <li>
                  <a href="#">How to - Blog</a>
                </li>
                <li>
                  <a href="#">Youtube Playlist</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Shop.co © 2000-2023, All Rights Reserved</p>
          <div className="payment-icons">
            <svg
              width="34"
              height="12"
              viewBox="0 0 34 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.0221 1.12099L14.8479 11.2845H12.2188L14.3933 1.12099H17.0221ZM28.0838 7.68363L29.468 3.86687L30.2645 7.68363H28.0838ZM31.0172 11.2845H33.4491L31.327 1.12099H29.0823C28.5779 1.12099 28.1523 1.41437 27.9628 1.86665L24.0184 11.2845H26.7794L27.3275 9.76684H30.7007L31.0172 11.2845ZM24.1554 7.96607C24.1667 5.28356 20.4458 5.13591 20.4715 3.93764C20.4792 3.57253 20.827 3.18523 21.5865 3.08583C21.9638 3.03661 23.0012 2.99897 24.1792 3.54101L24.6405 1.38574C24.0078 1.15605 23.1936 0.935059 22.1809 0.935059C19.5824 0.935059 17.7533 2.31668 17.7379 4.29503C17.7215 5.75804 19.0436 6.57447 20.0398 7.06085C21.0641 7.55914 21.4083 7.87825 21.4038 8.32378C21.397 9.00607 20.5867 9.30652 19.8307 9.31842C18.5086 9.33933 17.7414 8.96167 17.1299 8.67666L16.6535 10.9037C17.2676 11.1858 18.4015 11.4309 19.5779 11.4435C22.3395 11.4435 24.1464 10.0789 24.1554 7.96607ZM13.2652 1.12099L9.00549 11.2845H6.22584L4.12976 3.17332C4.00237 2.67375 3.89171 2.49104 3.50473 2.28033C2.87327 1.93774 1.82941 1.61574 0.911011 1.4163L0.973739 1.12099H5.44737C6.01739 1.12099 6.53047 1.50058 6.65979 2.15713L7.76702 8.03877L10.5029 1.12099H13.2652Z"
                fill="#1434CB"
              />
            </svg>
            <svg
              width="66"
              height="49"
              viewBox="0 0 66 49"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_dd_20_322)">
                <rect
                  x="9.61426"
                  y="5"
                  width="46.6143"
                  height="30.0304"
                  rx="5.37857"
                  fill="white"
                />
                <rect
                  x="9.5022"
                  y="4.88795"
                  width="46.8384"
                  height="30.2545"
                  rx="5.49062"
                  stroke="#D6DCE5"
                  strokeWidth="0.224107"
                />
                <path
                  d="M36.2699 13.8484H29.4066V26.1819H36.2699V13.8484Z"
                  fill="#FF5F00"
                />
                <path
                  d="M29.8425 20.0151C29.8414 18.8273 30.1105 17.6548 30.6296 16.5864C31.1486 15.518 31.9039 14.5817 32.8383 13.8484C31.6812 12.9389 30.2915 12.3732 28.8282 12.2162C27.3648 12.0591 25.8867 12.3169 24.563 12.9602C23.2392 13.6034 22.1231 14.6061 21.3423 15.8537C20.5614 17.1013 20.1473 18.5434 20.1473 20.0151C20.1473 21.4869 20.5614 22.929 21.3423 24.1766C22.1231 25.4241 23.2392 26.4269 24.563 27.0701C25.8867 27.7133 27.3648 27.9712 28.8282 27.8141C30.2915 27.657 31.6812 27.0914 32.8383 26.1819C31.9039 25.4485 31.1486 24.5122 30.6296 23.4438C30.1105 22.3754 29.8414 21.2029 29.8425 20.0151Z"
                  fill="#EB001B"
                />
                <path
                  d="M45.5289 20.0151C45.5289 21.4869 45.1149 22.929 44.3341 24.1765C43.5533 25.4241 42.4372 26.4268 41.1135 27.0701C39.7897 27.7133 38.3117 27.9712 36.8484 27.8141C35.385 27.657 33.9954 27.0914 32.8383 26.1819C33.7719 25.4478 34.5266 24.5113 35.0455 23.4431C35.5645 22.3749 35.8341 21.2028 35.8341 20.0151C35.8341 18.8275 35.5645 17.6554 35.0455 16.5872C34.5266 15.5189 33.7719 14.5825 32.8383 13.8484C33.9954 12.9389 35.385 12.3732 36.8484 12.2162C38.3117 12.0591 39.7897 12.3169 41.1135 12.9602C42.4372 13.6034 43.5533 14.6062 44.3341 15.8537C45.1149 17.1013 45.5289 18.5434 45.5289 20.0151Z"
                  fill="#F79E1B"
                />
                <path
                  d="M44.7805 24.8756V24.6231H44.8824V24.5716H44.6231V24.6231H44.7249V24.8756H44.7805ZM45.284 24.8756V24.5711H45.2045L45.1131 24.7805L45.0216 24.5711H44.9421V24.8756H44.9982V24.6459L45.0839 24.8439H45.1421L45.2279 24.6454V24.8756H45.284Z"
                  fill="#F79E1B"
                />
              </g>
              <defs>
                <filter
                  id="filter0_dd_20_322"
                  x="0.425851"
                  y="0.293736"
                  width="64.9911"
                  height="48.4071"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="0.448214" />
                  <feGaussianBlur stdDeviation="2.24107" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.717647 0 0 0 0 0.717647 0 0 0 0 0.717647 0 0 0 0.08 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_20_322"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4.48214" />
                  <feGaussianBlur stdDeviation="4.48214" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.717647 0 0 0 0 0.717647 0 0 0 0 0.717647 0 0 0 0.08 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="effect1_dropShadow_20_322"
                    result="effect2_dropShadow_20_322"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect2_dropShadow_20_322"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
            <svg
              width="35"
              height="10"
              viewBox="0 0 35 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.42569 0.645996H1.7382C1.55429 0.645996 1.39788 0.779641 1.3692 0.961111L0.282238 7.85185C0.260634 7.98786 0.365947 8.11042 0.503883 8.11042H1.78692C1.97083 8.11042 2.12724 7.97677 2.15592 7.79494L2.44908 5.93642C2.47736 5.75441 2.63416 5.62094 2.81768 5.62094H3.66845C5.4388 5.62094 6.46045 4.76433 6.72742 3.06692C6.84762 2.32431 6.73251 1.74081 6.38462 1.33205C6.00273 0.883467 5.32514 0.645996 4.42569 0.645996ZM4.73575 3.16274C4.58881 4.127 3.85198 4.127 3.13953 4.127H2.73398L3.01849 2.32613C3.03538 2.21739 3.12969 2.13721 3.23973 2.13721H3.4256C3.91092 2.13721 4.36877 2.13721 4.60536 2.41377C4.7463 2.57888 4.78958 2.82399 4.73575 3.16274ZM12.4593 3.13183H11.1723C11.0626 3.13183 10.9679 3.21202 10.951 3.32094L10.8941 3.68079L10.804 3.55041C10.5254 3.14601 9.90422 3.01091 9.2841 3.01091C7.86182 3.01091 6.64722 4.08791 6.41063 5.59876C6.28769 6.35227 6.46246 7.07288 6.88999 7.57546C7.28225 8.0375 7.84345 8.23006 8.51104 8.23006C9.6569 8.23006 10.2925 7.49327 10.2925 7.49327L10.235 7.85094C10.2134 7.98768 10.3187 8.11023 10.4558 8.11023H11.6151C11.7995 8.11023 11.955 7.97659 11.9841 7.79475L12.6797 3.3904C12.7017 3.25493 12.5968 3.13183 12.4593 3.13183ZM10.6653 5.63639C10.5411 6.37154 9.95751 6.86504 9.21336 6.86504C8.83965 6.86504 8.54086 6.74521 8.34919 6.51811C8.15897 6.29263 8.08659 5.97152 8.14715 5.61403C8.26317 4.88507 8.85656 4.37557 9.58944 4.37557C9.95478 4.37557 10.2519 4.49685 10.4476 4.72596C10.6436 4.95743 10.7215 5.28037 10.6653 5.63639ZM18.0202 3.13165H19.3135C19.4947 3.13165 19.6003 3.33476 19.4974 3.48332L15.196 9.69145C15.1263 9.792 15.0116 9.85183 14.889 9.85183H13.5973C13.4155 9.85183 13.3093 9.64708 13.4146 9.49816L14.7539 7.60783L13.3294 3.42785C13.2802 3.28257 13.3875 3.13165 13.542 3.13165H14.8128C14.978 3.13165 15.1236 3.24002 15.1713 3.39804L15.9272 5.9226L17.711 3.29548C17.7809 3.19293 17.8969 3.13165 18.0202 3.13165Z"
                fill="#253B80"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M32.0427 7.85123L33.1457 0.834488C33.1626 0.72557 33.257 0.645383 33.3666 0.64502H34.6083C34.7455 0.64502 34.8507 0.767938 34.8291 0.903949L33.7414 7.79432C33.7131 7.97615 33.5567 8.1098 33.3725 8.1098H32.2635C32.1264 8.1098 32.0211 7.98725 32.0427 7.85123ZM23.5958 0.64538H20.9078C20.7243 0.64538 20.5679 0.779028 20.5392 0.960497L19.4523 7.85123C19.4306 7.98725 19.5359 8.1098 19.6732 8.1098H21.0524C21.1806 8.1098 21.2903 8.01634 21.3103 7.88905L21.6187 5.93581C21.6471 5.75379 21.8038 5.62033 21.9873 5.62033H22.8377C24.6084 5.62033 25.6298 4.76371 25.897 3.0663C26.0176 2.3237 25.9017 1.7402 25.554 1.33144C25.1723 0.882855 24.4953 0.64538 23.5958 0.64538ZM23.9059 3.16213C23.7593 4.12639 23.0224 4.12639 22.3096 4.12639H21.9044L22.1893 2.32552C22.2063 2.21678 22.2997 2.13659 22.4101 2.13659H22.596C23.081 2.13659 23.5393 2.13659 23.7757 2.41316C23.9168 2.57826 23.9597 2.82338 23.9059 3.16213ZM31.6287 3.13122H30.3426C30.232 3.13122 30.1382 3.21141 30.1216 3.32032L30.0647 3.68017L29.9743 3.5498C29.6957 3.1454 29.0749 3.0103 28.4548 3.0103C27.0325 3.0103 25.8182 4.0873 25.5817 5.59815C25.4591 6.35166 25.6331 7.07226 26.0607 7.57485C26.4536 8.03689 27.0141 8.22945 27.6817 8.22945C28.8276 8.22945 29.463 7.49266 29.463 7.49266L29.4057 7.85033C29.384 7.98707 29.4893 8.10962 29.6274 8.10962H30.7861C30.9696 8.10962 31.126 7.97597 31.1548 7.79414L31.8507 3.38979C31.872 3.25432 31.7667 3.13122 31.6287 3.13122ZM29.8349 5.63578C29.7114 6.37093 29.1271 6.86443 28.3828 6.86443C28.0098 6.86443 27.7104 6.7446 27.5186 6.51749C27.3284 6.29202 27.2569 5.9709 27.3167 5.61342C27.4333 4.88445 28.026 4.37496 28.7588 4.37496C29.1243 4.37496 29.4213 4.49624 29.6172 4.72535C29.8139 4.95682 29.8918 5.27975 29.8349 5.63578Z"
                fill="#179BD7"
              />
            </svg>
            <svg
              width="66"
              height="49"
              viewBox="0 0 66 49"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_dd_20_326)">
                <rect
                  x="9.8429"
                  y="5"
                  width="46.6143"
                  height="30.0304"
                  rx="5.37857"
                  fill="white"
                />
                <rect
                  x="9.73084"
                  y="4.88795"
                  width="46.8384"
                  height="30.2545"
                  rx="5.49062"
                  stroke="#D6DCE5"
                  strokeWidth="0.224107"
                />
                <path
                  d="M24.9199 16.0817C25.2309 15.6927 25.4419 15.1704 25.3863 14.6367C24.931 14.6594 24.3755 14.9371 24.0538 15.3264C23.7651 15.6597 23.5095 16.2039 23.5761 16.7152C24.0871 16.7595 24.5977 16.4598 24.9199 16.0817Z"
                  fill="#000008"
                />
                <path
                  d="M25.3805 16.8151C24.6383 16.7709 24.0073 17.2363 23.6529 17.2363C23.2983 17.2363 22.7556 16.8373 22.1686 16.8481C21.4045 16.8593 20.6956 17.2913 20.3079 17.9784C19.5105 19.3528 20.0975 21.3916 20.8729 22.511C21.2495 23.0648 21.7034 23.6746 22.3014 23.6527C22.8664 23.6305 23.0879 23.2868 23.7747 23.2868C24.461 23.2868 24.6605 23.6527 25.2587 23.6416C25.8789 23.6305 26.2667 23.0875 26.6433 22.5332C27.0753 21.9019 27.2522 21.2923 27.2633 21.2588C27.2522 21.2477 26.0672 20.7932 26.0562 19.4302C26.0451 18.2889 26.9865 17.746 27.0309 17.7123C26.4992 16.926 25.6685 16.8373 25.3805 16.8151Z"
                  fill="#000008"
                />
                <path
                  d="M31.8425 15.2705C33.4556 15.2705 34.5788 16.3824 34.5788 18.0013C34.5788 19.6259 33.4325 20.7435 31.8021 20.7435H30.0161V23.5837H28.7258V15.2705L31.8425 15.2705ZM30.0161 19.6604H31.4967C32.6202 19.6604 33.2596 19.0556 33.2596 18.007C33.2596 16.9586 32.6202 16.3594 31.5025 16.3594H30.0161V19.6604Z"
                  fill="#000008"
                />
                <path
                  d="M34.9159 21.8612C34.9159 20.8011 35.7283 20.1501 37.1686 20.0695L38.8277 19.9716V19.505C38.8277 18.8309 38.3725 18.4276 37.6122 18.4276C36.8919 18.4276 36.4426 18.7732 36.3332 19.3148H35.158C35.2271 18.2201 36.1603 17.4136 37.6582 17.4136C39.1273 17.4136 40.0663 18.1914 40.0663 19.4069V23.5837H38.8737V22.5871H38.845C38.4937 23.2611 37.7274 23.6874 36.9324 23.6874C35.7456 23.6874 34.9159 22.95 34.9159 21.8612ZM38.8277 21.3139V20.8358L37.3355 20.9279C36.5923 20.9798 36.1719 21.3081 36.1719 21.8266C36.1719 22.3566 36.6097 22.7023 37.278 22.7023C38.1478 22.7023 38.8277 22.1031 38.8277 21.3139Z"
                  fill="#000008"
                />
                <path
                  d="M41.1922 25.8133V24.8051C41.2842 24.8281 41.4915 24.8281 41.5953 24.8281C42.1714 24.8281 42.4825 24.5861 42.6725 23.964C42.6725 23.9524 42.7821 23.5953 42.7821 23.5895L40.593 17.5231H41.9409L43.4735 22.4546H43.4964L45.029 17.5231H46.3425L44.0724 23.9005C43.5542 25.3697 42.955 25.8421 41.6991 25.8421C41.5953 25.8421 41.2842 25.8305 41.1922 25.8133Z"
                  fill="#000008"
                />
              </g>
              <defs>
                <filter
                  id="filter0_dd_20_326"
                  x="0.654489"
                  y="0.293736"
                  width="64.9911"
                  height="48.4071"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="0.448214" />
                  <feGaussianBlur stdDeviation="2.24107" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.717647 0 0 0 0 0.717647 0 0 0 0 0.717647 0 0 0 0.08 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_20_326"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4.48214" />
                  <feGaussianBlur stdDeviation="4.48214" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.717647 0 0 0 0 0.717647 0 0 0 0 0.717647 0 0 0 0.08 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="effect1_dropShadow_20_326"
                    result="effect2_dropShadow_20_326"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect2_dropShadow_20_326"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
            <svg
              width="66"
              height="49"
              viewBox="0 0 66 49"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_dd_20_328)">
                <rect
                  x="9.45715"
                  y="5"
                  width="46.6143"
                  height="30.0304"
                  rx="5.37857"
                  fill="white"
                />
                <rect
                  x="9.3451"
                  y="4.88795"
                  width="46.8384"
                  height="30.2545"
                  rx="5.49062"
                  stroke="#D6DCE5"
                  strokeWidth="0.224107"
                />
                <path
                  d="M31.751 23.6143H30.7025V15.4561H33.482C34.1864 15.4561 34.7871 15.6909 35.2785 16.1605C35.7809 16.6301 36.0321 17.2035 36.0321 17.8806C36.0321 18.5741 35.7809 19.1475 35.2785 19.6116C34.7925 20.0758 34.1919 20.3051 33.482 20.3051H31.751V23.6143ZM31.751 16.4608V19.3058H33.5038C33.9188 19.3058 34.2683 19.1639 34.5414 18.8854C34.8198 18.6069 34.9618 18.2683 34.9618 17.8861C34.9618 17.5093 34.8198 17.1762 34.5414 16.8977C34.2683 16.6083 33.9243 16.4663 33.5038 16.4663H31.751V16.4608Z"
                  fill="#3C4043"
                />
                <path
                  d="M38.7732 17.8478C39.5487 17.8478 40.1603 18.0553 40.608 18.4703C41.0558 18.8854 41.2797 19.4533 41.2797 20.1741V23.6143H40.2804V22.8389H40.2367C39.8053 23.4778 39.2265 23.7945 38.5057 23.7945C37.8886 23.7945 37.3753 23.6143 36.9603 23.2484C36.5453 22.8826 36.3378 22.4293 36.3378 21.8833C36.3378 21.3044 36.5562 20.8457 36.9931 20.5072C37.4299 20.1632 38.0142 19.9939 38.7405 19.9939C39.363 19.9939 39.8763 20.1085 40.2749 20.3379V20.0976C40.2749 19.7318 40.1329 19.426 39.8435 19.1693C39.5541 18.9127 39.2156 18.7871 38.8279 18.7871C38.2436 18.7871 37.7794 19.0328 37.4408 19.5297L36.518 18.9509C37.0258 18.2137 37.7794 17.8478 38.7732 17.8478ZM37.419 21.8996C37.419 22.1727 37.5337 22.402 37.7685 22.5822C37.9978 22.7624 38.2709 22.8553 38.5821 22.8553C39.0244 22.8553 39.4176 22.6914 39.7616 22.3638C40.1056 22.0362 40.2804 21.6539 40.2804 21.2116C39.9527 20.955 39.4995 20.8239 38.9152 20.8239C38.4893 20.8239 38.1343 20.9276 37.8504 21.1297C37.561 21.3427 37.419 21.5993 37.419 21.8996Z"
                  fill="#3C4043"
                />
                <path
                  d="M46.9807 18.0281L43.4858 26.0662H42.4046L43.7043 23.2539L41.3999 18.0281H42.5412L44.2012 22.0362H44.223L45.8394 18.0281H46.9807Z"
                  fill="#3C4043"
                />
                <path
                  d="M27.5806 19.6444C27.5806 19.3026 27.55 18.9755 27.4932 18.6609H23.0985V20.4629L25.6295 20.4635C25.5268 21.0631 25.1965 21.5742 24.6903 21.9149V23.0841H26.1969C27.0766 22.2699 27.5806 21.0664 27.5806 19.6444Z"
                  fill="#4285F4"
                />
                <path
                  d="M24.6908 21.915C24.2714 22.1979 23.7314 22.3633 23.0996 22.3633C21.8791 22.3633 20.8438 21.5409 20.473 20.4324H18.9189V21.6381C19.6888 23.166 21.2713 24.2145 23.0996 24.2145C24.3632 24.2145 25.4247 23.7989 26.1974 23.0836L24.6908 21.915Z"
                  fill="#34A853"
                />
                <path
                  d="M20.3266 19.5379C20.3266 19.2266 20.3785 18.9258 20.473 18.6429V17.4372H18.9189C18.6005 18.069 18.4214 18.7821 18.4214 19.5379C18.4214 20.2937 18.601 21.0068 18.9189 21.6386L20.473 20.4329C20.3785 20.15 20.3266 19.8492 20.3266 19.5379Z"
                  fill="#FABB05"
                />
                <path
                  d="M23.0996 16.712C23.7892 16.712 24.4068 16.9495 24.8945 17.4137L26.2296 16.0797C25.4187 15.3245 24.3615 14.8608 23.0996 14.8608C21.2719 14.8608 19.6888 15.9093 18.9189 17.4372L20.473 18.6429C20.8437 17.5344 21.8791 16.712 23.0996 16.712Z"
                  fill="#E94235"
                />
              </g>
              <defs>
                <filter
                  id="filter0_dd_20_328"
                  x="0.268746"
                  y="0.293736"
                  width="64.9911"
                  height="48.4071"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="0.448214" />
                  <feGaussianBlur stdDeviation="2.24107" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.717647 0 0 0 0 0.717647 0 0 0 0 0.717647 0 0 0 0.08 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_20_328"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4.48214" />
                  <feGaussianBlur stdDeviation="4.48214" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.717647 0 0 0 0 0.717647 0 0 0 0 0.717647 0 0 0 0.08 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="effect1_dropShadow_20_328"
                    result="effect2_dropShadow_20_328"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect2_dropShadow_20_328"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Basket;
