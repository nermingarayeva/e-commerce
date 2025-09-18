import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NewArrivals = () => {
  const [products, setProducts] = useState([]); // Məhsul siyahısını saxlayırıq
  const [visibleNewArrivals, setVisibleNewArrivals] = useState(4); // İlk 4 məhsul göstərilsin
  const [loading, setLoading] = useState(true); // Yüklənir vəziyyəti
  const navigate = useNavigate(); // Yönləndirmək üçün useNavigate hook'u

  // Basketdəki məhsulları oxumaq
  const getBasket = () => {
    return JSON.parse(localStorage.getItem("basket")) || [];
  };

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data)) {
          setProducts(data);
          setLoading(false);
        } else {
          console.error("Gələn məlumat düzgün formatda deyil");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("API çağırışında səhv baş verdi:", error);
        setLoading(false);
      });
  }, []);

  const addToBasket = (product) => {
    const currentBasket = getBasket();

    // Məhsul varsa quantity artırırıq, yoxdursa əlavə edirik
    const existingProduct = currentBasket.find((p) => p.id === product.id);
    let updatedBasket;
    if (existingProduct) {
      updatedBasket = currentBasket.map((p) =>
        p.id === product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
      );
    } else {
      updatedBasket = [...currentBasket, { ...product, quantity: 1 }];
    }

    // Basketi yeniləyirik və localStorage-a yazırıq
    localStorage.setItem("basket", JSON.stringify(updatedBasket));

    // İstifadəçini basket səhifəsinə yönləndiririk
    navigate("/basket");
  };

  // Loading vəziyyəti
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="new-arrivals">
      <h2>New Arrivals</h2>
      <div className="product-list">
        {products.slice(0, visibleNewArrivals).map((product) => {
          // Basketdə məhsul olub olmadığını yoxlamaq
          const isInBasket = getBasket().some((item) => item.id === product.id);

          return (
            <div key={product.id} className="product-card">
              <Link to={`/products/${product.id}`}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>${product.price}</p>
                <p>
                  <span>{product.rating} / 5</span>
                </p>
              </Link>

              {/* Add to Basket düyməsi */}
              <button
                onClick={() => addToBasket(product)}
                className="order-button"
              >
                {isInBasket ? "Added to Basket" : "Add to Basket"}
              </button>
            </div>
          );
        })}
      </div>
      {visibleNewArrivals < products.length && (
        <button onClick={() => setVisibleNewArrivals(products.length)}>
          View All
        </button>
      )}
    </div>
  );
};

export default NewArrivals;
