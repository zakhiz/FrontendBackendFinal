import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "../components/ItemDetail";
const ProductDetail = () => {
    const [detail,setDetail]= useState({});
    const {id} = useParams();
    const producto = import.meta.env.VITE_APP_URL_PRODUCTS;    
    useEffect(() => {
        const fetchProduct = async () => {
          let result = await fetch(`${producto}/${id}`);
          const data = await result.json();
          setDetail(data.payload);
        };
        fetchProduct();
      }, [id]);

    return (
        <>
          <ItemDetail detail={detail}/>  
        </>
    );
}

export default ProductDetail;
