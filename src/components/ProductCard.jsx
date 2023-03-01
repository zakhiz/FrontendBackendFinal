import { Link } from "react-router-dom";

const ProductCard = (props) => {
  const urlDB = import.meta.env.VITE_APP_BASE_URL;
  const addprod = import.meta.env.VITE_ADDPRODUCT;
  const nameCookie = import.meta.env.VITE_COOKIE;
  const { product } = props;
  let cookie = document.cookie.split(";").find((cookie) => cookie.startsWith(`${nameCookie}=`))
    
    if(typeof cookie === "string" ){
     cookie = cookie.split('=')[1];
    }
  const handleAddProduct= async (e) => {
      if(cookie === undefined){
        alert(`inicie sesion para comenzar a comprar`)
        window.location.replace("/login");
      }else{
        const id = e.target.dataset.id;
      const addProduct = {
        id,
        token : cookie
      }
      await fetch(`${urlDB}${addprod}`, {
        method: "POST",
        body: JSON.stringify(addProduct),
        headers: {
         "Content-Type": "application/json",
      },
      credentials: "include"
      }).then((result) => result.json())
      .then((json) => {
        if (json.status === "success") {
            alert(`producto id : ${id} `)
        }
      });
      }

  }
  return (
    <div className="card__container">
      <img className="carts__foto" src={product.image} />
      <div className="space">
        <div className="modelo">
          <img className="bandera" src="./japon.png" alt="" />
          <p>{product.model}</p>
        </div>
        <p> 💵 {product.price}</p>
        <div className="container__detail">
          <img className="logo__detail" src="./icons8-car-55.png" alt="" />
          <Link className="btn__detail" to={`/model/${product._id}`}>Detalles</Link>
        </div>
      </div>
     
      <div className="container__btn">
          <button className="btn__cart" data-id={product._id} onClick={handleAddProduct}>Agregar 🛒</button>
      </div>
    </div>
  );
};

export default ProductCard;
