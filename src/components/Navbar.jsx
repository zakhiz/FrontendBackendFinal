import { Link } from "react-router-dom";
const Navbar = () => {
fetch(`ruta/${cookie}`)

  return (
    <>
    
          <div className="title__container">
          <h1 className="title">JDM STORE</h1>
      </div>
      <nav className="container__Navbar">
        <Link className="menu">🛒 Carrito</Link>
        <Link className="menu" to={"/login"}>Iniciar Sesion</Link> 
      </nav>
    </>
  );
};

export default Navbar;
