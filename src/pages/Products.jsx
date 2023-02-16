import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
const Products = () => {
  const [products, setProducts] = useState([]);

  const productos = import.meta.env.VITE_APP_URL_PRODUCTS;

  useEffect(() => {
    const fetchProducts = async () => {
      let result = await fetch(`${productos}`);
      const data = await result.json();
      setProducts(data.payload);
    };
    fetchProducts();
  }, []);
  


  return (
    <>
      <div className="container__carts">
        {
            products&&products.map(product => <ProductCard key={product._id} product={product}/>)
        }   
      </div>
    </>
  );
};

export default Products;
