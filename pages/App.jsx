import React, { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API-dən məlumatları çəkirik
    fetch('http://localhost:5000/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data); // Mock məlumatlarını state-ə əlavə edirik
        setLoading(false);   // Yüklənməni bitiririk
      })
      .catch(error => console.error('Error fetching data: ', error));
  }, []);  // Komponent mount olduqda bir dəfə çalışır

  if (loading) {
    return <div>Loading...</div>;  // Yüklənmə vaxtı göstərilən mesaj
  }

  return (
    <div>
      <h1>New Arrivals</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <p><span>{product.rating} / 5</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
