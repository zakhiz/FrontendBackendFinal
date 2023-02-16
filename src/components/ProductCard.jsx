import { Link } from "react-router-dom";

const ProductCard = (props) => {
  const { product } = props;
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
          <button className="btn__cart">Agregar 🛒</button>
      </div>
    </div>
  );
};

export default ProductCard;
