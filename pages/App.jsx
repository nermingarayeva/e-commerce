import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.scss"; // CSS file import

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderedItems, setOrderedItems] = useState([]);
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: Infinity });
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [colorFilter, setColorFilter] = useState("");
  const [sizeFilter, setSizeFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));

    const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
    setOrderedItems(storedBasket);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const addToBasket = (product) => {
    const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
    const existingProduct = storedBasket.find((item) => item.id === product.id);

    if (existingProduct) {
      const updatedBasket = storedBasket.filter((item) => item.id !== product.id);
      localStorage.setItem("basket", JSON.stringify(updatedBasket));
      setOrderedItems(updatedBasket);
    } else {
      product.quantity = 1;
      storedBasket.push(product);
      localStorage.setItem("basket", JSON.stringify(storedBasket));
      setOrderedItems(storedBasket);
    }
  };

  const filteredAndSortedProducts = [...products]
    .filter(
      (item) =>
        (categoryFilter === "all" ||
          item.category.toLowerCase() === categoryFilter.toLowerCase()) &&
        item.price >= priceFilter.min &&
        item.price <= priceFilter.max &&
        (colorFilter
          ? item.color.toLowerCase() === colorFilter.toLowerCase()
          : true) &&
        (sizeFilter
          ? item.size.toLowerCase() === sizeFilter.toLowerCase()
          : true)
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    });

  const goToBasket = () => {
    navigate("/basket");
  };

  return (
    <div className="app-container">
      <h1>Shop</h1>

      {/* Left Panel: Filters */}
      <div className="filters-panel">
        <div>
          <label>Min Price:</label>
          <input
            type="number"
            onChange={(e) =>
              setPriceFilter({ ...priceFilter, min: Number(e.target.value) })
            }
            placeholder="0"
          />
        </div>
        <div>
          <label>Max Price:</label>
          <input
            type="number"
            onChange={(e) =>
              setPriceFilter({ ...priceFilter, max: Number(e.target.value) })
            }
            placeholder="1000"
          />
        </div>
        <div>
          <label>Sort:</label>
          <select onChange={(e) => setSortOrder(e.target.value)}>
            <option value="">Default</option>
            <option value="asc">Price: Low → High</option>
            <option value="desc">Price: High → Low</option>
          </select>
        </div>
        <div>
          <label>Category:</label>
          <select onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </div>
        {/* Color Filter */}
        <div>
          <label>Color:</label>
          <select onChange={(e) => setColorFilter(e.target.value)}>
            <option value="">All</option>
            <option value="green">Green</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
          </select>
        </div>
        {/* Size Filter */}
        <div>
          <label>Size:</label>
          <select onChange={(e) => setSizeFilter(e.target.value)}>
            <option value="">All</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
      </div>

      {/* Right Panel: Product List */}
      <div className="products-container">
        {filteredAndSortedProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <p>
              <span>{product.rating} / 5</span>
            </p>
            <button
              onClick={() => addToBasket(product)}
              className="order-button"
            >
              {orderedItems.some((item) => item.id === product.id)
                ? "Remove from Basket"
                : "Add to Basket"}
            </button>
          </div>
        ))}
      </div>

      <button onClick={goToBasket}>Go to Basket</button>
    </div>
  );
}

export default App;
